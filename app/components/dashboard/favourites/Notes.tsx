"use client";

import Image from "next/image";
import { NavLink, NoteItem, SearchBar } from "../../global";
import { AddIcon, ExpandMoreIcon } from "../../svgs";
import Note from "../note";
import NoteWrapper from "../../global/NoteItem/NoteWrapper";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { notesPreviewData } from "@/data/notes";

export default function Notes() {
  const notesRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState(notesPreviewData);
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
            key={(note.date + i).toString()}
          >
            {({ isActive }) => (
              <NoteWrapper
                title={note.title}
                containerRef={notesRef}
                isActive={isActive}
              >
                <NoteItem
                  title={note.title}
                  subtitle={note.subtitle}
                  tag={note.tag}
                  favourite={note.favorite}
                  date={Date.now()}
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
