"use client";
import clsx from "clsx";
import { DropdownMenu } from "../..";
import {
  ArchiveIcon,
  ArrowNarrowRIghtIcon,
  ExpandMoreIcon,
  FolderDownLoadIcon,
  FolderIcon,
  FolderOutlineIcon,
  HeartsOutlineIcon,
  Info,
  InfoCircleIcon,
  Lock4Icon,
  Logout2Icon,
  MoreHorisIcon,
  PaletteIcon,
  PlusIcon,
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
import { ComponentProps, Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { closeModal, triggerModal } from "@/store/slices/modal";
import { usePathname } from "next/navigation";
import { updateNotes } from "@/store/slices/notes";
import { executeAction, notify } from "@/lib/utils/helpers";
import { Menu, MenuItem } from "../../DropdownMenu/DropdownMenu";
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
import { Combobox } from "@headlessui/react";
import AnimateInOut from "../../AnimateInOut";

export default function AddFolder({
  note,
}: // setLoading,
{
  note?: Note;
  setLoading(status: boolean): void;
}) {
  const dispatch = useAppDispatch();
  const folders = useAppSelector((state) => state.folders);
  const notes = useAppSelector((state) => state.notes);
  const { fetchedFolders, loading: foldersLoading } = useFolders();

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<Folder>();
  // const [query, setQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const filteredFolders = folders?.filter((folder) =>
  //   folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleSelectedTerm = (term: Folder) => {
    setSelectedTerm(term);
    //  term = note
  };

  const handleConfirm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!selectedTerm)
        return notify({
          message: "Please select a valid folder",
          type: "warning",
        });

      const noteFolder = await addNoteToFolder(
        note?.id || "",
        selectedTerm?.id
      );

      console.log("N0TE_FOLDER: ", { noteFolder });

      if (!noteFolder) return;

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
  };
  // {
  //   message: {
  //     icon: ArchiveIcon,
  //     title: "Folder Note",
  //     text: (
  //       <p>
  //         Are you sure you want to add{" "}
  //         <span className="text-primary font-bold">{note?.title}</span>{" "}
  //         to{" "}
  //         <span className="text-primary font-bold">{folder.name}</span>{" "}
  //         folder
  //       </p>
  //     ),
  //   },
  //   setLoading: (status) => options?.handleLoading(status),
  // }

  useEffect(() => {
    console.log({ selectedTerm });
  }, [selectedTerm]);

  const filteredFolders: (Partial<MenuItemType> & {
    id: string;
    name: string;
  })[] = folders
    ?.filter((folder) =>
      folder.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((folder) => ({
      id: folder.id,
      icon: <FolderOutlineIcon />,
      name: folder.name,
      action(options) {
        executeAction(
          async () => {
            try {
              setLoading(true);
              const noteFolder = await addNoteToFolder(
                note?.id || "",
                folder.id
              );

              console.log("N0TE_FOLDER: ", { noteFolder });

              if (!noteFolder) return;

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
                  <span className="text-primary font-bold">{note?.title}</span>{" "}
                  to{" "}
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
    <form onSubmit={handleConfirm} className="relative mb-2 space-y-2">
      <div className="p-3 rounded-full flex items-center justify-center w-14 h-14 bg-primary-10/70 shrink-0 mt-3 ml-3">
        <FolderDownLoadIcon className="-rotate-90 w-full h-full !stroke-primary !stroke-[1px]" />
      </div>
      <div className="flex items-center gap-4 px-3">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">Move note to Folder</h3>
        </div>
        <div className="relative ml-auto group flex items-center justify-center_">
          <span className="absolute_">
            <PlusIcon className="!stroke-primary group-hover:translate-x-0 group-hover:opacity-100 opacity-0 group-hover:rotate-0 translate-x-8 rotate-90 transition-all duration-700" />
          </span>
          <button
            onClick={() => toggleForm()}
            className="p-1 text-primary bg-gradient-to-r from-transparent to-body z-10 font-semibold ml-auto"
          >
            new
          </button>
        </div>
      </div>

      {foldersLoading ? (
        // <div className="w-full p-3">
        //   <Spinner className="!h-[10px] !w-[10px]" size="small" />
        // </div>
        <div className="w-full p-3 space-y-2">
          <FolderLoader />
          <FolderLoader />
          <FolderLoader />
        </div>
      ) : (
        <>
          <Combobox value={selectedTerm} onChange={handleSelectedTerm}>
            {({ open = false }) => (
              <>
                <div className="relative p-2 h-full flex items-center gap-2 w-full z-[102]">
                  <SearchIcon />
                  <Combobox.Input
                    className="outline-none w-full h-full placeholder-[#B3B3B3] z-[102] bg-transparent text-[14px]"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    // displayValue={(person) => {
                    //   console.log({ person });
                    //   return "";
                    // }}
                  />
                </div>
                {/*
             Use the `Transition` + `open` render prop argument to add transitions.
           */}
                {/* <Transition
               show={open && searchTerm !== ""}
               enter="transition duration-100 ease-out"
               enterFrom="transform translate-y-[-100px] opacity-0"
               enterTo="transform translate-y-0 opacity-100"
               leave="transition duration-75 ease-out"
               leaveFrom="transform translate-y-0 opacity-100"
               leaveTo="transform translate-y-[-100px] opacity-0"
             > */}
                {/*
               Don't forget to add `static` to your `Combobox.Options`!
             */}
                <AnimateInOut
                  show={(open && searchTerm !== "") || true}
                  initial={{ opacity: 0, translateY: -100 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -100 }}
                  transition={{ type: "keyframes", duration: 0.3 }}
                  className="!z-[101] overflow-auto space-y-2 transition-all duration-200 left-0 w-full max-h-40"
                >
                  <Combobox.Options hold className="space-y-2 p-1" static>
                    {filteredFolders.length ? (
                      filteredFolders.map((folder) => {
                        const menuItem: MenuItemType = {
                          icon: folder.icon,
                          label: folder.name,
                          action: folder.action,
                        };
                        return (
                          <Combobox.Option
                            as={Fragment}
                            key={folder.id}
                            value={folder}
                          >
                            {({ active, selected }) => (
                              // <>
                              //   <MenuItem
                              //     item={menuItem}
                              //     itemBuilder={({ loading }) => (
                              //       <li
                              //         className={clsx(
                              //           "bg-gray-100/70 rounded-lg outline outline-[1px] outline-[#AAAAAD] mx-auto w-[98%]_ px-2 py-3 flex w-full gap-2 text-gray-500 cursor-pointer active:scale-95 transition-all duration-200",
                              //           active &&
                              //             "bg-primary-3/20 !text-primary !outline-primary",
                              //           selected &&
                              //             "bg-primary !outline-primary"
                              //         )}
                              //       >
                              //         <FolderIcon
                              //           className={clsx(
                              //             "!stroke-[#AAAAAD]",
                              //             active && "!stroke-primary"
                              //           )}
                              //         />
                              //         {folder.name}
                              //         <ArrowNarrowRIghtIcon
                              //           className={clsx(
                              //             "ml-auto !stroke-[#AAAAAD]",
                              //             active && "!stroke-primary"
                              //           )}
                              //         />
                              //       </li>
                              //     )}
                              //   />
                              // </>
                              <li
                                className={clsx(
                                  "bg-gray-100/70 rounded-lg outline outline-[1px] outline-[#AAAAAD] mx-auto w-[98%]_ px-2 py-3 flex w-full gap-2 text-gray-500 cursor-pointer active:scale-95 transition-all duration-200",
                                  active &&
                                    "bg-primary-3/20 !text-primary !outline-primary",
                                  selected && "bg-primary !outline-primary"
                                )}
                              >
                                <FolderIcon
                                  className={clsx(
                                    "!stroke-[#AAAAAD]",
                                    active && "!stroke-primary"
                                  )}
                                />
                                {folder.name}
                                <ArrowNarrowRIghtIcon
                                  className={clsx(
                                    "ml-auto !stroke-[#AAAAAD]",
                                    active && "!stroke-primary"
                                  )}
                                />
                              </li>
                            )}
                          </Combobox.Option>
                        );
                      })
                    ) : (
                      <p className="text-gray-800">
                        No results match your search term
                      </p>
                    )}
                  </Combobox.Options>
                </AnimateInOut>
                {/* </Transition> */}
              </>
            )}
          </Combobox>
          {selectedTerm && (
            <Button loading={loading} className="py-2_ rounded-lg">
              Move to {`"${selectedTerm?.name}" folder`}
            </Button>
          )}
        </>
      )}
    </form>
  );
}

export const FolderInput = () => {
  const [folderInput, setFolderInput] = useState("");
  const dispatch = useAppDispatch();
  const folders = useAppSelector((state) => state.folders);

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
