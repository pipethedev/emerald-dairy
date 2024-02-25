import {
  CreateNoteLink,
  NavButton,
  Notes,
  SearchBar,
} from "@/app/components/global";

export default function RecentlyDeleted() {
  return (
    <div className="flex flex-col md:flex-row h-[100vh]">
      <div className="md:w-[360px] h-fit md:h-full flex flex-col border-r-[1px] border-r-[#F2F2F2] overflow-auto">
        <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] flex shrink-0 px-2 gap-1 items-center justify-between py-[16px]">
          <NavButton />
          <SearchBar />
          <CreateNoteLink />
        </header>
        <Notes type="deleted" path="/dashboard/archived/" />
      </div>
      <main className="flex-1 w-full h-[100vh] overflow-y-auto"></main>
    </div>
  );
}
