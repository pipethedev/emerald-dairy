"use client";
// NOTE convert back to server
import {
  CreateNoteLink,
  IconButton,
  NavButton,
  Notes,
  SearchBar,
  ToggleNotesBarBtn,
} from "@/app/components/global";
import { Greeting } from "@/app/components/global/greet";
import {
  EditIcon,
  ExpandMoreIcon,
  HeartsOutlineIcon,
  LeftAlignIcon,
  MoreHorisIcon,
  NoteIcon,
  SearchIcon,
  SettingsIcon,
  TagIcon,
} from "@/app/components/svgs";
import { notesPreviewData } from "@/data/notes";
import { useAppDispatch } from "@/hooks/store";
import { triggerModal } from "@/store/slices/modal";
import Image from "next/image";
import Link from "next/link";
import { FolderInput } from "../components/global/NoteItem/NoteOptions/AddFolder";
import ProfileEditView from "../components/global/SettingsMenu/Profile";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="hidden h-full lg:flex flex-row">
        <div className="w-[360px] flex flex-col overflow-auto shrink-0 border-r-[1px] border-r-[#F2F2F2]">
          <header className="relative h-[72px] shrink-0 border-b-[1px] border-b-[#F2F2F2] flex px-[24px] gap-[12px] py-[16px]">
            {/* <SearchIcon />
              <input
                className="outline-none placeholder-[#B3B3B3] text-[14px] bg-transparent"
                placeholder="Search..."
              /> */}
            <SearchBar />
            <CreateNoteLink />
          </header>
          {/* ALL NOTES - SHOULD BE MOVED TO A SEPARATE COMPONENTS SOON */}
          <Notes type="all" path="/dashboard/all-notes/" />
        </div>
        <div className="flex flex-col overflow-auto">
          <header className="h-[72px] shrink-0 border-b-[1px] border-b-[#F2F2F2]"></header>
          <div className="p-[56px] flex-1 overflow-auto">
            <div className="flex items-center gap-[13px] mb-[53px]">
              <figure className="bg-[#F2F2F2] h-[80px] w-[80px] rounded-full grid place-items-center">
                <Image
                  src="/images/sun.png"
                  draggable={false}
                  alt="Sun"
                  width={55}
                  height={55}
                />
              </figure>
              <h1 className="text-[44px] font-bold">
                <Greeting />
              </h1>
            </div>

            {/* CREATE NOTE WELCOME PAGE */}
            <div className="bg-[#FFFBF9] py-[100px] overflow-y-hidden mx-auto rounded-[24px] flex flex-col items-center justify-center">
              <div className="flex flex-col gap-[48px] mx-auto">
                <NoteIcon className="mx-auto" />
                <h4 className="leading-[34.8px] text-center max-w-[349px] tracking-[-2%] text-[24px] font-normal">
                  Select a note from the notes tab to preview note
                </h4>
              </div>
              <div
                tabIndex={0}
                onClick={() => {
                  dispatch(
                    triggerModal({
                      children: <FolderInput />,
                      show: true,
                    })
                  );
                }}
                className="px-[24px] mt-8 py-[34px] cursor-pointer active:scale-95 transition-all duration-200 bg-[#FAFAFA] rounded-[20px] w-full flex gap-[22px]"
              >
                <figure>
                  <Image
                    alt="Folder Icon"
                    src="/icons/folder-icon.svg"
                    width={90}
                    height={90}
                  />
                </figure>
                <div>
                  <h1 className="text-[20px] font-bold mb-[5px]">
                    Create a Folder
                  </h1>
                  <p className="text-[#808080]">
                    You have no saved notes in your account.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  dispatch(
                    triggerModal({
                      children: <ProfileEditView />,
                      show: true,
                    })
                  );
                }}
                className="px-[24px] py-[34px] cursor-pointer active:scale-95 transition-all duration-200 bg-[#FAFAFA] rounded-[20px] w-full flex gap-[22px]"
              >
                <figure>
                  <Image
                    alt="Camera Icon"
                    src="/icons/camera-icon.svg"
                    width={90}
                    height={90}
                  />
                </figure>
                <div>
                  <h1 className="text-[20px] font-bold mb-[5px]">
                    Add a Profile Picture
                  </h1>
                  <p className="text-[#808080]">
                    You have no saved notes in your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <DashboardMobile />
    </>
  );
}

const DashboardMobile = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="lg:hidden">
      <header className="h-[72px] border-b-[1px] w-full border-b-[#F2F2F2] px-[12px] py-[14px] flex flex-row items-center gap-[11px]">
        <NavButton />
        <div className="h-[40px] px-[16px] rounded-[10px] gap-[8px] flex-1 w-full bg-[#FAFAFA] flex items-center">
          <SearchBar />
        </div>
        <CreateNoteLink />
      </header>
      <div>
        <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2]"></header>
        <div className="p-[24px]">
          <div className="flex items-center gap-[13px] mb-[24px]">
            <figure className="bg-[#F2F2F2] h-[50px] w-[50px] rounded-full grid place-items-center">
              <Image
                src="/images/sun.png"
                draggable={false}
                alt="Sun"
                width={35}
                height={35}
              />
            </figure>
            <h1 className="text-[24px] font-bold">
              <Greeting />
            </h1>
            <div className="w-fit ml-auto">
              <ToggleNotesBarBtn />
            </div>
          </div>
          <div className="flex flex-col gap-[24px] flex-wrap">
            <Link href={"/dashboard/create"}>
              <div className="px-[24px] py-[34px] bg-[#FEF6F4] rounded-[20px] w-full flex gap-[22px]">
                <figure>
                  <Image
                    alt="Docs Icon"
                    src="/icons/docs-icon.svg"
                    width={72}
                    height={72}
                  />
                </figure>
                <div>
                  <h1 className="text-[#AE8779] text-[20px] font-bold mb-[5px]">
                    Create your First note
                  </h1>
                  <p>You have no saved notes in your account.</p>
                </div>
              </div>
            </Link>
            <div
              tabIndex={0}
              onClick={() => {
                dispatch(
                  triggerModal({
                    children: <FolderInput />,
                    show: true,
                  })
                );
              }}
              className="px-[24px] py-[34px] cursor-pointer active:scale-95 transition-all duration-200 bg-[#FAFAFA] rounded-[20px] w-full flex gap-[22px]"
            >
              <figure>
                <Image
                  alt="Folder Icon"
                  src="/icons/folder-icon.svg"
                  width={90}
                  height={90}
                />
              </figure>
              <div>
                <h1 className="text-[20px] font-bold mb-[5px]">
                  Create a Folder
                </h1>
                <p className="text-[#808080]">
                  You have no saved notes in your account.
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                dispatch(
                  triggerModal({
                    children: <ProfileEditView />,
                    show: true,
                  })
                );
              }}
              className="px-[24px] py-[34px] cursor-pointer active:scale-95 transition-all duration-200 bg-[#FAFAFA] rounded-[20px] w-full flex gap-[22px]"
            >
              <figure>
                <Image
                  alt="Camera Icon"
                  src="/icons/camera-icon.svg"
                  width={90}
                  height={90}
                />
              </figure>
              <div>
                <h1 className="text-[20px] font-bold mb-[5px]">
                  Add a Profile Picture
                </h1>
                <p className="text-[#808080]">
                  You have no saved notes in your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
