import { H1, H2 } from "@/lib/utils/typography";
import clsx from "clsx";
import Image from "next/image";
import Editor from "../Editor/Editor";
import { NotesLoader } from "../Notes";
import FullscreenImage from "./FullscreenImage";
import Link from "next/link";
import { pushSearchParams } from "@/lib/utils/helpers";
import { ReadonlyURLSearchParams } from "next/navigation";
import { ToggleNotesBarBtn } from "..";

export default function NoteSection({
  note,
  path,
  searchParams,
}: {
  note?: Note | null;
  path?: string | null;
  // searchParams?: {
  //   [key: string]: string;
  // };
  searchParams: {
    [key: string]: string;
  };
}) {
  const imageContent = note?.content?.filter(
    (content) => content.type === "image"
  );

  const images = imageContent?.map((content) => content.value as string) || [];

  const urlParams = pushSearchParams(searchParams?.toString(), [
    {
      param: "full-image",
      value: "true",
    },
  ]);

  console.log({ urlParams, searchParams });

  return note === undefined ? (
    <NotesLoader />
  ) : note === null ? (
    // Render a message when note is not available
    <div className="text-3xl mt-24 text-center">
      {"Couldn't"} fetch note data
    </div>
  ) : (
    // <div className="w-[95%] md:w-[80%] flex-1 overflow-auto [&::-webkit-slider-thumb]:!bg-blue-500 mx-auto pt-8">
    <>
      <article className="w-[95%] space-y-6 py-8 mx-auto animate-fade-in">
        <div className="w-full flex">
          <H1
            className="text-6xl resize-none outline-none border-none font-bold overflow-hidden w-full text-wrap text-gray-800"
            placeholder="Note Title"
          >
            {note.title}
          </H1>
          <div className="ml-auto mr-3">
            <ToggleNotesBarBtn />
          </div>
        </div>
        {note.content?.map((item, i) =>
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
            <div className="relative">
              <Link
                href={decodeURI(
                  `${path}?${pushSearchParams(searchParams?.toString(), [
                    {
                      param: "full-image",
                      value: "true",
                    },
                    {
                      param: "image-index",
                      value: (imageContent?.indexOf(item) || 0).toString(),
                    },
                  ]).toString()}`
                )}
                key={i}
              >
                <Image
                  src={item.value as string}
                  alt={item.type}
                  width={720}
                  height={720}
                  className="w-full h-80 rounded-xl object-cover bg-gray-400"
                />
              </Link>
            </div>
          ) : null
        )}
      </article>
      <FullscreenImage urlParams={urlParams} images={images} />
    </>
    // </div>
  );
}
