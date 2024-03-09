import { firebaseApp, getCurrentUser } from "@/lib/firebase/firebase-admin";
import { db, storage } from "@/lib/firebase/firebase-client";
import { deleteApp, getApps } from "firebase/app";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    console.log({ currentUser });

    const searchParams = request.nextUrl.searchParams;

    const type = searchParams.get("type");

    console.log({ type });

    let querySnapshot;

    if (["favourite", "archived", "deleted"].includes(type!)) {
      const q = query(collection(db, "notes"), where("type", "==", type));
      querySnapshot = await getDocs(q);
    } else {
      const q = query(collection(db, "notes"));
      querySnapshot = await getDocs(q);
    }

    // else {
    //   // Use the `query` function to construct the query

    // }
    if (!querySnapshot)
      return NextResponse.json({
        message: "Could'nt fetch note Data",
        success: false,
        data: null,
      });

    const notesData = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Note)
    );

    return NextResponse.json({
      message: "note Data",
      success: true,
      data: notesData,
    });
  } catch (error) {
    console.error("FETCH_N0TES:get ", { error });
    return NextResponse.json({
      message: "Could'nt fetch note Data",
      success: false,
      data: null,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    // const reqBody = await request.json();

    const currentUser = await getCurrentUser();

    console.log({ currentUser });

    if (!currentUser) throw new Error("Unauthorized");

    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const type = formData.get("type") || "";

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

    const note = {
      title,
      content: contentArray,
    };

    const docRef = await addDoc(collection(db, "notes"), {
      // id: uuidV4(),
      owner: currentUser.uid,
      title,
      type,
      content: contentArray,
      timestamp: Timestamp.fromDate(new Date()),
    });

    console.log("CREATED_N0TE", { note });
    console.log("Document written with ID: ", docRef.id);

    console.log({ formData, content, contentArray });
    return NextResponse.json({ success: true, data: "note" });
  } catch (error) {
    console.error("CREATE_N0TE:post ", { error });
    return NextResponse.json({
      success: false,
    });
  }
}
