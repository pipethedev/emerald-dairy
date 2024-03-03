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

  console.log({ noteId, decoded: decodeURI(noteId) });

  let note: Note | null = null;
  try {
    const q = query(
      collection(db, "notes"),
      where("id", "==", decodeURI(noteId))
    ); // Replace "id" with your actual field name
    const notesSnapshot = await getDocs(q);
    if (!notesSnapshot.empty) {
      // Assuming there's only one note with this ID
      const noteData = notesSnapshot.docs[0].data() as Note;
      note = noteData;
      console.log("Note was found", { noteData });
    } else {
      console.log("Note not found");
      // alert("Note not found");
    }
  } catch (error) {
    console.error("Error fetching note:", error);
    // alert("An error occured");
  }

  if (!note)
    return (
      <div className="text-3xl mt-24 text-center">
        {"Couldn't"} fetch note data
      </div>
    );

  return (
    <main className="flex h-full [&::-webkit-slider-thumb]:!bg-blue-500 flex-col overflow-auto">
      <NotesHeader />
      {note && note ? (
        <div className="w-[95%] md:w-[80%] flex-1 overflow-auto [&::-webkit-slider-thumb]:!bg-blue-500 mx-auto pt-8">
          <NoteSectionWrapper note={note}>
            <NoteSectionWrapper note={note}>
              <NoteSection note={note} />
            </NoteSectionWrapper>
          </NoteSectionWrapper>
        </div>
      ) : (
        // Render a message when note is not available
        <div className="text-3xl mt-24 text-center">
          {"Couldn't"} fetch note data
        </div>
      )}
    </main>
  );
}
