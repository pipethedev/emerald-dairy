import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { db, storage } from "@/lib/firebase/firebase-client";
import {
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

type PatchProps = {
  params: {
    noteId: string;
  };
};

type PutProps = {
  params: {
    noteId: string;
  };
};

type DeleteProps = {
  params: {
    noteId: string;
  };
};

const serializeNote = async (note: Note): Promise<Partial<Note>> => {
  const noteData = {
    title: note.title,
    subtitle: note.subtitle,
    // date: note.date,
    label: note.label,
    favourite: note.favourite,
    tag: note.tag,
    type: ["favourite", "archived", "deleted"].includes(note.type!)
      ? note.type
      : "",
    folder: note.folder,
    content: note.content,
  };

  const serializedNote: any = {};

  Object.entries(noteData).forEach((item) => {
    if (item[1]) {
      serializedNote[item[0]] = item[1];
    }
  });

  return serializedNote;
};

// NOTE: Well, not so sure, let this be here for a bit
const NoteTemplate = {
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
  { params: { noteId } }: PutProps
) {
  try {
    // const reqBody = await request.json();

    const currentUser = await getCurrentUser();

    console.log("Note PUT: ", { currentUser });

    // if (!currentUser) throw new Error("Unauthorized");

    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");

    console.log("N0TE_ID: ", noteId);

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

    await updateDoc(doc(db, "notes", noteId), {
      title,
      content: contentArray,
      timestamp: Timestamp.fromDate(new Date()),
    });

    console.log("EDITED_N0TE", { note });

    console.log({ formData, content, contentArray });
    return NextResponse.json({ success: true, data: "note" });
  } catch (error) {
    console.error("EDIT_N0TE:post ", { error });
    return NextResponse.json({
      success: false,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params: { noteId } }: PatchProps
) {
  try {
    const currentUser = await getCurrentUser();
    console.log("Note PATCH: ", { currentUser });

    let noteData: Note;

    const requestBody = (await request.json()) as Note & {
      tag: string;
      folder: string;
    };

    console.log({ requestBody });

    if (!requestBody) throw new Error("Invalid Data");

    noteData = requestBody;

    if (requestBody.tag) {
      const docSnap = await getDoc(doc(db, "tags", requestBody.tag));
      const noteTag = docSnap.data();

      if (!noteTag) throw new Error("Couldn't find a tag with that ID");

      noteData = {
        ...requestBody,
        tag: { ...noteTag, id: requestBody.tag as string } as Tag,
      };
    }

    if (requestBody.folder) {
      const docSnap = await getDoc(doc(db, "folders", requestBody.folder));
      const noteTag = docSnap.data();

      if (!noteTag) throw new Error("Couldn't find a folder with that ID");

      noteData = {
        ...requestBody,
        folder: { ...noteTag, id: requestBody.folder as string } as Folder,
      };
    }

    console.log({ noteData });

    const serializedNote = await serializeNote(noteData);

    console.log({ serializedNote });

    const updatedDoc = await updateDoc(doc(db, "notes", noteId), {
      ...serializedNote,
      timestamp: Timestamp.fromDate(new Date()),
    });

    console.log("API--->UPDATE_RUNNING", { updatedDoc });
    // await deleteDoc(doc(db, "notes", noteId));

    return NextResponse.json({
      success: true,
      message: "Note updated successfully",
      data: serializedNote,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Couldn't update note",
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { noteId } }: DeleteProps
) {
  try {
    const currentUser = await getCurrentUser();
    console.log("Note DELETE: ", { currentUser });

    currentUser.aud;

    const searchParams = request.nextUrl.searchParams;

    const deletePermanently = searchParams.get("permanent") === "true";

    if (deletePermanently) {
      console.log("API--->DELETE_RUNNING:PERMANENT", { searchParams });
      await deleteDoc(doc(db, "notes", noteId));
    } else {
      console.log("API--->DELETE_RUNNING:TRASH", { searchParams });
      await updateDoc(doc(db, "notes", noteId), {
        type: "deleted",
      });
    }

    console.log("API--->DELETE_RUNNING", { searchParams });
    // await deleteDoc(doc(db, "notes", noteId));

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Could'nt delete note",
    });
  }
}
