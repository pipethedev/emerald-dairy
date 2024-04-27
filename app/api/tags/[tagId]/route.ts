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
    tagId: string;
  };
};

type PutProps = {
  params: {
    tagId: string;
  };
};

type DeleteProps = {
  params: {
    tagId: string;
  };
};

const serializeTag = async (tag: Tag): Promise<Partial<Tag>> => {
  const tagData: Partial<Tag> = {
    id: tag.id,
    name: tag.name,
    owner: tag.owner,
  };

  const serializedTag: any = {};

  Object.entries(tagData).forEach((item) => {
    if (item[1]) {
      serializedTag[item[0]] = item[1];
    }
  });

  return serializedTag;
};

// NOTE: Well, not so sure, let this be here for a bit
const TagTemplate = {
  id: new String(),
  title: new String(),
  subtitle: new String(),
  date: new Number() || new String(),
  label: new String(),
  favourite: new Boolean(),
  tag: new String(),
  type: ["favourite", "archived", "deleted"],
  folder: new String(),
  content: [],
};

export async function PUT(
  request: NextRequest,
  { params: { tagId } }: PutProps
) {
  try {
    // const reqBody = await request.json();

    const currentUser = await getCurrentUser();

    if (!currentUser)
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    console.log("Tag PUT: ", { currentUser });

    // if (!currentUser) throw new Error("Unauthorized");

    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");

    console.log("N0TE_ID: ", tagId);

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

    const tag = {
      title,
      content: contentArray,
    };

    await updateDoc(doc(db, "tags", tagId), {
      title,
      content: contentArray,
      timestamp: Timestamp.fromDate(new Date()),
    });

    console.log("CREATED_N0TE", { tag });

    console.log({ formData, content, contentArray });
    return NextResponse.json({ success: true, data: "tag" });
  } catch (error) {
    console.error("CREATE_N0TE:post ", { error });
    return NextResponse.json({
      success: false,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params: { tagId } }: PatchProps
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    console.log("Tag PATCH: ", { currentUser });

    let tagData: Tag;

    const requestBody = (await request.json()) as Tag & { tag: string };

    console.log({ requestBody });

    tagData = requestBody;

    if (requestBody && requestBody.tag) {
      const docSnap = await getDoc(doc(db, "tags", requestBody.tag));
      const tagTag = docSnap.data();

      if (!tagTag) throw new Error("Couldn't find a tag with that ID");

      tagData = {
        ...requestBody,
        // tag: { ...tagTag, id: requestBody.tag as string } as Tag,
      };
    }

    console.log({ tagData });

    const serializedTag = await serializeTag(tagData);

    console.log({ serializedTag });

    const updatedDoc = await updateDoc(doc(db, "tags", tagId), {
      ...serializedTag,
      timestamp: Timestamp.fromDate(new Date()),
    });

    console.log("API--->UPDATE_RUNNING", { updatedDoc });
    // await deleteDoc(doc(db, "tags", tagId));

    return NextResponse.json({
      success: true,
      message: "Tag updated successfully",
      data: serializedTag,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Couldn't update tag",
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { tagId } }: DeleteProps
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    console.log("Tag DELETE: ", { currentUser });

    const collectionRef = collection(db, "notes");

    const snapshot = await getDocs(
      query(collectionRef, where("tag.id", "==", tagId))
    );

    snapshot.forEach(async (doc) => {
      const docRef = doc.ref;

      await updateDoc(docRef, {
        tag: undefined,
      });
    });

    await deleteDoc(doc(db, "tags", tagId));

    console.log("API--->DELETE_RUNNING:TRASH");

    return NextResponse.json({
      success: true,
      message: "Tag deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Could'nt delete tag",
    });
  }
}
