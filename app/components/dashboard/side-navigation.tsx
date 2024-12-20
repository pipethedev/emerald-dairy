"use client";
import Image from "next/image";
import {
  FolderOutlineIcon,
  HeartsIcon,
  PlusIcon,
  TagIcon,
  TrashIcon,
  User3Icon,
} from "../svgs";
import { sideNavigationLinksData } from "@/app/components/dashboard/links";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { H4, H2, H5 } from "@/lib/utils/typography";
import VerseOfDay from "./verseOfDay";
import { Disclosure, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { toggleNavbar } from "@/store/slices/navbar";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Overlay, SettingsMenu } from "../global";
import Media from "react-media";
import { closeModal, triggerModal } from "@/store/slices/modal";
import { triggerNotification } from "@/store/slices/notification";
import { deleteTag } from "@/controllers/tag";
import { updateTags } from "@/store/slices/tags";
import clsx from "clsx";

export default function DashboardSideNavigation() {
  const [smallScreen, setSmallScreen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const showNav = useAppSelector((state) => state.navbar);
  const tags = useAppSelector((state) => state.tags);
  const folders = useAppSelector((state) => state.folders);

  const hideNav = !showNav;

  const toggleNav = useCallback(
    (state: boolean) => {
      dispatch(toggleNavbar(state));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!smallScreen) {
      toggleNav(true);
      return;
    }

    toggleNav(false);
  }, [pathname, smallScreen, toggleNav]);

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

  const [selectedFolder, setSelectedFolder] = useState("");

  // Function to handle click event
  const handleFolderClick = (folder: any) => {
    localStorage.setItem("selectedFolder", folder);
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

  console.log("PHOTO: ", auth.user?.photo);

  // NOTE
  // useEffect(() => {
  //   if (!auth.user || !auth.isAuthenticated) {
  //     console.log(
  //       "<=============UNAUTHENTICATED============>",
  //       auth.user,
  //       auth.isAuthenticated
  //     );
  //     router.replace("/signin");
  //   }
  // }, [auth.user, auth.isAuthenticated]);

  return (
    <>
      {smallScreen && <NavOverlay />}
      <Media queries={{ small: { maxWidth: 768 } }}>
        {(matches) => {
          // console.log({ smallScreen, matchesSmall: matches.small });
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
                <figure className="rounded-[8px] w-10 bg-primary/10  aspect-square overflow-clip">
                  {auth.user?.photo ? (
                    <Image
                      src={auth.user?.photo}
                      width={760}
                      height={760}
                      draggable={false}
                      alt={`${auth.user?.displayName} profile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User3Icon className="w-full h-full !stroke-primary p-2" />
                  )}
                </figure>
                <div>
                  <h2 className="text-[12px] font-normal text-black font-aeonik">
                    {auth.user?.displayName || "username..."}
                  </h2>
                  <p className="text-[#999999] text-[10px]">
                    {auth.user?.email || "email..."}
                  </p>
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
