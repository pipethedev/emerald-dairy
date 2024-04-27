// "use client";
// import clsx from "clsx";
// import { DropdownMenu } from "../..";
// import {
//   ArchiveIcon,
//   ExpandMoreIcon,
//   TagDownLoadIcon,
//   TagOutlineIcon,
//   HeartsOutlineIcon,
//   Info,
//   InfoCircleIcon,
//   Lock4Icon,
//   Logout2Icon,
//   MoreHorisIcon,
//   PaletteIcon,
//   SearchIcon,
//   TagIcon,
//   TrashIcon,
//   User3Icon,
// } from "../../../svgs";
// import {
//   addNoteToArchive,
//   addNoteToFavourite,
//   tagNote,
//   deleteNote,
//   deleteNotePermanently,
//   tagNote,
// } from "@/controllers/note";
// import { ComponentProps, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/hooks/store";
// import { closeModal, triggerModal } from "@/store/slices/modal";
// import { usePathname } from "next/navigation";
// import { updateNotes } from "@/store/slices/notes";
// import { executeAction, notify } from "@/lib/utils/helpers";
// import { Menu } from "../../DropdownMenu/DropdownMenu";
// import Button from "../../../button";
// import { useTags } from "@/hooks";
// import Spinner from "../../Spinner/Spinner";
// import { createTag } from "@/controllers/tag";
// import Input from "../../../input";
// import { updateTags } from "@/store/slices/tags";
// import useTags from "@/hooks/useTags";
// import { createTag } from "@/controllers/tag";
// import { updateTags } from "@/store/slices/tags";
// import { triggerNotification } from "@/store/slices/notification";

// export default function AddTag({
//   note,
//   setLoading,
// }: {
//   note?: Note;
//   setLoading(status: boolean): void;
// }) {
//   const dispatch = useAppDispatch();
//   const tags = useAppSelector((state) => state.tags);
//   const notes = useAppSelector((state) => state.notes);
//   const { fetchedTags, loading } = useTags();

//   const menuItems: MenuItemType[] = tags.map((tag) => ({
//     icon: <TagIcon />,
//     label: tag.name,
//     action(options) {
//       executeAction(
//         async () => {
//           try {
//             setLoading(true);
//             const noteTag = await tagNote(note?.id || "", tag.id);

//             console.log("N0TE_TAG: ", { noteTag });

//             if (!noteTag) return;

//             dispatch(
//               updateNotes(
//                 [...notes].map((noteItem) => {
//                   if (noteItem.id === note?.id) {
//                     return { ...noteItem, tag: noteTag };
//                   }
//                   return noteItem;
//                 })
//               )
//             );
//           } catch (error) {
//             console.error("ADD_TAG:execute-action==> ", { error });
//           } finally {
//             setLoading(false);
//           }
//         },
//         {
//           message: {
//             icon: TagIcon,
//             title: "Tag Note",
//             text: (
//               <p>
//                 Are you sure you want to tag{" "}
//                 <span className="text-primary font-bold">{note?.title}</span> as{" "}
//                 <span className="text-primary font-bold">{tag.name}</span>
//               </p>
//             ),
//           },
//           setLoading: (status) => options?.handleLoading(status),
//         }
//       );
//     },
//   }));

//   const handleCreateTag = async (value: string) => {
//     if (!value)
//       return notify({
//         icon: InfoCircleIcon,
//         message: "Please enter a valid tag name",
//         type: "warning",
//       });
//     const createdTag = await createTag(value);

//     console.log({ createdTag });

//     if (createdTag) {
//       dispatch(updateTags([...tags, createdTag]));
//     }
//   };

//   const TagInput = () => {
//     const [tagInput, setTagInput] = useState("");

//     return (
//       <form
//         className="space-y-2 pb-2"
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleCreateTag(tagInput);
//         }}
//       >
//         <small className="text-ms text-gray-600">Enter tag name:</small>
//         <Input
//           type="text"
//           value={tagInput}
//           onChange={(e) => setTagInput(e.target.value)}
//           className="text-gray-700 outline outline-2 outline-primary-3"
//         />
//         <Button type="submit">Create</Button>
//       </form>
//     );
//   };

//   const toggleForm = () =>
//     dispatch(
//       triggerModal({
//         children: <TagInput />,
//         show: true,
//       })
//     );

