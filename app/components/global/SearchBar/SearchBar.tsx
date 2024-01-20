import React from "react";
import { AddIcon, SearchIcon } from "../../svgs";

export default function SearchBar() {
  return (
    <div className="h-[40px] px-[16px] rounded-[10px] gap-[8px] flex-1 w-full bg-[#FAFAFA] flex items-center">
      <SearchIcon />
      <input
        className="outline-none placeholder-[#B3B3B3] text-[14px] bg-transparent"
        placeholder="Search..."
      />
    </div>
  );
}
