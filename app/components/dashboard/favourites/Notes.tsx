import Image from "next/image";
import { NoteItem, SearchBar } from "../../global";
import { AddIcon, ExpandMoreIcon } from "../../svgs";

const DUMMY_NOTES = Array(10)
  .fill(0)
  .map((_, i) => ({ id: i.toString() }));

export default function Notes() {
  return (
    <div className="w-[360px] h-full flex flex-col border-r-[1px] border-r-[#F2F2F2]">
      <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] flex px-[24px] gap-[12px] py-[16px]">
        <SearchBar />
        <div className="h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#956E60]">
          <AddIcon />
        </div>
      </header>
      {/* ALL NOTES - SHOULD BE MOVED TO A SEPARATE COMPONENTS SOON */}
      <div className="py-[32px] flex flex-col overflow-auto flex-1 px-[24px]">
        <header className="flex items-center gap-[5px] mb-[24px]">
          <h1 className="text-[24px] font-bold">All Notes</h1>
          <ExpandMoreIcon />
        </header>
        {/* <div className="flex-1 bg-[#FAFAFA] w-full bg-red-400 px-[24px] rounded-[14px] justify-center pt-[51px] overflow-auto"> */}
        {DUMMY_NOTES.map((note) => (
          <NoteItem key={note.id} />
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}
