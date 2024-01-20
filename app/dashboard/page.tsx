import { SearchBar } from "../components/global";
import {
  AddIcon,
  EditIcon,
  ExpandMoreIcon,
  HeartsOutlineIcon,
  LeftAlignIcon,
  MobileHearts,
  MoreHorisIcon,
  SearchIcon,
  SettingsIcon,
  TagIcon,
} from "@/app/components/svgs";
import { notesPreviewData } from "@/data/notes";
import Image from "next/image";

export default function Dashboard() {
  return (
    <>
      <div className="hidden lg:flex flex-row">
        <div className="w-[360px] shrink-0 border-r-[1px] border-r-[#F2F2F2]">
          <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] flex px-[24px] gap-[12px] py-[16px]">
            <div className="h-[40px] px-[16px] rounded-[10px] gap-[8px] flex-1 w-full bg-[#FAFAFA] flex items-center">
              <SearchIcon />
              <input
                className="outline-none placeholder-[#B3B3B3] text-[14px] bg-transparent"
                placeholder="Search..."
              />
            </div>
            <div className="h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#956E60]">
              <AddIcon className="!stroke-white" />
            </div>
          </header>
          {/* ALL NOTES - SHOULD BE MOVED TO A SEPARATE COMPONENTS SOON */}
          <Notes />
        </div>
        <div>
          <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2]"></header>
          <div className="p-[56px]">
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
              <h1 className="text-[44px] font-bold">Morning Bimbo</h1>
            </div>
            <div className="flex gap-[24px] flex-wrap">
              <div className="p-[24px] bg-[#FEF6F4] rounded-[20px] w-full max-w-[308px]">
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
              <div className="p-[24px] bg-[#FAFAFA] rounded-[20px] w-full max-w-[308px]">
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
              <div className="p-[24px] bg-[#FAFAFA] rounded-[20px] w-full max-w-[308px]">
                <figure className="mb-[32px]">
                  <Image
                    alt="Camera Icon"
                    src="/icons/camera-icon.svg"
                    width={90}
                    height={90}
                  />
                </figure>
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
      {/* Mobile */}
      <DashboardMobile />
    </>
  );
}

const DashboardMobile = () => {
  return (
    <div className="lg:hidden">
      <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] px-[12px] py-[14px] flex flex-row items-center gap-[11px]">
        <div className="h-[44px] w-[44px] rounded-[8px] p-[10px] grid place-items-center bg-[#FEF6F4]">
          <figure>
            <LeftAlignIcon />
          </figure>
        </div>
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
            <h1 className="text-[24px] font-bold">Morning Bimbo</h1>
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

const Notes = () => {
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
                {note.favorite && (
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
