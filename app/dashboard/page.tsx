import {
  CreateNoteLink,
  IconButton,
  NavButton,
  Notes,
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
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <div className="hidden h-full lg:flex flex-row">
        <div className="w-[360px] flex flex-col overflow-auto shrink-0 border-r-[1px] border-r-[#F2F2F2]">
          <header className="h-[72px] shrink-0 border-b-[1px] border-b-[#F2F2F2] flex px-[24px] gap-[12px] py-[16px]">
            <div className="h-[40px] px-[16px] rounded-[10px] gap-[8px] flex-1 w-full bg-[#FAFAFA] flex items-center">
              <SearchIcon />
              <input
                className="outline-none placeholder-[#B3B3B3] text-[14px] bg-transparent"
                placeholder="Search..."
              />
            </div>
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
  return (
    <div className="lg:hidden">
      <header className="h-[72px] border-b-[1px] w-full border-b-[#F2F2F2] px-[12px] py-[14px] flex flex-row items-center gap-[11px]">
        <NavButton />
        <div className="h-[40px] px-[16px] rounded-[10px] gap-[8px] flex-1 w-full bg-[#FAFAFA] flex items-center">
          <SearchIcon />
          <input
            className="outline-none placeholder-[#B3B3B3] text-[14px] bg-transparent"
            placeholder="Search..."
          />
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
            <div className="px-[24px] py-[34px] bg-[#FAFAFA] rounded-[20px] w-full flex gap-[22px]">
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
            <div className="px-[24px] py-[34px] bg-[#FAFAFA] rounded-[20px] w-full flex gap-[22px]">
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

const Notes_ = () => {
  return (
    <div className="py-[32px] px-[24px]">
      <header className="flex items-center gap-[5px] mb-[24px]">
        <h1 className="text-[24px] font-bold">All Notes</h1>
        <ExpandMoreIcon />
      </header>
      {notesPreviewData.length > 0 ? (
        <div className="flex flex-col gap-[24px]">
          {notesPreviewData.map((note, i) => (
            <div
              key={i}
              className="bg-[#FAFAFA] w-full p-[16px] rounded-[12px]"
            >
              <header className="flex gap-[8px] mb-[16px]">
                <div className="flex-1">
                  <h1 className="font-medium mb-[8px]">{note.title}</h1>
                  <p className="text-[#999] text-[12px]">{note.subtitle}</p>
                </div>
                <div className="h-[28px] w-[28px] rounded-[8px] bg-[#F2F2F2] grid place-items-center">
                  <MoreHorisIcon />
                </div>
              </header>
              <div className="flex gap-[8px]">
                <div className="h-[28px] px-[8px] rounded-[8px] bg-[#F2F2F2] flex gap-[8px] items-center">
                  <EditIcon />
                  <p className="text-[#808080] text-[10px] font-medium">
                    {note.date}
                  </p>
                </div>
                {note.favourite && (
                  <div className="h-[28px] px-[8px] rounded-[8px] bg-[#F2F2F2] grid place-items-center">
                    <HeartsOutlineIcon />
                  </div>
                )}
                <div className="h-[28px] px-[8px] rounded-[8px] bg-[#F2F2F2] flex gap-[8px] items-center">
                  <TagIcon />
                  <p className="text-[#808080] text-[10px] font-medium">
                    {note.tag}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[463px] bg-[#FAFAFA] w-full px-[24px] rounded-[14px] justify-center pt-[51px]">
          <figure className="flex flex-col items-center">
            <Image
              src="/icons/docs-icon2x.svg"
              alt="Docs icon 2x"
              width={180}
              height={180}
            />
            <figcaption className="text-[20px] pt-5 text-center">
              You have no saved notes in your account.
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};
