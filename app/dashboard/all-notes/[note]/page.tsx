// "use client";
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

type Props = {
  params: {
    [key: string]: string;
  };
};

export default async function NotePage({ params }: Props) {
  const noteId = params.note;
  const editNote = params.edit === "true" ? true : false;

  let note: Note | undefined;

  // const [note, setNote] = useState<Note | null>(null);

  // useEffect(() => {
  // const fetchData = async () => {
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
      note = undefined;
      // Handle case when note is not found
    }
  } catch (error) {
    console.error("Error fetching note:", error);
    note = undefined;
    // alert("An error occured");
  }
  // };

  //   fetchData();
  // }, []);

  return (
    <main className="flex h-full [&::-webkit-slider-thumb]:!bg-blue-500 flex-col overflow-auto">
      <NotesHeader />
      {note && note ? (
        <div className="w-[95%] md:w-[80%] flex-1 overflow-auto [&::-webkit-slider-thumb]:!bg-blue-500 mx-auto pt-8">
          <NoteSectionWrapper note={note}>
            <NoteSection note={note} />
          </NoteSectionWrapper>
        </div>
      ) : (
        // Render a message when note is not available
        <div className="text-3xl mt-24 text-center">
          {"Couldn't"} fetch note data_ and more
        </div>
      )}
    </main>
  );
}
