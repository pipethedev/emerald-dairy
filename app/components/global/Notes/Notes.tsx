"use client";

import { IconButton, NavLink, NoteItem } from "..";
import { ExpandMoreIcon, Info, XClose } from "../../svgs";
import NoteWrapper from "../NoteItem/NoteWrapper";
import { notesPreviewData } from "@/data/notes";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../config/firebase";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import Spinner from "../Spinner/Spinner";

type Props = {
  notes?: Note[];
  path: string;
};

export default function Notes({ notes, path }: Props) {
  const notesRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const showNotes = searchParams.get("show-notes");

  console.log({ showNotes, shouldNotShow: showNotes === "false" });

  const [fetchedNotes, setFetchedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const notesSnapshot = await getDocs(collection(db, "notes"));
        const notesData = notesSnapshot.docs.map((doc) => doc.data() as Note);
        setFetchedNotes(notesData);

        console.log("hello", notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  console.log("hello", fetchedNotes);

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
          {loading ? (
            <div className="mt-12 flex items-center justify-center">
              <Spinner />
            </div>
          ) : fetchedNotes.length ? (
            fetchedNotes.map((note, i) => (
              <NavLink
                href={`${path}/${note.id}?show-notes=false`}
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
                      date={note?.date}
                      isActive={isActive}
                      hoverEffect
                    />
                  </NoteWrapper>
                )}
              </NavLink>
            ))
          ) : (
            <div>
              <div className="mt-12 flex gap-3 items-center justify-center">
                <Info className="!stroke-primary" />
                <p className="text-2xl text-gray-800">No notes available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
