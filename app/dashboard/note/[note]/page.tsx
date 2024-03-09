"use client";
import NotesHeader from "@/app/components/dashboard/NotesHeader";
import { Button, ParamsNav } from "@/app/components/global";
import { DocIcon, EditIcon, TagIcon } from "@/app/components/svgs";
import { H1 } from "@/lib/utils/typography";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../config/firebase"; // Adjust the path if necessary
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

type Props = {
  params: {
    [key: string]: string;
  };
};

export default function Page({ params }: Props) {
  const [note, setNote] = useState<Note | null>(null);

  const noteId = params.note;
  const editNote = params.edit === "true" ? true : false;

  console.log(noteId);

  console.log(note);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const q = query(collection(db, "notes"), where("title", "==", noteId)); // Replace "id" with your actual field name
        const notesSnapshot = await getDocs(q);
        if (!notesSnapshot.empty) {
          // Assuming there's only one note with this ID
          const noteData = notesSnapshot.docs[0].data() as Note;
          setNote(noteData);
          console.log("Note was found");
        } else {
          console.log("Note not found");
          // alert("Note not found");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        // alert("An error occured");
      }
    };

    fetchNote();
  }, [noteId]);

  return (
    <main className="flex h-full [&::-webkit-slider-thumb]:!bg-blue-500 flex-col overflow-auto">
      <div className="w-[95%] md:w-[80%] flex-1 overflow-auto [&::-webkit-slider-thumb]:!bg-blue-500 mx-auto pt-8">
        <H1 className="text-4xl">{note?.title}</H1>
        {/* <p>{note?.content}</p> */}
        <figure className="relative h-60 w-full mt-6 bg-[linear-gradient(0deg,rgba(0,0,0,0.70)0%,rgba(0,0,0,0.40)100%)]_ rounded-xl overflow-clip">
          {/* <Image
            src={`${note && note?.imageUrl}`}
            alt=""
            width={1080}
            height={1080}
            className="w-full h-full object-cover"
          /> */}

          {/* <img src={`${note && note?.imageUrl}`} alt="" /> */}
          <div className="absolute w-full h-full top-0 left-0 z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.40)0%,rgba(0,0,0,0.40)100%)]" />
        </figure>
        <div className="mt-8">
          <Link href="/dashboard">Back</Link>
          {/* <button onClick={() => router.back()}>Back</button> */}
        </div>
      </div>
    </main>
  );
}
