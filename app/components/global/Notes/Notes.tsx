"use client";

import { IconButton, NavLink, NoteItem } from "..";
import { ExpandMoreIcon, XClose } from "../../svgs";
import NoteWrapper from "../NoteItem/NoteWrapper";
import { useRef } from "react";
import { notesPreviewData } from "@/data/notes";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  notes?: Note[];
};

export default function Notes({ notes = notesPreviewData }: Props) {
  const notesRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const showNotes = searchParams.get("show-notes");

  console.log({ showNotes, shouldNotShow: showNotes === "false" });

  return (
    <div
      className={clsx(
        "flex-1 overflow-auto",
        showNotes === "false"
          ? "translate-y-full fixed md:relative md:translate-y-[1px] w-full z-[100] md:w-auto"
          : "relative"
      )}
    >
      <div
        ref={notesRef}
        className={clsx(
          "py-[32px] flex flex-col overflow-auto h-full px-[24px] transition-transform duration-300 static bg-body"
        )}
      >
        <header className="flex items-center gap-[5px] mb-[24px]">
          <h1 className="text-[24px] font-bold">All Notes</h1>
          <ExpandMoreIcon />
          <Link
            href={`${pathname}?show-notes=false`}
            className="ml-auto md:hidden"
          >
            <IconButton icon={XClose} title="hide notes" />
          </Link>
        </header>
        <div className="space-y-2">
          {notes.map((note, i) => (
            <NavLink
              href={`/dashboard/favorites/${
                note.date.toString().replace(/[^a-zA-Z0-9]/g, "") + i
              }?show-notes=false`}
              key={(note.date + i.toString()).toString()}
            >
              {({ isActive }) => (
                <NoteWrapper
                  index={i}
                  title={note.title}
                  containerRef={notesRef}
                  isActive={isActive}
                >
                  <NoteItem
                    title={note.title}
                    subtitle={note.subtitle}
                    tag={note.tag}
                    favourite={note.favourite}
                    date={note.date}
                    isActive={isActive}
                    hoverEffect
                  />
                </NoteWrapper>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
