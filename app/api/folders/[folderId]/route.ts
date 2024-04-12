import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { db, storage } from "@/lib/firebase/firebase-client";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

type PatchProps = {
  params: {
    folderId: string;
  };
};

type PutProps = {
  params: {
    folderId: string;
  };
};

type DeleteProps = {
  params: {
    folderId: string;
  };
};

const serializeFolder = async (folder: Folder): Promise<Partial<Folder>> => {
  const folderData: Partial<Folder> = {
    id: folder.id,
    name: folder.name,
    owner: folder.owner,
  };

  const serializedFolder: any = {};

  Object.entries(folderData).forEach((item) => {
    if (item[1]) {
      serializedFolder[item[0]] = item[1];
    }
  });

  return serializedFolder;
};

export async function PUT(
  request: NextRequest,
  { params: { folderId } }: PutProps
) {
  try {
    // const reqBody = await request.json();

    const currentUser = await getCurrentUser();

    console.log("Folder PUT: ", { currentUser });

    // if (!currentUser) throw new Error("Unauthorized");

    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");

    console.log("N0TE_ID: ", folderId);

    const contentArray = JSON.parse(content as string) as Content[];

    const promises = contentArray
      // .filter((item) => item.type === "image" || item.type === "video")
      .map(async (item) => {
        if (item.type === "image" || item.type === "video") {
          const file = formData.get(`file-${item.value}`) as File;
          if (file && file.name) {
            console.log({ fileName: file.name, file });

            const storageRef = ref(storage, "images/" + file.name);
            // imageFile.name
            await uploadBytes(storageRef, file);

            // Get the download URL of the uploaded image
            const imageUrl = await getDownloadURL(storageRef);
            console.log({ imageUrl });
            item.value = imageUrl;
          }
        }
      });

    await Promise.all(promises);

    const folder = {
      title,
      content: contentArray,
    };

    await updateDoc(doc(db, "folders", folderId), {
      title,
      content: contentArray,
      timestamp: Timestamp.fromDate(new Date()),
    });

    console.log("CREATED_N0TE", { folder });

    console.log({ formData, content, contentArray });
    return NextResponse.json({ success: true, data: "folder" });
  } catch (error) {
    console.error("CREATE_N0TE:post ", { error });
    return NextResponse.json({
      success: false,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params: { folderId } }: PatchProps
) {
  try {
    const currentUser = await getCurrentUser();
    console.log("Folder PATCH: ", { currentUser });

    let folderData: Folder;

    const requestBody = (await request.json()) as Folder & { folder: string };

    console.log({ requestBody });

    folderData = requestBody;

    if (requestBody && requestBody.folder) {
      const docSnap = await getDoc(doc(db, "folders", requestBody.folder));
      const folderFolder = docSnap.data();

      if (!folderFolder) throw new Error("Couldn't find a folder with that ID");

      folderData = {
        ...requestBody,
        // folder: { ...folderFolder, id: requestBody.folder as string } as Folder,
      };
    }

    console.log({ folderData });

    const serializedFolder = await serializeFolder(folderData);

    console.log({ serializedFolder });

    const updatedDoc = await updateDoc(doc(db, "folders", folderId), {
      ...serializedFolder,
      timestamp: Timestamp.fromDate(new Date()),
    });

    console.log("API--->UPDATE_RUNNING", { updatedDoc });
    // await deleteDoc(doc(db, "folders", folderId));

    return NextResponse.json({
      success: true,
      message: "Folder updated successfully",
      data: serializedFolder,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Couldn't update folder",
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { folderId } }: DeleteProps
) {
  try {
    const currentUser = await getCurrentUser();
    console.log("Folder DELETE: ", { currentUser });

    const collectionRef = collection(db, "notes");

    const snapshot = await getDocs(
      query(collectionRef, where("folder.id", "==", folderId))
    );

    snapshot.forEach(async (doc) => {
      const docRef = doc.ref;

      await updateDoc(docRef, {
        folder: undefined,
      });
    });

    await deleteDoc(doc(db, "folders", folderId));

    console.log("API--->DELETE_RUNNING:TRASH");

    return NextResponse.json({
      success: true,
      message: "Folder deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Could'nt delete folder",
    });
  }
}
