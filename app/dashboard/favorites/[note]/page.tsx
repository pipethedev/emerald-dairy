import { FavouriteNotesHeader } from "@/app/components/dashboard/favourites";
import { Button, ParamsNav } from "@/app/components/global";
import { DocIcon, EditIcon, TagIcon } from "@/app/components/svgs";
import { H1 } from "@/utils/typography";
import Image from "next/image";

type Props = {
  params: {
    [key: string]: string;
  };
};

// An array is used here because users would likely want to add content arranged in paragraphs. Each new paragraph would be pushed to the array of paragraphs
// EXPERIMENTAL
const paragraphs = Array(4).fill(
  ` Like if I don't, I'll be humiliated and embarrassed in some way. I know this probably stems from my abusive childhood. What I've never really realized until now, is people can usually see I'm not being authentic anyway. So I feel.`
);

export default async function NotePage({ params }: Props) {
  // COMEBACK: send request to api to fetch note by ID passed through {params.note}
  // const res = await fetch("");
  // const data = await res.json()

  return (
    <main className="flex h-full [&::-webkit-slider-thumb]:!bg-blue-500 flex-col overflow-auto">
      <FavouriteNotesHeader />
      <div className="w-[80%] flex-1 overflow-auto [&::-webkit-slider-thumb]:!bg-blue-500 mx-auto pt-8">
        <H1 className="text-4xl">{"Prayer as an Anchor"}</H1>
        <figure className="relative h-60 w-full mt-6 bg-[linear-gradient(0deg,rgba(0,0,0,0.70)0%,rgba(0,0,0,0.40)100%)]_ rounded-xl overflow-clip">
          <Image
            src="/images/note-preview.png"
            alt=""
            width={1080}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute w-full h-full top-0 left-0 z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.40)0%,rgba(0,0,0,0.40)100%)]" />
        </figure>
        <div className="mt-8">
          {paragraphs.map((paragraph, i) => (
            <p
              // NOTE Change key to something more reasonable
              key={Math.random().toString()}
              className="text-couch-grey text-lg leading-[180%] font-normal"
            >
              {paragraph}
            </p>
          ))}
          <Button>Test Notification</Button>
          <div className="mt-4"><Button test="modal">Test Modal</Button></div>
        </div>
      </div>
    </main>
  );
}
