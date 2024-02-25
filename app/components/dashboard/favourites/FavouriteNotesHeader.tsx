"use client";

import React, { useEffect, useState } from "react";
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
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";

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
  const [activeModal, setActiveModal] = useState<string | null>(null); // State to manage active modal

  // Function to handle modal opening
  const handleModalOpen = (value: string) => {
    setActiveModal(value);
  };

  // Function to handle modal closing
  const handleModalClose = () => {
    setActiveModal(null);
  };

  const archive = () => {
    alert("archived");
  };

  const [noteId, setNoteId] = useState<string | null>(null);

  useEffect(() => {
    // Get the pathname from the window location
    const pathname = window.location.pathname;

    // Split the pathname by '/' to get an array of path segments
    const parts = pathname.split("/");

    // Get the last part of the pathname
    const lastPart = parts[parts.length - 1];

    // Set the noteId to the last part
    setNoteId(lastPart);
  }, []);

  console.log("noteId", noteId);

  const addOrUpdateTag = async (noteId: any, type: any) => {
    try {
      const noteRef = doc(db, "notes", noteId); // Reference to the note document

      // Get the document snapshot
      const docSnap = await getDoc(noteRef);

      // Check if the note document exists
      if (docSnap.exists()) {
        // If the tag field already exists, update it
        // Otherwise, add the tag field to the document
        if (docSnap.data().type) {
          await updateDoc(noteRef, {
            type: type,
          });
        } else {
          await setDoc(noteRef, { type: type }, { merge: true });
        }
        console.log("Tag added/updated successfully");
      } else {
        console.log("Note document does not exist");
      }
    } catch (error) {
      console.error("Error adding/updating tag:", error);
    }
  };

  // Custom Modal Component
  const CustomModal: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
  }) => {
    let modalContent = null;

    if (activeModal === "this") {
      modalContent = <p>{`This is the content for the 'This' icon.`}</p>;
    } else if (activeModal === "that") {
      modalContent = (
        <div>
          {`This is the content for the 'That' icon.`}
          <p onClick={() => addOrUpdateTag(noteId, "archived")}>Archive Note</p>
          <p onClick={() => addOrUpdateTag(noteId, "deleted")}>Delete</p>
          <p onClick={() => addOrUpdateTag(noteId, "favourite")}>
            Add to Favourites
          </p>
        </div>
      );
    } else if (activeModal === "those") {
      modalContent = <p>{`This is the content for the 'Those' icon.`}</p>;
    }

    return (
      <div
        className={clsx(
          "fixed top-50 right-0 ml-1/2 -translate-x-1/2",
          open ? "visible" : "hidden",
          "z-50"
        )}
        onClick={onClose}
      >
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Custom Modal</h2>
          {modalContent}
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

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
            itemBuilder={({ isActive, title, value }) => {
              const Title = title as React.FC<React.SVGProps<SVGElement>>;
              return (
                <button
                  key={value} // Add key prop for each button
                  className={clsx(
                    "p-3 w-10 h-10 aspect-square hover:bg-primary-13 rounded-xl flex items-center justify-center",
                    isActive &&
                      "outline-primary outline-1 outline bg-primary-13"
                  )}
                  onClick={() => handleModalOpen(value)} // Call handleModalOpen on click
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
      {/* Render custom modal */}
      <CustomModal open={!!activeModal} onClose={handleModalClose} />
    </header>
  );
}
