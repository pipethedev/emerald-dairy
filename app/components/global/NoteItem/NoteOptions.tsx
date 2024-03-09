"use client";
import clsx from "clsx";
import { DropdownMenu } from "..";
import {
  ArchiveIcon,
  FolderDownLoadIcon,
  HeartsOutlineIcon,
  Info,
  InfoCircleIcon,
  Lock4Icon,
  Logout2Icon,
  MoreHorisIcon,
  PaletteIcon,
  SearchIcon,
  TagIcon,
  TrashIcon,
  User3Icon,
} from "../../svgs";
import {
  addNoteToArchive,
  addNoteToFavorite,
  deleteNote,
  deleteNotePermanently,
} from "@/controllers/note";
import { ComponentProps, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { closeModal, triggerModal } from "@/store/slices/modal";
import { usePathname } from "next/navigation";
import { updateNotes } from "@/store/slices/notes";
import { executeAction } from "@/lib/utils/helpers";

type Props = {
  noteActive?: boolean;
  note?: Note;
};

export default function NoteOptions({ noteActive, note }: Props) {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);
  const [showDropdown, setShowDropdown] = useState(false);

  const pathname = usePathname();

  const splitPathName = pathname.split("/");
  const isDeletePage = splitPathName.includes("recently-deleted");

  const removeNoteFromNotes = () => {
    dispatch(updateNotes(notes.filter((noteItem) => noteItem.id !== note?.id)));
    setShowDropdown(false);
  };

  const options: MenuItem[] = [
    {
      action(options) {
        executeAction(
          async () => {
            const added = await addNoteToFavorite(note?.id!);
            if (added) removeNoteFromNotes();
          },
          {
            message: {
              icon: ArchiveIcon,
              title: "Add Note to Favourites",
              text: (
                <p>
                  Are you sure you want to add{" "}
                  <span className="text-primary font-bold">{note?.title}</span>{" "}
                  to Favourites?
                </p>
              ),
            },
            setLoading: (status) => options?.handleLoading(status),
          }
        );
      },
      icon: <HeartsOutlineIcon className="!stroke-primary" />,
      label: "add to favourite",
    },
    {
      action() {
        console.log("ACTION");
        deleteNote("");
      },
      icon: <SearchIcon className="!stroke-primary" />,
      label: "search note",
    },
    {
      action() {
        console.log("ACTION");
        deleteNote("");
      },
      icon: <FolderDownLoadIcon className="!stroke-primary rotate-90" />,
      label: "move to folder",
    },
    {
      action() {
        console.log("ACTION");
        deleteNote("");
      },
      icon: <TagIcon className="!stroke-primary" />,
      label: "add tag",
    },
    {
      action() {
        console.log("ACTION");
        deleteNote("");
      },
      icon: <InfoCircleIcon className="!stroke-primary" />,
      label: "note info",
    },
    {
      action(options) {
        executeAction(
          async () => {
            const added = await addNoteToArchive(note?.id!);
            if (added) removeNoteFromNotes();
          },
          {
            message: {
              icon: ArchiveIcon,
              title: "Archive Note",
              text: (
                <p>
                  Are you sure you want to add{" "}
                  <span className="text-primary font-bold">{note?.title}</span>{" "}
                  to archive?
                </p>
              ),
            },
            setLoading: (status) => options?.handleLoading(status),
          }
        );
      },
      icon: <ArchiveIcon className="!stroke-primary" />,
      label: "archive note",
    },
    {
      action(options) {
        executeAction(
          async () => {
            const deleted = isDeletePage
              ? await deleteNotePermanently(note?.id!)
              : await deleteNote(note?.id!);

            if (deleted) {
              removeNoteFromNotes();
              setShowDropdown(false);
            }
          },
          {
            message: {
              type: "error",
              icon: TrashIcon,
              title: "Delete Note",
              text: (
                <p>
                  Are you sure you want to delete{" "}
                  <span className="text-primary font-bold">{note?.title}</span>{" "}
                  {isDeletePage && (
                    <span className="text-red-400 font-extrabold !uppercase">
                      permanently
                    </span>
                  )}
                  ?
                </p>
              ),
            },
            setLoading: (status) => options?.handleLoading(status),
          }
        );
      },
      icon: <TrashIcon className="!stroke-red-400" />,
      label: isDeletePage ? "delete note permanently" : "delete note",
    },
  ];

  return (
    <DropdownMenu
      menuItems={options}
      show={showDropdown}
      setShow={setShowDropdown}
      buttonProps={{
        icon: MoreHorisIcon,
        title: "options",
        stroke: "!stroke-primary",
        className: clsx(
          "bg-[#F2F2F2] grid place-items-center relative",
          noteActive && "bg-primary-10"
        ),
      }}
      className="-right-6"
      buttonWrapper={(children) => <div className="relative">{children}</div>}
    />
  );
}
