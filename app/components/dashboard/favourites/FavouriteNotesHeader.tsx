"use client";
import React from "react";
import { IconButton, ParamsNav } from "../../global";
import {
  DocIcon,
  EditIcon,
  Expand4Icon,
  FolderIcon,
  Hearts,
  HorizontalDots,
  MessageChatCircleIcon,
  MoreHorisIcon,
  Share5Icon,
  Tag2Icon,
  Tag3Icon,
  TagIcon,
} from "../../svgs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavOption = {
  title: string | React.ReactNode | React.FC<React.SVGProps<SVGElement>>;
  value: string;
};
const navOptions: NavOption[] = [
  {
    title: FolderIcon,
    value: "this",
  },
  {
    title: Tag3Icon,
    value: "that",
  },
  {
    title: Hearts,
    value: "those",
  },
  {
    title: Expand4Icon,
    value: "them",
  },
  {
    title: Share5Icon,
    value: "the-other",
  },
  {
    title: MessageChatCircleIcon,
    value: "people",
  },
  {
    title: HorizontalDots,
    value: "others",
  },
];

export default function FavouriteNotesHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full overflow-auto">
      <div className="flex h-full items-center px-2 md:px-0 md:w-[90%] py-2 mx-auto gap-2">
        <div className="flex items-center gap-3">
          <Link href={`${pathname}?show-notes=true`}>
            <IconButton icon={DocIcon} title="show all notes" />
          </Link>
          <ParamsNav
            args={navOptions}
            searchParam="view"
            className="gap-2"
            itemBuilder={({ isActive, title }) => {
              const Title = title as React.FC<React.SVGProps<SVGElement>>;
              return (
                <button
                  className={clsx(
                    "p-3 w-10 h-10 aspect-square hover:bg-primary-13 rounded-xl flex items-center justify-center",
                    isActive &&
                      "outline-primary outline-1 outline bg-primary-13"
                  )}
                >
                  <figure>
                    {<Title className={clsx("!stroke-primary !w-8")} />}
                  </figure>
                </button>
              );
            }}
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary-12 ml-auto py-2 px-3 font-matter font-medium leading-normal text-sm h-[2.5rem]">
          <figure>
            <EditIcon className="!stroke-primary" />
          </figure>
          <p className="capitalize whitespace-nowrap text-primary">edit note</p>
        </button>
      </div>
    </header>
  );
}
