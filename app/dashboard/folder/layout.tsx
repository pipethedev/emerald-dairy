"use client";
import { useEffect, useState } from "react";

import {
  CreateNoteLink,
  Header,
  NavButton,
  Notes,
  SearchBar,
} from "@/app/components/global";

const AllNoteLayout = ({ children }: { children: React.ReactNode }) => {
  // State to store the folder value
  const [folder, setFolder] = useState<string | null>(null);

  // useEffect to retrieve folder value from localStorage when component mounts
  useEffect(() => {
    const savedFolder = localStorage.getItem("selectedFolder");
    if (savedFolder) {
      setFolder(savedFolder);
      console.log(savedFolder);
    }
  }, []);

  console.log(folder);

  return (
    <div className="flex flex-col md:flex-row h-[100vh]">
      <div className="md:w-[360px] h-fit md:h-full flex flex-col border-r-[1px] border-r-[#F2F2F2] overflow-auto">
        <Header>
          <NavButton />
          <SearchBar />
          <CreateNoteLink />
        </Header>
        {folder && <Notes folder={folder} path="/dashboard/all-notes/" />}
      </div>
      <main className="flex-1 w-full h-[100vh] overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AllNoteLayout;
