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

type Props = {
  notes?: Note[];
  folder?: any;
  path: string;
  type?: "all" | "favourites" | "archived" | "deleted" | "notes";
};

export default function Notes({ notes, path, type, folder }: Props) {
  const notesRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const showNotes = useAppSelector((state) => state.notesBar);
  const dispatch = useAppDispatch();

  const toggleNotes = () => {
    dispatch(toggleNotesBar());
  };

  const [fetchedNotes, setFetchedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const show = searchParams.get("show-notes");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        let querySnapshot;

        if (type === "all") {
          querySnapshot = await getDocs(collection(db, "notes"));
        } else if (type === "favourites") {
          // Use the `query` function to construct the query
          const q = query(
            collection(db, "notes"),
            where("type", "==", "favourite")
          );
          querySnapshot = await getDocs(q);
        } else if (type === "archived") {
          // Use the `query` function to construct the query
          const q = query(
            collection(db, "notes"),
            where("type", "==", "archived")
          );
          querySnapshot = await getDocs(q);
        } else if (type === "deleted") {
          // Use the `query` function to construct the query
          const q = query(
            collection(db, "notes"),
            where("type", "==", "deleted")
          );
          querySnapshot = await getDocs(q);
        } else if (folder) {
          // Use the `query` function to construct the query
          const q = query(
            collection(db, "notes"),
            where("folder", "==", folder)
          );
          querySnapshot = await getDocs(q);
        }
        if (querySnapshot) {
          const notesData = querySnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Note)
          );
          setFetchedNotes(notesData);
        } else {
          console.log(`No notes found for type: ${type}`);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [type]);

  return (
    <div
      className={clsx(
        "flex-1 overflow-auto h-full w-full md:w-auto fixed md:static transition-all duration-200 z-[100]",
        !showNotes && "translate-y-full md:translate-y-[0px]  md:w-auto"
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
              : type == "favourites"
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
