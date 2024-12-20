"use client";

import { IconButton, NavLink, NoteItem } from "..";
import { ExpandMoreIcon, Info, XClose } from "../../svgs";
import NoteWrapper from "../NoteItem/NoteWrapper";
import { notesPreviewData } from "@/data/notes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../config/firebase";
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import Spinner from "../Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { toggleNotesBar } from "@/store/slices/notesbar";
import { NotesLoader } from ".";
import NoteLoader from "../NoteItem/NoteItemLoader";
import { lettersAndNumbersOnly } from "@/lib/utils/helpers";
import { fetchNotes } from "@/controllers/note";
import { useFetchNotesQuery } from "@/store/slices/api";
import { useNotes } from "@/hooks";

type Props = {
  notes?: Note[];
  folder?: any;
  path: string;
  type?: "all" | "favourite" | "archived" | "deleted" | "notes";
};

export default function Notes({ notes, path, type, folder }: Props) {
  const notesRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const showNotes = useAppSelector((state) => state.notesBar);
  const dispatch = useAppDispatch();

  const toggleNotes = () => {
    dispatch(toggleNotesBar());
  };

  // const [fetchedNotes, setFetchedNotes] = useState<Note[]>([]);
  // const [loading, setLoading] = useState(false);

  const show = searchParams.get("show-notes");
  const { fetchedNotes: notesFromHook, loading } = useNotes(type!);
  const fetchedNotes = useAppSelector((state) => state.notes);

  useEffect(() => {
    if (!fetchedNotes.length) return;
    const splitUrl = pathname.split("/");

    // Filter check if path includes noteId
    const pathId = pathname.split(`${path.replace(/^\/+/, "")}`)[1];

    // If no note is selected, route to the first note in the array of retrieved notes
    if (
      path &&
      !pathId &&
      lettersAndNumbersOnly(splitUrl[splitUrl.length - 1]) !== "dashboard"
    )
      router.push(`${pathname}/${fetchedNotes[0]?.id}`);
  }, [fetchedNotes, pathname, router, path]);

  useEffect(() => {
    async () => {
      try {
        // setLoading(true);

        const notesData = await fetchNotes(type!);
        if (!notesData) return;

        console.log({ notesData });

        // setFetchedNotes(notesData);

        const splitUrl = pathname.split("/");

        // Filter check if path includes noteId
        const pathId = pathname.split(`${path.replace(/^\/+/, "")}`)[1];

        // If no note is selected, route to the first note in the array of retrieved notes
        if (
          path &&
          !pathId &&
          lettersAndNumbersOnly(splitUrl[splitUrl.length - 1]) !== "dashboard"
        )
          router.push(`${pathname}/${notesData[0].id}`);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        // setLoading(false);
      }
    };
  }, [type, pathname, router, path]);

  return (
    <div
      className={clsx(
        "flex-1 overflow-auto h-[calc(100%-4rem)] w-full bottom-0 md:mt-0 md:w-auto fixed md:static transition-all duration-200 z-[100]",
        !showNotes &&
          "translate-y-full md:translate-y-[0px] md:-translate-x-full_ md:absolute_ md:w-auto"
      )}
    >
      <div
        ref={notesRef}
        className={clsx(
          "py-[32px] flex flex-col overflow-auto h-full px-4 transition-transform duration-300 static bg-body"
        )}
      >
        <header className="flex items-center gap-[5px] mb-[24px]">
          <h1 className="text-[24px] font-bold">
            {type == "all"
              ? "All Notes"
              : type == "favourite"
              ? "Favourites"
              : type == "archived"
              ? "Archived"
              : type == "deleted"
              ? "Recently Deleted"
              : "Notes"}
          </h1>
          <ExpandMoreIcon />
          <IconButton
            icon={XClose}
            title="hide notes"
            onClick={() => toggleNotes()}
            className="ml-auto md:hidden"
          />
        </header>
        <div className="space-y-2">
          {loading ? (
            <NotesLoader variant="list" />
          ) : fetchedNotes.length ? (
            fetchedNotes.map((note, i) => (
              <NavLink
                href={`${path}${note.id}`}
                key={(note.date + i.toString()).toString()}
                onClick={() => toggleNotes()}
              >
                {({ isActive }) => (
                  <NoteWrapper
                    index={i}
                    title={note.title}
                    containerRef={notesRef}
                    isActive={isActive}
                  >
                    <NoteItem
                      id={note.id}
                      title={note.title}
                      subtitle={note.subtitle}
                      tag={note.tag}
                      type={note.type}
                      favourite={note.favourite}
                      date={note?.date}
                      folder={note.folder}
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
