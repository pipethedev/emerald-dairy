import clsx from "clsx";
import { DropdownMenu } from "..";
import {
  ArchiveIcon,
  FolderDownLoadIcon,
  HeartsOutlineIcon,
  Info,
  InfoCircleIcon,
  Lock4Icon,
  Logout2Icon,
  MoreHorisIcon,
  PaletteIcon,
  SearchIcon,
  TagIcon,
  TrashIcon,
  User3Icon,
} from "../../svgs";

const options = [
  {
    href: "favourite",
    icon: <HeartsOutlineIcon className="!stroke-primary" />,
    label: "add to favourite",
  },
  {
    href: "appearance",
    icon: <SearchIcon className="!stroke-primary" />,
    label: "search note",
  },
  {
    href: "security",
    icon: <FolderDownLoadIcon className="!stroke-primary rotate-90" />,
    label: "move to folder",
  },
  {
    href: "tag",
    icon: <TagIcon className="!stroke-primary" />,
    label: "add tag",
  },
  {
    href: "logout",
    icon: <InfoCircleIcon className="!stroke-primary" />,
    label: "note info",
  },
  {
    href: "logout",
    icon: <ArchiveIcon className="!stroke-primary" />,
    label: "archive note",
  },
  {
    href: "logout",
    icon: <TrashIcon className="!stroke-red-400" />,
    label: "delete note",
  },
];

type Props = {
  noteActive?: boolean;
};

export default function NoteOptions({ noteActive }: Props) {
  return (
    <DropdownMenu
      menuItems={options}
      buttonProps={{
        icon: MoreHorisIcon,
        title: "options",
        stroke: "!stroke-primary",
        className: clsx(
          "bg-[#F2F2F2] grid place-items-center relative",
          noteActive && "bg-primary-10"
        ),
      }}
      className="-right-6"
      buttonWrapper={(children) => <div className="relative">{children}</div>}
    />
  );
}
