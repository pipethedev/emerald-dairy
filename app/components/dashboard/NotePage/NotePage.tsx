import { NoteSection } from "@/app/components/global";
import { db } from "@/app/config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import NotesHeader from "@/app/components/dashboard/NotesHeader";
import { NoteSectionWrapper } from "@/app/components/global/NoteSection";
import { headers } from "next/headers";

type Props = {
  params: {
    [key: string]: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function NotePage({ params, searchParams }: Props) {
  const headersList = headers();
  const headerUrl = headersList.get("x-url");

  console.log({ headerUrl });

  console.log({ params });

  const noteId = params.note;

  let note: Note | undefined | null;

  try {
    const noteRef = doc(db, "notes", noteId); // "notes" is the collection name

    const noteDoc = await getDoc(noteRef);

    if (noteDoc.exists()) {
      const noteData = noteDoc.data();
      note = noteData as Note;
      // setNote(noteData as Note);
      console.log("Note was found", noteData);
      // Do something with the noteData
    } else {
      console.log("Note not found", { noteDoc: noteDoc.data() });
      note = null;
      // Handle case when note is not found
    }
  } catch (error) {
    console.error("Error fetching note:", error);
    note = null;
  }

  return (
    <main className="flex h-full [&::-webkit-slider-thumb]:!bg-blue-500 flex-col overflow-auto">
      <NotesHeader />
      <NoteSectionWrapper note={note}>
        <NoteSection note={note} path={headerUrl} searchParams={searchParams} />
      </NoteSectionWrapper>
    </main>
  );
}
