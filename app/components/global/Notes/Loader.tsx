import clsx from "clsx";
import { NoteItem, ToggleNotesBarBtn } from "..";
import { NoteItemLoader } from "../NoteItem";

const paragraphs = Array(4)
  .fill(0)
  .map((_, i) => ({
    key: i,
    lines: Array(4)
      .fill(0)
      .map((_, i) => ({ key: i })),
  }));

const notes = Array(6)
  .fill(0)
  .map((_, i) => ({
    key: i,
  }));

type Props = {
  variant?: "list" | "content";
};

export default function NotesLoader({ variant = "content" }: Props) {
  return (
    <div className="flex h-full [&::-webkit-slider-thumb]:!bg-blue-500 flex-col overflow-auto p-1">
      {variant === "list" ? (
        <div className="space-y-2">
          {notes.map((_, i) => (
            <NoteItemLoader key={i} />
          ))}
        </div>
      ) : (
        <div className="w-[95%] md:w-[80%] flex-1 overflow-auto [&::-webkit-slider-thumb]:!bg-blue-500 mx-auto pt-8">
          {/* <H1 className="text-4xl">{"Prayer as an Anchor"}</H1> */}
          <div className="flex">
            <div className="w-[70%] h-16 bg-gray-300 animate-loader-opacity" />
            <div className="ml-auto mr-3">
              <ToggleNotesBarBtn />
            </div>
          </div>
          <figure className="relative h-60 w-full mt-6 bg-gray-300 rounded-xl overflow-clip animate-loader-opacity" />
          <div className="mt-8">
            {paragraphs.map(({ key, lines }, i) => (
              <div
                // NOTE Change key to something more reasonable
                key={key}
                className="mt-8"
              >
                {lines.map(({ key }, i) => (
                  <div
                    className={clsx(
                      "h-6 bg-gray-300 mt-2 animate-loader-opacity",
                      key && key % 3 === 0 && "w-[80%]"
                    )}
                    key={key}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
