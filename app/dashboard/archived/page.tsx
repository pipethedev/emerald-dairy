import { FavouriteNotesHeader } from "@/app/components/dashboard/favourites";
import { SearchBar } from "@/app/components/global";
import { AddIcon, ExpandMoreIcon } from "@/app/components/svgs";
import clsx from "clsx";
import Image from "next/image";

const paragraphs = Array(4)
  .fill(0)
  .map((_, i) => ({
    key: i,
    lines: Array(4)
      .fill(0)
      .map((_, i) => ({ key: i })),
  }));

export default function Favorites() {
  return (
    <main className="flex h-full [&::-webkit-slider-thumb]:!bg-blue-500 flex-col overflow-auto">
      <FavouriteNotesHeader />
      <div className="w-[95%] md:w-[80%] flex-1 overflow-auto [&::-webkit-slider-thumb]:!bg-blue-500 mx-auto pt-8">
        {/* <H1 className="text-4xl">{"Prayer as an Anchor"}</H1> */}
        <div className="w-[70%] h-16 bg-gray-300" />
        <figure className="relative h-60 w-full mt-6 bg-gray-300 rounded-xl overflow-clip" />
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
                    "h-6 bg-gray-300 mt-2",
                    key && key % 3 === 0 && "w-[80%]"
                  )}
                  key={key}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
