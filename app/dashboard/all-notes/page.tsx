"use client"
import {
  CreateNoteLink,
  NavButton,
  Notes,
  ToggleNotesBarBtn,
} from "@/app/components/global";
import { Greet } from "@/app/components/global/greet";
import {
  EditIcon,
  ExpandMoreIcon,
  HeartsOutlineIcon,
  LeftAlignIcon,
  MoreHorisIcon,
  SearchIcon,
  SettingsIcon,
  TagIcon,
} from "@/app/components/svgs";
import { notesPreviewData } from "@/data/notes";
import Image from "next/image";
import Link from "next/link";
import { ModalContext } from "@/context";
import { useContext, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import clsx from "clsx";

export default function DashboardCreate() {
  const [folder, setNewFolder] = useState("");

  const createFolder = async (e: any) => {
    e.preventDefault();
    try {
      // Add the Folder to the Firestore database
      const docRef = await addDoc(collection(db, "folders"), {
        folder: folder,
        timestamp: Timestamp.fromDate(new Date()),
      });

      alert("created folder");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const [folderClose, setFolderClose] = useState(true);
  // Function to handle modal opening
  const handleModalOpen = () => {
    setFolderClose(false);
    console.log("gregre");
  };

  // Function to handle modal closing
  const handleModalClose = () => {
    setFolderClose(true);
  };

  return (
    <>
      <div className="hidden h-full lg:flex flex-row">
        <div className="flex flex-col overflow-auto">
          <header className="h-[72px] shrink-0 border-b-[1px] border-b-[#F2F2F2]"></header>
          {folderClose ? (
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
                  <Greet name="Bimbo" />
                </h1>
                <div className="w-fit ml-auto">
                  <ToggleNotesBarBtn />
                </div>
              </div>
              <div className="flex gap-[24px] flex-wrap">
                {/* CREATE-NOTES */}
                <Link href={`/dashboard/all-notes/create`}>
                  <div className="p-[24px] bg-[#FEF6F4] transition-all duration-200 active:scale-[0.98] rounded-[20px] w-full max-w-[308px]">
                    <figure className="mb-[50px]">
                      <Image
                        alt="Docs Icon"
                        src="/icons/docs-icon.svg"
                        width={72}
                        height={72}
                      />
                    </figure>
                    <h1 className="text-[#AE8779] text-[20px] font-bold mb-[5px]">
                      Create your First note
                    </h1>
                    <p>You have no saved notes in your account.</p>
                  </div>
                </Link>
                {/* FOLDER */}
                <div
                  className="cursor-pointer animation-all transition-all hover:bg-[#FEF6F4] p-[24px] bg-[#FAFAFA] rounded-[20px] w-full max-w-[308px]"
                  onClick={handleModalOpen}
                >
                  <figure className="mb-[32px]">
                    <Image
                      alt="Folder Icon"
                      src="/icons/folder-icon.svg"
                      width={90}
                      height={90}
                    />
                  </figure>

                  <h1 className="text-[20px] font-bold mb-[5px]">
                    Create a Folder
                  </h1>
                  <p className="text-[#808080]">
                    You have no saved notes in your account.
                  </p>
                </div>
                {/* ADD PROFILE PID */}
                <div className="cursor-pointer animation-all transition-all hover:bg-[#FEF6F4] p-[24px] bg-[#FAFAFA] rounded-[20px] w-full max-w-[308px]">
                  <figure className="mb-[32px]">
                    <Image
                      alt="Camera Icon"
                      src="/icons/camera-icon.svg"
                      width={90}
                      height={90}
                    />
                  </figure>
                  {/*  */}
                  <h1 className="text-[20px] font-bold mb-[5px]">
                    Add a Profile Picture
                  </h1>
                  <p className="text-[#808080]">
                    You have no saved notes in your account.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <form onSubmit={createFolder}>
                <label htmlFor="folder">Name of Folder:</label>
                <input
                  type="text"
                  id="folder"
                  value={folder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  required
                />
                <button type="submit">Create Folder</button>
              </form>
            </div>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div className="lg:hidden">
        <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] px-[12px] py-[14px] flex flex-row items-center gap-[11px]">
          <NavButton />
          <div className="h-[40px] px-[16px] rounded-[10px] gap-[8px] flex-1 w-full bg-[#FAFAFA] flex items-center">
            <SearchIcon />
            <input
              className="outline-none placeholder-[#B3B3B3] text-[14px] bg-transparent"
              placeholder="Search..."
            />
          </div>
          <div className="h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#FAFAFA] transition-all duration-300 active:scale-90">
            <SettingsIcon />
          </div>
        </header>
        <div>
          <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2]"></header>
          {folderClose ? (
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
                  <Greet name="Bimbo" />
                </h1>
              </div>
              <div className="flex flex-col gap-[24px] flex-wrap">
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
                <div
                  className="px-[24px] py-[34px] bg-[#FAFAFA] rounded-[20px] w-full flex gap-[22px]"
                  onClick={handleModalOpen}
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
          ) : (
            <div>
              <form onSubmit={createFolder}>
                <label htmlFor="folder">Name of Folder:</label>
                <input
                  type="text"
                  id="folder"
                  value={folder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  required
                />
                / <button type="submit">Create Folder</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
