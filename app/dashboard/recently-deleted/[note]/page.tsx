import NotesHeader from "@/app/components/dashboard/NotesHeader";
import { Button, NoteSection, ParamsNav } from "@/app/components/global";
import { NoteSectionWrapper } from "@/app/components/global/NoteSection";
import { DocIcon, EditIcon, TagIcon } from "@/app/components/svgs";
import { db } from "@/app/config/firebase";
import { H1, H2 } from "@/utils/typography";
import clsx from "clsx";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";

type Props = {
  params: {
    [key: string]: string;
  };
};

// An array is used here because users would likely want to add content arranged in paragraphs. Each new paragraph would be pushed to the array of paragraphs
// EXPERIMENTAL
const paragraphs = Array(4)
  .fill(0)
  .map(
    (_, i) =>
      `Like if I don't, I'll be humiliated and embarrassed in some way. I know this probably stems from my abusive childhood. What I've never really realized until now, is people can usually see I'm not being authentic anyway. So I feel.`
  );

export default async function NotePage({ params }: Props) {
  // COMEBACK: send request to api to fetch note by ID passed through {params.note}
  // const res = await fetch("");
  // const data = await res.json()
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
      <div className="w-[95%] md:w-[80%] flex-1 overflow-auto [&::-webkit-slider-thumb]:!bg-blue-500 mx-auto pt-8">
        <NoteSectionWrapper note={note}>
          <NoteSection note={note} />
        </NoteSectionWrapper>
      </div>
    </main>
  );
}