//   const TagLoader = () => (
//     <div className="flex gap-3 p-4 cursor-pointer items-center hover:bg-primary-13 active:bg-primary-10 whitespace-nowrap rounded-md outline outline-1 outline-gray-300">
//       <span className="opacity-55">
//         <TagIcon />
//       </span>
//       <div
//         className={clsx(
//           "bg-gray-200 animate-loader-opacity rounded-sm h-6 w-1/2"
//         )}
//       />
//     </div>
//   );

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-4 px-3">
//         <div className="flex items-center">
//           <h3 className="text-xl">Select Tag for this Note</h3>
//           <ExpandMoreIcon />
//         </div>
//         <div>
//           <Button onClick={() => toggleForm()} className="py-1 rounded-md">
//             new
//           </Button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="w-full p-3 space-y-2">
//           <TagLoader />
//           <TagLoader />
//         </div>
//       ) : menuItems.length ? (
//         <Menu menuItems={menuItems} />
//       ) : (
//         <div className="w-full p-3 space-y-3 text-center">
//           <p>You have no available tags</p>
//           <button
//             onClick={() => toggleForm()}
//             className="!w-[80%] py-2 mx-auto text-primary font-bold"
//           >
//             Create new Tag
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import clsx from "clsx";
import { DropdownMenu } from "../..";
import {
  ArchiveIcon,
  ArrowNarrowRIghtIcon,
  ExpandMoreIcon,
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
  tagNote,
  deleteNote,
  deleteNotePermanently,
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
import { triggerNotification } from "@/store/slices/notification";
import { Combobox } from "@headlessui/react";
import AnimateInOut from "../../AnimateInOut";

export default function AddTag({
  note,
}: // setLoading,
{
  note?: Note;
  setLoading(status: boolean): void;
}) {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags);
  const notes = useAppSelector((state) => state.notes);
  const { fetchedTags, loading: tagsLoading } = useTags();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<Tag>();
  // const [query, setQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const filteredTags = tags?.filter((tag) =>
  //   tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleSelectedTerm = (term: Tag) => {
    setSelectedTerm(term);
    //  term = note
  };

  const handleConfirm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!selectedTerm)
        return notify({
          message: "Please select a valid tag",
          type: "warning",
        });

      const noteTag = await tagNote(note?.id || "", selectedTerm?.id);

      console.log("N0TE_FOLDER: ", { noteTag });

      if (!noteTag) return;

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
      console.error("ADD_FOLDER:execute-action==> ", { error });
    } finally {
      setLoading(false);
    }
  };
  // {
  //   message: {
  //     icon: ArchiveIcon,
  //     title: "Tag Note",
  //     text: (
  //       <p>
  //         Are you sure you want to add{" "}
  //         <span className="text-primary font-bold">{note?.title}</span>{" "}
  //         to{" "}
  //         <span className="text-primary font-bold">{tag.name}</span>{" "}
  //         tag
  //       </p>
  //     ),
  //   },
  //   setLoading: (status) => options?.handleLoading(status),
  // }

  useEffect(() => {
    console.log({ selectedTerm });
  }, [selectedTerm]);

  const filteredTags: (Partial<MenuItemType> & {
    id: string;
    name: string;
  })[] = tags
    ?.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((tag) => ({
      id: tag.id,
      icon: <TagIcon />,
      name: tag.name,
      action(options) {
        executeAction(
          async () => {
            try {
              setLoading(true);
              const noteTag = await tagNote(note?.id || "", tag.id);

              console.log("N0TE_FOLDER: ", { noteTag });

              if (!noteTag) return;

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
              console.error("ADD_FOLDER:execute-action==> ", { error });
            } finally {
              setLoading(false);
            }
          },
          {
            message: {
              icon: ArchiveIcon,
              title: "Tag Note",
              text: (
                <p>
                  Are you sure you want to add{" "}
                  <span className="text-primary font-bold">{note?.title}</span>{" "}
                  to <span className="text-primary font-bold">{tag.name}</span>{" "}
                  tag
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
    <form onSubmit={handleConfirm} className="relative mb-2 space-y-2">
      <div className="p-3 rounded-full flex items-center justify-center w-14 h-14 bg-primary-10/70 shrink-0 mt-3 ml-3">
        <TagIcon className="w-full h-full !stroke-primary !stroke-[1px]" />
      </div>
      <div className="flex items-center gap-4 px-3">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">Move note to Tag</h3>
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

      {tagsLoading ? (
        // <div className="w-full p-3">
        //   <Spinner className="!h-[10px] !w-[10px]" size="small" />
        // </div>
        <div className="w-full p-3 space-y-2">
          <TagLoader />
          <TagLoader />
          <TagLoader />
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
                    {filteredTags.length ? (
                      filteredTags.map((tag) => {
                        const menuItem: MenuItemType = {
                          icon: tag.icon,
                          label: tag.name,
                          action: tag.action,
                        };
                        return (
                          <Combobox.Option
                            as={Fragment}
                            key={tag.id}
                            value={tag}
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
                              //         <TagIcon
                              //           className={clsx(
                              //             "!stroke-[#AAAAAD]",
                              //             active && "!stroke-primary"
                              //           )}
                              //         />
                              //         {tag.name}
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
                                <TagIcon
                                  className={clsx(
                                    "!stroke-[#AAAAAD]",
                                    active && "!stroke-primary"
                                  )}
                                />
                                {tag.name}
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
              Move to {`"${selectedTerm?.name}" tag`}
            </Button>
          )}
        </>
      )}
    </form>
  );
}
