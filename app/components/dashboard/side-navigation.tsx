"use client";
import Image from "next/image";
import {
  AddIcon,
  FolderIcon,
  FolderOutlineIcon,
  HeartsIcon,
  Lock4Icon,
  Logout2Icon,
  PaletteIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  TagIcon,
  TrashIcon,
  User3Icon,
} from "../svgs";
import { sideNavigationLinksData } from "@/app/components/dashboard/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { H4, H2, H5 } from "@/lib/utils/typography";
import VerseOfDay from "./verseOfDay";
import { Disclosure, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { toggleNavbar } from "@/store/slices/navbar";
import {
  ComponentProps,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Button,
  DropdownMenu,
  IconButton,
  Overlay,
  SettingsMenu,
} from "../global";
import Media from "react-media";
import AnimateInOut from "../global/AnimateInOut/AnimateInOut";
import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase/firebase-client";
import { closeModal, triggerModal } from "@/store/slices/modal";
import { triggerNotification } from "@/store/slices/notification";
import { useFolders, useTags } from "@/hooks";
import { deleteTag } from "@/controllers/tag";
import { updateTags } from "@/store/slices/tags";
import ColorTheme from "../global/ColorTheme/ColorTheme";

export default function DashboardSideNavigation() {
  const pathname = usePathname();

  const [smallScreen, setSmallScreen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const showNav = useAppSelector((state) => state.navbar);
  const hideNav = !showNav;
  const dispatch = useAppDispatch();

  const tags = useAppSelector((state) => state.tags);
  const folders = useAppSelector((state) => state.folders);
  const { fetchedTags, loading: tagsLoading } = useTags();
  const { fetchedFolders, loading: foldersLoading } = useFolders();

  const toggleNav = (state: boolean) => {
    dispatch(toggleNavbar(state));
  };

  useEffect(() => {
    if (!smallScreen) {
      toggleNav(true);
      return;
    }

    toggleNav(false);
  }, [pathname]);

  useEffect(() => {
    const currentUser =
      typeof window !== "undefined"
        ? localStorage.getItem("currentUser")
        : null;
    console.log(currentUser);

    // NOTE:COMEBACK
    // if(currentUser == null){
    //   location.href ='/signin'
    // }
  }, []);

  const NavOverlay = () => {
    return (
      <Overlay
        show={showNav}
        handleShowOverlay={() => () => toggleNav(false)}
        disableOnClick
        className="z-[998]"
      />
    );
  };

  const hi = () => {
    alert("hello");
  };
  const [fetchedFolder, setFetchedFolders] = useState<any>([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        // setLoading(true);
        let querySnapshot;

        // querySnapshot = await getDocs(collection(db, "folders"));
        querySnapshot = await Promise.resolve();

        // if (querySnapshot) {
        //   const notesData = querySnapshot.docs.map(
        //     (doc) =>
        //       ({
        //         id: doc.id,
        //         ...doc.data(),
        //       } as Note)
        //   );
        //   setFetchedFolders(notesData);

        //   console.log(notesData);
        // } else {
        //   console.log(`No favourites found`);
        // }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        // setLoading(false);
      }
    };

    // fetchFolders();
  }, []);

  const [selectedFolder, setSelectedFolder] = useState("");

  // Function to handle click event
  const handleFolderClick = (folder: any) => {
    // Set the selected folder to localStorage
    localStorage.setItem("selectedFolder", folder);
    // Update the state
    setSelectedFolder(folder);
  };

  const AntiDropdownView = ({
    children,
    ...divProps
  }: PropsWithChildren<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >) => (
    <div
      {...divProps}
      onClick={() => {
        if (showDropdown) setShowDropdown(false);
      }}
    >
      {children}
    </div>
  );

  return (
    <>
      {smallScreen && <NavOverlay />}
      <Media queries={{ small: { maxWidth: 768 } }}>
        {(matches) => {
          console.log({ smallScreen, matchesSmall: matches.small });
          if (matches.small !== smallScreen) {
            // console.log("CHANGED!");
            // NOTE: Yeah, I know this throws dirty warnings, but just let it be for now. It works, so we should prolly let it be until a better solution pops up.
            setSmallScreen(matches.small && true);
          }
          return (
            <div
              className={clsx(
                "w-[255px] fixed md:static z-[998] bg-body h-screen border-r-[1px] border-r-[#F2F2F2] lg:block_  md:translate-x-0 transition-all duration-150 flex flex-col overflow-y-auto_",
                hideNav && "-translate-x-full"
              )}
            >
              <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] px-[12px] flex flex-row items-center">
                <AntiDropdownView className="py-[14px] flex flex-row items-center flex-1">
                  <div className="h-[44px] w-[44px] rounded-[8px] p-[10px] grid place-items-center bg-[#FEF6F4]">
                    <figure>
                      <HeartsIcon className="stroke-primary" />
                    </figure>
                  </div>
                  <H4 className="font-bold cursor-pointer font-aeonikBold -tracking-[0.16px] text-black">
                    <span className="text-[#956E60]">Emerald</span>{" "}
                    <span>Diary</span>
                  </H4>
                  {/* <ColorTheme /> */}
                </AntiDropdownView>
                <SettingsMenu
                  setShowDropdown={setShowDropdown}
                  showDropdown={showDropdown}
                />
              </header>
              <AntiDropdownView className="h-[72px] px-[12px] py-[16px] flex items-center gap-[11px] border-b-[1px] border-b-[#F2F2F2]">
                <figure>
                  <Image
                    src="/images/bimbo-profile.png"
                    width={40}
                    height={40}
                    draggable={false}
                    alt="Bimbo Profile"
                    className="rounded-[8px]"
                  />
                </figure>
                <div>
                  <h2 className="text-[12px] font-normal text-black font-aeonik">
                    Bimbo
                  </h2>
                  <p className="text-[#999999] text-[10px]">bimbo@gmail.com</p>
                </div>
              </AntiDropdownView>
              {/* quick links */}
              <AntiDropdownView className="overflow-auto flex-1">
                <div className="relative border-b-[1px] border-b-[#F2F2F2] px-[12px] gap-[12px] py-[8px] overflow-auto">
                  <h1 className="text-[#AE8779] font-black font-aeonikBold -tracking-[0.1px] text-[10px] py-[12px]">
                    QUICK LINKS
                  </h1>
                  <div className="flex flex-col gap-2">
                    {sideNavigationLinksData.map((link, i) => {
                      const isAllNotesActiveRoute = pathname === link.href;

                      const isActiveRoute = pathname.includes(link.href);

                      const linkItem =
                        link.href === "/dashboard" ? (
                          <Link href={link.href} key={i}>
                            <button
                              className={clsx(
                                "w-full rounded-[8px]  hover:bg-[#956E60]/20 transition-all duration-300  px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]",
                                isAllNotesActiveRoute &&
                                  "bg-[#FEF2EE] font-extrabold text-[#956E60]"
                              )}
                            >
                              <link.leading
                                className={
                                  isAllNotesActiveRoute
                                    ? "!stroke-[#956E60]"
                                    : "!stroke-[#AAAAAD]"
                                }
                              />
                              <p>{link.linkText}</p>
                            </button>
                          </Link>
                        ) : (
                          <Link href={link.href} key={i}>
                            <button
                              className={clsx(
                                "w-full rounded-[8px] hover:bg-[#956E60]/20 transition-all duration-300 px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]",
                                isActiveRoute &&
                                  "bg-[#FEF2EE] font-extrabold text-[#956E60]"
                              )}
                            >
                              <link.leading
                                className={
                                  isActiveRoute
                                    ? "!stroke-[#956E60] stroke-1"
                                    : "!stroke-[#AAAAAD] stroke-1"
                                }
                              />
                              <p>{link.linkText}</p>
                            </button>
                          </Link>
                        );

                      return linkItem;
                    })}
                  </div>
                </div>
                {/* Tags and folders */}
                <div className="px-[14px] py-2 flex flex-col items-start gap-[16px] mb-[16px]">
                  {/* FOLDERS */}
                  <div className="w-full">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex flex-row items-center w-full justify-between">
                            <H5 className="text-[#AE8779] !font-bold">TAGS</H5>
                            <PlusIcon
                              className={`${
                                open ? "rotate-180" : "rotate-0"
                              } transform transition`}
                            />
                          </Disclosure.Button>
                          <Transition
                            show={open}
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Disclosure.Panel className="cursor-pointer flex flex-col w-full pt-[5px]">
                              {tags.length ? (
                                tags.map((tag, i) => (
                                  <div
                                    key={i}
                                    className="p-[12px] w-full flex items-center gap-[8px] group"
                                  >
                                    <TagIcon />
                                    <p className="text-[#808084] text-[12px]">
                                      {tag.name}
                                    </p>
                                    <button
                                      onClick={async () => {
                                        dispatch(
                                          triggerModal({
                                            message: {
                                              title: (
                                                <p className="text-2xl font-bold">
                                                  Delete{" "}
                                                  <span className="text-primary font-extrabold">
                                                    {tag.name}
                                                  </span>
                                                </p>
                                              ),
                                              text: (
                                                <p>
                                                  Are you sure you want to
                                                  delete{" "}
                                                  <span className="text-primary font-semibold">
                                                    {tag.name}
                                                  </span>
                                                </p>
                                              ),
                                              icon: TrashIcon,
                                            },
                                            clickToDisable: true,
                                            confirm: async () => {
                                              const deleted = await deleteTag(
                                                tag.id
                                              );

                                              if (!deleted) {
                                                dispatch(
                                                  triggerNotification({
                                                    type: "error",
                                                    message:
                                                      "Couldn't delete tag",
                                                  })
                                                );
                                                return dispatch(closeModal());
                                              }

                                              dispatch(
                                                updateTags(
                                                  tags.filter(
                                                    (tagItem) =>
                                                      tagItem.id !== tag.id
                                                  )
                                                )
                                              );
                                              dispatch(
                                                triggerNotification({
                                                  type: "success",
                                                  message:
                                                    "Tag deleted successfully",
                                                  icon: TrashIcon,
                                                })
                                              );

                                              dispatch(closeModal());
                                            },
                                          })
                                        );
                                      }}
                                      className="ml-auto !p-0 !w-fit !h-fit hidden group-hover:flex"
                                    >
                                      <TrashIcon />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <p className="text-[#808084] text-[12px]">
                                  No tags available
                                </p>
                              )}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  </div>
                  {/* FOLDERS */}
                  <div className="w-full">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex flex-row items-center w-full justify-between">
                            <H5 className="text-[#AE8779] !font-bold">
                              FOLDERS
                            </H5>
                            <PlusIcon
                              className={`${
                                open ? "rotate-180" : "rotate-0"
                              } transform transition`}
                            />
                          </Disclosure.Button>
                          <Transition
                            show={open}
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Disclosure.Panel className="flex flex-col w-fit cursor-pointer pt-[5px]">
                              {folders.length ? (
                                folders.map((item: any, index: any) => (
                                  <Link
                                    key={index}
                                    href={`/dashboard/folder?folder=${item.id}`}
                                    onClick={() => handleFolderClick(item)}
                                  >
                                    <div className="active:scale-95 transition-all duration-300 p-[12px] flex items-center gap-[8px]">
                                      <FolderOutlineIcon className="w-6 h-6" />
                                      <p className="text-[#808084] text-[12px]">
                                        {item.name}
                                      </p>
                                    </div>
                                  </Link>
                                ))
                              ) : (
                                <p className="text-[#808084] text-[12px]">
                                  No folders available
                                </p>
                              )}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
              </AntiDropdownView>
              {/* verse of the day */}
              <div className="hidden">
                <VerseOfDay />
              </div>
            </div>
          );
        }}
      </Media>
    </>
  );
}

// import Image from "next/image";
// import {
//   AddIcon,
//   HeartsIcon,
//   PlusIcon,
//   SearchIcon,
//   SettingsIcon,
// } from "../svgs";
// import { sideNavigationLinksData } from "@/data/links";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";
// import { H4, H2, H5 } from "@/utils/typography";
// import VerseOfDay from "./verseOfDay";

// export default function DashboardSideNavigation() {
//   const pathname = usePathname();

//   return (
//     <div className="w-[255px] border-r-[1px] border-r-[#F2F2F2] hidden lg:block">
//       <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] px-[12px] py-[14px] flex flex-row items-center gap-[11px]">
//         <div className="h-[44px] w-[44px] rounded-[8px] p-[10px] grid place-items-center bg-[#FEF6F4]">
//           <figure>
//             <HeartsIcon />
//           </figure>
//         </div>
//         <H4 className="font-bold font-aeonikBold -tracking-[0.16px] text-black">
//           <span className="text-[#956E60]">Emerald</span> <span>Diary</span>
//         </H4>
//         <div className="h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#FAFAFA] transition-all duration-300 active:scale-90">
//           <SettingsIcon />
//         </div>
//       </header>
//       <div className="h-[72px] px-[12px] py-[16px] flex items-center gap-[11px] border-b-[1px] border-b-[#F2F2F2]">
//         <figure>
//           <Image
//             src="/images/bimbo-profile.png"
//             width={40}
//             height={40}
//             draggable={false}
//             alt="Bimbo Profile"
//             className="rounded-[8px]"
//           />
//         </figure>
//         <div>
//           <h2 className="text-[12px] font-normal text-black font-aeonik">
//             Bimbo
//           </h2>
//           <p className="text-[#999999] text-[10px]">bimbo@gmail.com</p>
//         </div>
//       </div>
//       {/* quick links */}
//       <div className="relative border-b-[1px] border-b-[#F2F2F2] px-[12px] gap-[12px] py-[8px]">
//         <h1 className="text-[#AE8779] font-black font-aeonikBold -tracking-[0.1px] text-[10px] py-[12px]">
//           QUICK LINKS
//         </h1>
//         <div className="flex flex-col gap-2">
//           {sideNavigationLinksData.map((link, i) => {
//             const isAllNotesActiveRoute = pathname === link.href;

//             const isActiveRoute = pathname.includes(link.href);

//             const linkItem =
//               link.href === "/dashboard" ? (
//                 <Link href={link.href} key={i}>
//                   <button
//                     className={clsx(
//                       "w-full rounded-[8px]  hover:bg-[#956E60]/20 transition-all duration-300  px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]",
//                       isAllNotesActiveRoute &&
//                         "bg-[#FEF2EE] font-extrabold text-[#956E60]"
//                     )}
//                   >
//                     <link.leading
//                       className={
//                         isAllNotesActiveRoute
//                           ? "stroke-[#956E60]"
//                           : "stroke-[#AAAAAD]"
//                       }
//                     />
//                     <p>{link.linkText}</p>
//                   </button>
//                 </Link>
//               ) : (
//                 <Link href={link.href} key={i}>
//                   <button
//                     className={clsx(
//                       "w-full rounded-[8px] hover:bg-[#956E60]/20 transition-all duration-300 px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]",
//                       isActiveRoute &&
//                         "bg-[#FEF2EE] font-extrabold text-[#956E60]"
//                     )}
//                   >
//                     <link.leading
//                       className={
//                         isActiveRoute
//                           ? "stroke-[#956E60] stroke-1"
//                           : "stroke-[#AAAAAD] stroke-1"
//                       }
//                     />
//                     <p>{link.linkText}</p>
//                   </button>
//                 </Link>
//               );

//             return linkItem;
//           })}
//         </div>
//       </div>
//       {/* Tags and folders */}
//       <div className="px-[14px] py-2 flex flex-col items-start gap-2">
//         {/* tags */}
//         <div className="flex flex-row items-center justify-between w-full">
//           <H5 className="text-[#AE8779]">TAGS</H5>
//           <figure>
//             <PlusIcon />
//           </figure>
//         </div>
//         {/* FOLDERS */}
//         <div className="flex flex-row items-center w-full justify-between">
//           <H5 className="text-[#AE8779]">FOLDERS</H5>
//           <figure>
//             <PlusIcon />
//           </figure>
//         </div>
//       </div>
//       {/* verse of the day */}
//       <div className="absolute bottom-[18px]">
//         <VerseOfDay />
//       </div>
//     </div>
//   );
// }
