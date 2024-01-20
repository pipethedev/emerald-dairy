"use client";
import Image from "next/image";
import {
  AddIcon,
  HeartsIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
} from "../svgs";
import { sideNavigationLinksData } from "@/app/components/dashboard/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { H4, H2, H5 } from "@/utils/typography";
import VerseOfDay from "./verseOfDay";

export default function DashboardSideNavigation() {
  const pathname = usePathname();

  return (
    <div className="w-[255px] border-r-[1px] border-r-[#F2F2F2] hidden lg:block">
      <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] px-[12px] py-[14px] flex flex-row items-center gap-[11px]">
        <div className="h-[44px] w-[44px] rounded-[8px] p-[10px] grid place-items-center bg-[#FEF6F4]">
          <figure>
            <HeartsIcon className="stroke-primary" />
          </figure>
        </div>
        <H4 className="font-bold font-aeonikBold -tracking-[0.16px] text-black">
          <span className="text-[#956E60]">Emerald</span> <span>Diary</span>
        </H4>
        <div className="h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#FAFAFA] transition-all duration-300 active:scale-90">
          <SettingsIcon />
        </div>
      </header>
      <div className="h-[72px] px-[12px] py-[16px] flex items-center gap-[11px] border-b-[1px] border-b-[#F2F2F2]">
        <figure>
          <Image
            src="/images/bimbo-profile.png"
            width={40}
            height={40}
            draggable={false}
            alt="Bimbo Profile"
            className="rounded-[8px]"
          />
        </figure>
        <div>
          <h2 className="text-[12px] font-normal text-black font-aeonik">
            Bimbo
          </h2>
          <p className="text-[#999999] text-[10px]">bimbo@gmail.com</p>
        </div>
      </div>
      {/* quick links */}
      <div className="relative border-b-[1px] border-b-[#F2F2F2] px-[12px] gap-[12px] py-[8px]">
        <h1 className="text-[#AE8779] font-black font-aeonikBold -tracking-[0.1px] text-[10px] py-[12px]">
          QUICK LINKS
        </h1>
        <div className="flex flex-col gap-2">
          {sideNavigationLinksData.map((link, i) => {
            const isAllNotesActiveRoute = pathname === link.href;

            const isActiveRoute = pathname.includes(link.href);

            const linkItem =
              link.href === "/dashboard" ? (
                <Link href={link.href} key={i}>
                  <button
                    className={clsx(
                      "w-full rounded-[8px]  hover:bg-[#956E60]/20 transition-all duration-300  px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]",
                      isAllNotesActiveRoute &&
                        "bg-[#FEF2EE] font-extrabold text-[#956E60]"
                    )}
                  >
                    <link.leading
                      className={
                        isAllNotesActiveRoute
                          ? "!stroke-[#956E60]"
                          : "!stroke-[#AAAAAD]"
                      }
                    />
                    <p>{link.linkText}</p>
                  </button>
                </Link>
              ) : (
                <Link href={link.href} key={i}>
                  <button
                    className={clsx(
                      "w-full rounded-[8px] hover:bg-[#956E60]/20 transition-all duration-300 px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]",
                      isActiveRoute &&
                        "bg-[#FEF2EE] font-extrabold text-[#956E60]"
                    )}
                  >
                    <link.leading
                      className={
                        isActiveRoute
                          ? "!stroke-[#956E60] stroke-1"
                          : "!stroke-[#AAAAAD] stroke-1"
                      }
                    />
                    <p>{link.linkText}</p>
                  </button>
                </Link>
              );

            return linkItem;
          })}
        </div>
      </div>
      {/* Tags and folders */}
      <div className="px-[14px] py-2 flex flex-col items-start gap-2">
        {/* tags */}
        <div className="flex flex-row items-center justify-between w-full">
          <H5 className="text-[#AE8779]">TAGS</H5>
          <figure>
            <PlusIcon />
          </figure>
        </div>
        {/* FOLDERS */}
        <div className="flex flex-row items-center w-full justify-between">
          <H5 className="text-[#AE8779]">FOLDERS</H5>
          <figure>
            <PlusIcon />
          </figure>
        </div>
      </div>
      {/* verse of the day */}
      <div className="absolute bottom-[18px]">
        <VerseOfDay />
      </div>
    </div>
  );
}

