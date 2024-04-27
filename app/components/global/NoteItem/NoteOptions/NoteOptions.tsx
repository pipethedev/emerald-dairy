"use client";
import clsx from "clsx";
import { DropdownMenu } from "../..";
import {
  ArchiveIcon,
  ExpandMoreIcon,
  FolderDownLoadIcon,
  FolderOutlineIcon,
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
} from "../../../svgs";
import {
  addNoteToArchive,
  addNoteToFavourite,
  addNoteToFolder,
  deleteNote,
  deleteNotePermanently,
  tagNote,
} from "@/controllers/note";
import { ComponentProps, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { closeModal, triggerModal } from "@/store/slices/modal";
import { usePathname } from "next/navigation";
import { updateNotes } from "@/store/slices/notes";
import { executeAction, notify } from "@/lib/utils/helpers";
import { Menu } from "../../DropdownMenu/DropdownMenu";
import Button from "../../../button";
import { useTags } from "@/hooks";
import Spinner from "../../Spinner/Spinner";
import { createTag } from "@/controllers/tag";
import Input from "../../../input";
import { updateTags } from "@/store/slices/tags";
import useFolders from "@/hooks/useFolders";
import { createFolder } from "@/controllers/folder";
import { updateFolders } from "@/store/slices/folders";
import { triggerNotification } from "@/store/slices/notification";
import AddFolder from "./AddFolder";
import AddTag from "./AddTag";

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
  const isAllNotesPage = splitPathName.includes("all-notes");
  const isArchivePage = splitPathName.includes("archived");
  const isFavouritesPage = splitPathName.includes("favourites");
  const isDeletePage = splitPathName.includes("recently-deleted");

  const removeNoteFromList = () => {
    dispatch(updateNotes(notes.filter((noteItem) => noteItem.id !== note?.id)));
    setShowDropdown(false);
  };

  const options: MenuItemType[] = [
    {
      icon: <HeartsOutlineIcon className="!stroke-primary" />,
      label: "add to favourite",
      action(options) {
        executeAction(
          async () => {
            console.log("NOTE TO ADD: ", note);
            if (note?.type === "favourite") {
              dispatch(
                triggerNotification({
                  message: `Note already in ${note?.type}`,
                  type: "info",
                  show: true,
                })
              );
              return;
            }
            const added = await addNoteToFavourite(note?.id!);
            console.log({ added, isFavouritesPage });
            if (added && !isFavouritesPage && !isAllNotesPage)
              removeNoteFromList();
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
    },
    // {
    //   icon: <SearchIcon className="!stroke-primary" />,
    //   label: "search note",
    //   action() {
    //     console.log("ACTION");
    //     dispatch(triggerNotification({ message: "Coming Soon" }));
    //   },
    // },
    {
      icon: <FolderDownLoadIcon className="!stroke-primary rotate-90" />,
      label: "move to folder",
      action(options) {
        dispatch(
          triggerModal({
            children: (
              <AddFolder
                setLoading={(status) => options?.handleLoading(status)}
                note={note}
              />
            ),
            show: true,
          })
        );
      },
    },
    {
      icon: <TagIcon className="!stroke-primary" />,
      label: "add tag",
      action(options) {
        dispatch(
          triggerModal({
            children: (
              <AddTag
                setLoading={(status) => options?.handleLoading(status)}
                note={note}
              />
            ),
            show: true,
          })
        );
      },
    },
    // {
    //   icon: <InfoCircleIcon className="!stroke-primary" />,
    //   label: "note info",
    //   action() {
    //     console.log("ACTION");
    //     dispatch(triggerNotification({ message: "Coming Soon" }));
    //   },
    // },
    {
      icon: <ArchiveIcon className="!stroke-primary" />,
      label: "archive note",
      action(options) {
        executeAction(
          async () => {
            console.log("NOTE TO ADD: ", note);
            if (note?.type === "archived") {
              dispatch(
                triggerNotification({
                  message: `Note already in ${note?.type}`,
                  type: "info",
                  show: true,
                })
              );
              return;
            }
            const added = await addNoteToArchive(note?.id!);
            console.log({ added, isFavouritesPage });
            if (added && !isArchivePage && !isAllNotesPage)
              removeNoteFromList();
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
    },
    {
      icon: <TrashIcon className="!stroke-red-400" />,
      label: isDeletePage ? "delete note permanently" : "delete note",
      action(options) {
        executeAction(
          async () => {
            if (note?.type === "deleted") {
              dispatch(
                triggerNotification({
                  message: `Note already in ${note?.type}`,
                  type: "info",
                  show: true,
                })
              );
              return;
            }
            const deleted = isDeletePage
              ? await deleteNotePermanently(note?.id!)
              : await deleteNote(note?.id!);

            if (deleted) {
              removeNoteFromList();
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
