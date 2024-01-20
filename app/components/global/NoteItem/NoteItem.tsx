import { H2 } from "@/utils/typography";
import Button from "../../button";
import {
  EditIcon,
  HeartsOutlineIcon,
  HorizontalDots,
  MoreHorisIcon,
  TagIcon,
} from "../../svgs";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface Note {
  title: string;
  subtitle: string;
  date: number;
  label?: any;
  favourite?: boolean;
  className?: string;
  tag: string;
  isActive?: boolean;
  hoverEffect?: boolean;
}

export default function NoteItem(props: Note) {
  return (
    <div
      className={clsx(
        "bg-[#FAFAFA]_ w-full p-[16px] rounded-[12px]",
        props.isActive &&
          "bg-primary-14 outline outline-primary-3 outline-[1px] transition-all duration-300",
        props.hoverEffect && "hover:bg-primary-14"
      )}
    >
      <header className="flex gap-[8px] mb-[16px]">
        <div className="flex-1">
          <h1
            className={clsx(
              "font-bold mb-[8px] text-sm leading-normal",
              props.isActive && "text-primary"
            )}
          >
            {props.title}
          </h1>
          <p
            className={clsx(
              "text-[#999] text-[12px]",
              props.isActive && "text-primary"
            )}
          >
            {props.subtitle}
          </p>
        </div>
        <div
          className={clsx(
            "h-[28px] w-[28px] rounded-[8px] bg-[#F2F2F2] grid place-items-center",
            props.isActive && "bg-primary-10"
          )}
        >
          <MoreHorisIcon
            className={clsx(props.isActive && "!stroke-primary")}
          />
        </div>
      </header>
      <div className="flex gap-[8px]">
        <div
          className={clsx(
            "h-[28px] px-[8px] rounded-[8px] bg-[#F2F2F2] flex gap-[8px] items-center",
            props.isActive && "bg-primary-10"
          )}
        >
          <EditIcon className={clsx(props.isActive && "!stroke-primary")} />
          <p
            className={clsx(
              "text-[#808080] text-[10px] font-medium",
              props.isActive && "text-primary"
            )}
          >
            {props.date}
          </p>
        </div>
        {props.favourite && (
          <div
            className={clsx(
              "h-[28px] px-[8px] rounded-[8px] bg-[#F2F2F2] grid place-items-center",
              props.isActive && "bg-primary-10"
            )}
          >
            <HeartsOutlineIcon
              className={clsx(props.isActive && "!stroke-primary")}
            />
          </div>
        )}
        <div
          className={clsx(
            "h-[28px] px-[8px] rounded-[8px] bg-[#F2F2F2] flex gap-[8px] items-center",
            props.isActive && "bg-primary-10"
          )}
        >
          <TagIcon className={clsx(props.isActive && "!stroke-primary")} />
          <p
            className={clsx(
              "text-[#808080] text-[10px] font-medium",
              props.isActive && "text-primary"
            )}
          >
            {props.tag}
          </p>
        </div>
      </div>
    </div>
  );
}
