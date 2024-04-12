import { firebaseApp, getCurrentUser } from "@/lib/firebase/firebase-admin";
import { db, storage } from "@/lib/firebase/firebase-client";
import { lettersAndNumbersOnly } from "@/lib/utils/helpers";
import { deleteApp, getApps } from "firebase/app";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    console.log("Folders GET: ", { currentUser });

    if (!currentUser) throw new Error("Unauthorized");

    let querySnapshot;

    const q = query(
      collection(db, "folders"),
      where("owner", "==", currentUser?.uid)
    );
    querySnapshot = await getDocs(q);

    if (!querySnapshot)
      return NextResponse.json({
        message: "Could'nt fetch folder Data",
        success: false,
        data: null,
      });

    const foldersData = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as Folder)
    );

    console.log({ foldersData });

    return NextResponse.json({
      message: "folder Data",
      success: true,
      data: foldersData,
    });
  } catch (error) {
    console.error("FETCH_N0TES:get ", { error });
    return NextResponse.json({
      message: "Could'nt fetch folder Data",
      success: false,
      data: null,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    console.log("Folders POST: ", { currentUser });

    if (!currentUser) throw new Error("Unauthorized");

    const reqBody = (await request.json()) as { name: string };

    // Check if the folder name is already used by the user
    const folderQuery = query(
      collection(db, "folders"),
      where("name", "==", reqBody.name),
      where("owner", "==", currentUser.uid)
    );
    const existingFolders = await getDocs(folderQuery);

    if (!existingFolders.empty) {
      throw new Error("Folder name already exists for the user");
    }

    // If the folder name is unique, create the Folder document
    const folderData = {
      owner: currentUser.uid,
      name: reqBody.name,
      timestamp: Timestamp.fromDate(new Date()),
    } as Folder & { timestamp: Timestamp };

    const docRef = await addDoc(collection(db, "folders"), folderData);

    console.log("Document written with ID: ", docRef.id);

    return NextResponse.json({
      success: true,
      data: { ...folderData, id: docRef.id },
    });
  } catch (error: any) {
    console.error("CREATE_N0TE:post ", { error }, error?.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
