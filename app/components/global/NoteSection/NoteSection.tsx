import { H1, H2 } from "@/utils/typography";
import clsx from "clsx";
import Image from "next/image";

export default function NoteSection({ note }: { note: Note }) {

  console.log('this is the note data', note)
  return (
    <article className="w-[95%] space-y-6 pt-8 mx-auto">
      <H1
        className="text-6xl resize-none outline-none border-none font-bold overflow-hidden w-full text-wrap text-gray-800"
        placeholder="Note Title"
      >
        {note.title}
        {note.id}
      </H1>
      {/* {note.content?.map((item, i) =>
        item.type === "heading" ? (
          <H2
            key={i}
            className={clsx(
              "outline-none text-3xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800"
            )}
          >
            {item.value as string}
          </H2>
        ) : item.type === "paragraph" ? (
          <div key={i} className="relative group">
            <p
              className={clsx(
                "outline-none text-xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800 rounded-md p-1",
                "group-hover:outline-primary group-hover:outline_ group-hover:!bg-body group-hover:outline-1"
              )}
            >
              {item.value as string}
            </p>
          </div>
        ) : item.type === "image" ? (
          <div key={i} className="relative">
            <Image
              src={item.value as string}
              alt={item.type}
              width={720}
              height={720}
              className="w-full h-60 rounded-xl object-cover bg-gray-400"
            />
          </div>
        ) : null
      )} */}
    </article>
  );
}
