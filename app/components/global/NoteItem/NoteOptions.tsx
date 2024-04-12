"use client";
import clsx from "clsx";
import { DropdownMenu } from "..";
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
} from "../../svgs";
import {
  addNoteToArchive,
  addNoteToFavorite,
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
import { Menu } from "../DropdownMenu/DropdownMenu";
import Button from "../../button";
import { useTags } from "@/hooks";
import Spinner from "../Spinner/Spinner";
import { createTag } from "@/controllers/tag";
import Input from "../../input";
import { updateTags } from "@/store/slices/tags";
import useFolders from "@/hooks/useFolders";
import { createFolder } from "@/controllers/folder";
import { updateFolders } from "@/store/slices/folders";
import { triggerNotification } from "@/store/slices/notification";

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
  const isArchivePage = splitPathName.includes("archived");
  const isFavouritesPage = splitPathName.includes("favourites");
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
            console.log({ added, isFavouritesPage });
            if (added && !isFavouritesPage) removeNoteFromNotes();
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
        dispatch(triggerNotification({ message: "Coming Soon" }));
      },
      icon: <SearchIcon className="!stroke-primary" />,
      label: "search note",
    },
    {
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
      icon: <FolderDownLoadIcon className="!stroke-primary rotate-90" />,
      label: "move to folder",
    },
    {
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
      icon: <TagIcon className="!stroke-primary" />,
      label: "add tag",
    },
    {
      action() {
        console.log("ACTION");
        dispatch(triggerNotification({ message: "Coming Soon" }));
      },
      icon: <InfoCircleIcon className="!stroke-primary" />,
      label: "note info",
    },
    {
      action(options) {
        executeAction(
          async () => {
            const added = await addNoteToArchive(note?.id!);
            console.log({ added, isFavouritesPage });
            if (added && !isArchivePage) removeNoteFromNotes();
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

function AddTag({
  note,
  setLoading,
}: {
  note?: Note;
  setLoading(status: boolean): void;
}) {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags);
  const notes = useAppSelector((state) => state.notes);
  const { fetchedTags, loading } = useTags();

  const menuItems: MenuItem[] = tags.map((tag) => ({
    icon: <TagIcon />,
    label: tag.name,
    action(options) {
      executeAction(
        async () => {
          try {
            setLoading(true);
            const noteTag = await tagNote(note?.id || "", tag.id);

            console.log("N0TE_TAG: ", { noteTag });

            if (!noteTag) return;

            // const notesCopy = [...notes];

            // const editedNote = notesCopy.find(
            //   (noteItem) => noteItem.id === note?.id
            // );

            // editedNote!.tag = noteTag;

            // console.log("UPDATE_N0TES: ", { notesCopy, noteTag, editedNote });

            dispatch(
              updateNotes(
                [...notes].map((noteItem) => {
                  if (noteItem.id === note?.id) {
                    return { ...noteItem, tag: noteTag };
                  }
                  return noteItem;
                })
              )
            );
          } catch (error) {
            console.error("ADD_TAG:execute-action==> ", { error });
          } finally {
            setLoading(false);
          }
        },
        {
          message: {
            icon: TagIcon,
            title: "Tag Note",
            text: (
              <p>
                Are you sure you want to tag{" "}
                <span className="text-primary font-bold">{note?.title}</span> as{" "}
                <span className="text-primary font-bold">{tag.name}</span>
              </p>
            ),
          },
          setLoading: (status) => options?.handleLoading(status),
        }
      );
    },
  }));

  const handleCreateTag = async (value: string) => {
    if (!value)
      return notify({
        icon: InfoCircleIcon,
        message: "Please enter a valid tag name",
        type: "warning",
      });
    const createdTag = await createTag(value);

    console.log({ createdTag });

    if (createdTag) {
      dispatch(updateTags([...tags, createdTag]));
    }
  };

  const TagInput = () => {
    const [tagInput, setTagInput] = useState("");

    return (
      <form
        className="space-y-2 pb-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateTag(tagInput);
        }}
      >
        <small className="text-ms text-gray-600">Enter tag name:</small>
        <Input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="text-gray-700 outline outline-2 outline-primary-3"
        />
        <Button type="submit">Create</Button>
      </form>
    );
  };

  const toggleForm = () =>
    dispatch(
      triggerModal({
        children: <TagInput />,
        show: true,
      })
    );

  const TagLoader = () => (
    <div className="flex gap-3 p-4 cursor-pointer items-center hover:bg-primary-13 active:bg-primary-10 whitespace-nowrap rounded-md outline outline-1 outline-gray-300">
      <span className="opacity-55">
        <TagIcon />
      </span>
      <div
        className={clsx(
          "bg-gray-200 animate-loader-opacity rounded-sm h-6 w-1/2"
        )}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 px-3">
        <div className="flex items-center">
          <h3 className="text-xl">Select Tag for this Note</h3>
          <ExpandMoreIcon />
        </div>
        <div>
          <Button onClick={() => toggleForm()} className="py-1 rounded-md">
            new
          </Button>
        </div>
      </div>

      {loading ? (
        // <div className="w-full p-3">
        //   <Spinner className="!h-[10px] !w-[10px]" size="small" />
        // </div>
        <div className="w-full p-3 space-y-2">
          <TagLoader />
          <TagLoader />
        </div>
      ) : menuItems.length ? (
        <Menu menuItems={menuItems} />
      ) : (
        <div className="w-full p-3 space-y-3 text-center">
          <p>You have no available tags</p>
          <button
            onClick={() => toggleForm()}
            className="!w-[80%] py-2 mx-auto text-primary font-bold"
          >
            Create new Tag
          </button>
        </div>
      )}
    </div>
  );
}

function AddFolder({
  note,
  setLoading,
}: {
  note?: Note;
  setLoading(status: boolean): void;
}) {
  const dispatch = useAppDispatch();
  const folders = useAppSelector((state) => state.folders);
  const notes = useAppSelector((state) => state.notes);
  const { fetchedFolders, loading } = useFolders();

  const menuItems: MenuItem[] = folders.map((folder) => ({
    icon: <FolderOutlineIcon />,
    label: folder.name,
    action(options) {
      executeAction(
        async () => {
          try {
            setLoading(true);
            const noteFolder = await addNoteToFolder(note?.id || "", folder.id);

            console.log("N0TE_FOLDER: ", { noteFolder });

            if (!noteFolder) return;

            // const notesCopy = [...notes];

            // const editedNote = notesCopy.find(
            //   (noteItem) => noteItem.id === note?.id
            // );

            // editedNote!.folder = noteFolder;

            // console.log("UPDATE_N0TES: ", { notesCopy, noteFolder, editedNote });

            dispatch(
              updateNotes(
                [...notes].map((noteItem) => {
                  if (noteItem.id === note?.id) {
                    return { ...noteItem, folder: noteFolder };
                  }
                  return noteItem;
                })
              )
            );
          } catch (error) {
            console.error("ADD_FOLDER:execute-action==> ", { error });
          } finally {
            setLoading(false);
          }
        },
        {
          message: {
            icon: ArchiveIcon,
            title: "Folder Note",
            text: (
              <p>
                Are you sure you want to add{" "}
                <span className="text-primary font-bold">{note?.title}</span> to{" "}
                <span className="text-primary font-bold">{folder.name}</span>{" "}
                folder
              </p>
            ),
          },
          setLoading: (status) => options?.handleLoading(status),
        }
      );
    },
  }));

  const handleCreateFolder = async (value: string) => {
    if (!value)
      return notify({
        icon: InfoCircleIcon,
        message: "Please enter a valid folder name",
        type: "warning",
      });
    const createdFolder = await createFolder(value);

    console.log({ createdFolder });

    if (createdFolder) {
      dispatch(updateFolders([...folders, createdFolder]));
    }
  };

  const FolderInput = () => {
    const [folderInput, setFolderInput] = useState("");

    return (
      <form
        className="space-y-2 pb-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateFolder(folderInput);
        }}
      >
        <small className="text-ms text-gray-600">Enter folder name:</small>
        <Input
          type="text"
          value={folderInput}
          onChange={(e) => setFolderInput(e.target.value)}
          className="text-gray-700 outline outline-2 outline-primary-3"
        />
        <Button type="submit">Create</Button>
      </form>
    );
  };

  const toggleForm = () =>
    dispatch(
      triggerModal({
        children: <FolderInput />,
        show: true,
      })
    );

  const FolderLoader = () => (
    <div className="flex gap-3 p-4 cursor-pointer items-center hover:bg-primary-13 active:bg-primary-10 whitespace-nowrap rounded-md outline outline-1 outline-gray-300">
      <span className="opacity-55">
        <FolderOutlineIcon />
      </span>
      <div
        className={clsx(
          "bg-gray-200 animate-loader-opacity rounded-sm h-6 w-1/2"
        )}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 px-3">
        <div className="flex items-center">
          <h3 className="text-xl">Select Folder for this Note</h3>
          <ExpandMoreIcon />
        </div>
        <div>
          <Button onClick={() => toggleForm()} className="py-1 rounded-md">
            new
          </Button>
        </div>
      </div>

      {loading ? (
        // <div className="w-full p-3">
        //   <Spinner className="!h-[10px] !w-[10px]" size="small" />
        // </div>
        <div className="w-full p-3 space-y-2">
          <FolderLoader />
          <FolderLoader />
        </div>
      ) : menuItems.length ? (
        <Menu menuItems={menuItems} />
      ) : (
        <div className="w-full p-3 space-y-3 text-center">
          <p>You have no available folders</p>
          <button
            onClick={() => toggleForm()}
            className="!w-[80%] py-2 mx-auto text-primary font-bold"
          >
            Create new Folder
          </button>
        </div>
      )}
    </div>
  );
}
