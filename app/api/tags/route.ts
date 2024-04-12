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

    console.log("Tags GET: ", { currentUser });

    if (!currentUser) throw new Error("Unauthorized");

    let querySnapshot;

    const q = query(
      collection(db, "tags"),
      where("owner", "==", currentUser?.uid)
    );
    querySnapshot = await getDocs(q);

    if (!querySnapshot)
      return NextResponse.json({
        message: "Could'nt fetch tag Data",
        success: false,
        data: null,
      });

    const tagsData = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as Tag)
    );

    console.log({ tagsData });

    return NextResponse.json({
      message: "tag Data",
      success: true,
      data: tagsData,
    });
  } catch (error) {
    console.error("FETCH_N0TES:get ", { error });
    return NextResponse.json({
      message: "Could'nt fetch tag Data",
      success: false,
      data: null,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    console.log("Tags POST: ", { currentUser });

    if (!currentUser) throw new Error("Unauthorized");

    const reqBody = (await request.json()) as { name: string };

    // Check if the tag name is already used by the user
    const tagQuery = query(
      collection(db, "tags"),
      where("name", "==", reqBody.name),
      where("owner", "==", currentUser.uid)
    );
    const existingTags = await getDocs(tagQuery);

    if (!existingTags.empty) {
      throw new Error("Tag name already exists for the user");
    }

    // If the tag name is unique, create the Tag document
    const tagData = {
      owner: currentUser.uid,
      name: reqBody.name,
      timestamp: Timestamp.fromDate(new Date()),
    } as Tag & { timestamp: Timestamp };

    const docRef = await addDoc(collection(db, "tags"), tagData);

    console.log("Document written with ID: ", docRef.id);

    return NextResponse.json({
      success: true,
      data: { ...tagData, id: docRef.id },
    });
  } catch (error: any) {
    console.error("CREATE_N0TE:post ", { error }, error?.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
