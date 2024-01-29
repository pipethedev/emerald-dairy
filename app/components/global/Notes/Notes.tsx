"use client";

import { NavLink, NoteItem } from "..";
import { ExpandMoreIcon } from "../../svgs";
import NoteWrapper from "../NoteItem/NoteWrapper";
import { useRef } from "react";
import { notesPreviewData } from "@/data/notes";

type Props = {
  notes?: Note[];
};

export default function Notes({ notes = notesPreviewData }: Props) {
  const notesRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={notesRef}
      className="py-[32px] flex flex-col overflow-auto flex-1 px-[24px] relative"
    >
      <header className="flex items-center gap-[5px] mb-[24px]">
        <h1 className="text-[24px] font-bold">All Notes</h1>
        <ExpandMoreIcon />
      </header>
      <div className="space-y-2">
        {notes.map((note, i) => (
          <NavLink
            href={`/dashboard/favorites/${
              note.date.toString().replace(/[^a-zA-Z0-9]/g, "") + i
            }`}
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
  );
}
