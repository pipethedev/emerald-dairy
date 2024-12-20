"use client";

import dynamic from "next/dynamic";
import { H1 } from "@/lib/utils/typography";
import { NavButton, NoteItem } from "@/app/components/global";

const Editor = dynamic(() => import("@/app/components/global/Editor/Editor"), {
  ssr: false,
});

export default function CreateNote() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="md:h-[72px] fixed md:hidden w-full bg-body border-b-[1px] border-b-[#F2F2F2] flex px-[24px] gap-[12px] py-2 md:py-[16px] shrink-0 z-50">
        <NavButton />
        <H1 className="text-2xl">Create Note</H1>
      </header>

      <div className="flex-1 flex flex-row">
        <div className="md:w-[360px] flex flex-col shrink-0 border-r-[1px] border-r-[#F2F2F2]">
          <header className="invisible md:visible h-[72px] sticky border-b-[1px] border-b-[#F2F2F2] md:flex px-[24px] gap-[12px] py-[16px] shrink-0">
            <H1 className="text-2xl">Create Note</H1>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="w-[95%] mx-auto py-3 h-full">
              <div className="animate-slide-up">
                <NoteItem
                  title="Note Title"
                  date={Date.now()}
                  subtitle="..."
                  tag={{
                    id: "tagID",
                    name: "@tag",
                    owner: "TagOwner",
                  }}
                  isActive
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Editor />
        </div>
      </div>
    </div>
  );
}