// import Image from "next/image";
// import {
//   AddIcon,
//   HeartsIcon,
//   PlusIcon,
//   SearchIcon,
//   SettingsIcon,
// } from "../svgs";
// import { sideNavigationLinksData } from "@/data/links";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";
// import { H4, H2, H5 } from "@/utils/typography";
// import VerseOfDay from "./verseOfDay";

// export default function DashboardSideNavigation() {
//   const pathname = usePathname();

//   return (
//     <div className="w-[255px] border-r-[1px] border-r-[#F2F2F2] hidden lg:block">
//       <header className="h-[72px] border-b-[1px] border-b-[#F2F2F2] px-[12px] py-[14px] flex flex-row items-center gap-[11px]">
//         <div className="h-[44px] w-[44px] rounded-[8px] p-[10px] grid place-items-center bg-[#FEF6F4]">
//           <figure>
//             <HeartsIcon />
//           </figure>
//         </div>
//         <H4 className="font-bold font-aeonikBold -tracking-[0.16px] text-black">
//           <span className="text-[#956E60]">Emerald</span> <span>Diary</span>
//         </H4>
//         <div className="h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#FAFAFA] transition-all duration-300 active:scale-90">
//           <SettingsIcon />
//         </div>
//       </header>
//       <div className="h-[72px] px-[12px] py-[16px] flex items-center gap-[11px] border-b-[1px] border-b-[#F2F2F2]">
//         <figure>
//           <Image
//             src="/images/bimbo-profile.png"
//             width={40}
//             height={40}
//             draggable={false}
//             alt="Bimbo Profile"
//             className="rounded-[8px]"
//           />
//         </figure>
//         <div>
//           <h2 className="text-[12px] font-normal text-black font-aeonik">
//             Bimbo
//           </h2>
//           <p className="text-[#999999] text-[10px]">bimbo@gmail.com</p>
//         </div>
//       </div>
//       {/* quick links */}
//       <div className="relative border-b-[1px] border-b-[#F2F2F2] px-[12px] gap-[12px] py-[8px]">
//         <h1 className="text-[#AE8779] font-black font-aeonikBold -tracking-[0.1px] text-[10px] py-[12px]">
//           QUICK LINKS
//         </h1>
//         <div className="flex flex-col gap-2">
//           {sideNavigationLinksData.map((link, i) => {
//             const isAllNotesActiveRoute = pathname === link.href;

//             const isActiveRoute = pathname.includes(link.href);

//             const linkItem =
//               link.href === "/dashboard" ? (
//                 <Link href={link.href} key={i}>
//                   <button
//                     className={clsx(
//                       "w-full rounded-[8px]  hover:bg-[#956E60]/20 transition-all duration-300  px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]",
//                       isAllNotesActiveRoute &&
//                         "bg-[#FEF2EE] font-extrabold text-[#956E60]"
//                     )}
//                   >
//                     <link.leading
//                       className={
//                         isAllNotesActiveRoute
//                           ? "stroke-[#956E60]"
//                           : "stroke-[#AAAAAD]"
//                       }
//                     />
//                     <p>{link.linkText}</p>
//                   </button>
//                 </Link>
//               ) : (
//                 <Link href={link.href} key={i}>
//                   <button
//                     className={clsx(
//                       "w-full rounded-[8px] hover:bg-[#956E60]/20 transition-all duration-300 px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]",
//                       isActiveRoute &&
//                         "bg-[#FEF2EE] font-extrabold text-[#956E60]"
//                     )}
//                   >
//                     <link.leading
//                       className={
//                         isActiveRoute
//                           ? "stroke-[#956E60] stroke-1"
//                           : "stroke-[#AAAAAD] stroke-1"
//                       }
//                     />
//                     <p>{link.linkText}</p>
//                   </button>
//                 </Link>
//               );

//             return linkItem;
//           })}
//         </div>
//       </div>
//       {/* Tags and folders */}
//       <div className="px-[14px] py-2 flex flex-col items-start gap-2">
//         {/* tags */}
//         <div className="flex flex-row items-center justify-between w-full">
//           <H5 className="text-[#AE8779]">TAGS</H5>
//           <figure>
//             <PlusIcon />
//           </figure>
//         </div>
//         {/* FOLDERS */}
//         <div className="flex flex-row items-center w-full justify-between">
//           <H5 className="text-[#AE8779]">FOLDERS</H5>
//           <figure>
//             <PlusIcon />
//           </figure>
//         </div>
//       </div>
//       {/* verse of the day */}
//       <div className="absolute bottom-[18px]">
//         <VerseOfDay />
//       </div>
//     </div>
//   );
// }
