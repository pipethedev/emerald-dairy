import Note from "@/app/components/dashboard/note";
import { Editor, NoteItem } from "@/app/components/global";
import { AddIcon, CheckCircleIcon, SearchIcon } from "@/app/components/svgs";
import { H1 } from "@/utils/typography";
import Image from "next/image";
import Link from "next/link";

export default function CreateNote() {
  return (
    <>
      <header className="h-[72px] fixed md:hidden w-full bg-body border-b-[1px] border-b-[#F2F2F2] flex px-[24px] gap-[12px] py-[16px] shrink-0">
        {/* <div className="h-[40px] px-[16px] rounded-[10px] gap-[8px] flex-1 w-full bg-[#FAFAFA] flex items-center">
              <SearchIcon />
              <input
                className="outline-none placeholder-[#B3B3B3] text-[14px] bg-transparent"
                placeholder="Search..."
              />
            </div>
            <Link href={"/dashboard/create-note"}>
              <div className="h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#956E60]">
                <AddIcon className="!stroke-white" />
              </div>
            </Link> */}
        <H1 className="text-2xl">Create Note</H1>
      </header>
      <div className="hidden_ lg:flex h-full flex-row">
        <div className="md:w-[360px] flex flex-col shrink-0 border-r-[1px] border-r-[#F2F2F2]">
          <header className="invisible md:visible h-[72px] sticky border-b-[1px] border-b-[#F2F2F2] md:flex px-[24px] gap-[12px] py-[16px] shrink-0">
            {/* <div className="h-[40px] px-[16px] rounded-[10px] gap-[8px] flex-1 w-full bg-[#FAFAFA] flex items-center">
              <SearchIcon />
              <input
                className="outline-none placeholder-[#B3B3B3] text-[14px] bg-transparent"
                placeholder="Search..."
              />
            </div>
            <Link href={"/dashboard/create-note"}>
              <div className="h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#956E60]">
                <AddIcon className="!stroke-white" />
              </div>
            </Link> */}
            <H1 className="text-2xl">Create Note</H1>
          </header>
          {/* ALL NOTES - SHOULD BE MOVED TO A SEPARATE COMPONENTS SOON */}
          {/* <Notes /> */}
          <div className="flex-1  overflow-auto">
            {/* <>new Note item</> */}
            <div className="w-[95%] mx-auto py-3 h-full">
              <div className="animate-slide-up">
                <NoteItem
                  title="Note Title"
                  date={Date.now()}
                  subtitle="..."
                  tag="@tag"
                  isActive
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col">
          <header className="h-[72px] w-full border-b-[1px] border-b-[#F2F2F2] shrink-0">
            <div className="w-[95%] h-full flex items-center justify-center mx-auto">
              <button className="flex items-center p-2 ml-auto bg-[#F2F2F2] rounded-lg gap-2">
                <figure>
                  <CheckCircleIcon className="!stroke-gray-800" />
                </figure>
                <p className="capitalize">save note</p>
              </button>
            </div>
          </header>

          <Editor />
        </div>
      </div>
      {/* Mobile */}
      {/* <DashboardMobile /> */}
    </>
  );
}
