import DashboardSideNavigation from "@/app/components/dashboard/side-navigation";
import { CreateNoteLink, Notes, SearchBar } from "@/app/components/global";
import { AddIcon } from "@/app/components/svgs";
import { Metadata } from "next";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100vh]">
      <div className="w-[360px] h-full flex flex-col border-r-[1px] border-r-[#F2F2F2]">
        <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] flex px-[24px] gap-[12px] py-[16px]">
          <SearchBar />
          <CreateNoteLink />
        </header>
        <Notes />
      </div>
      <main className="flex-1 w-full h-[100vh] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
