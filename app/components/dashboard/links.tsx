import {
  ArchiveIcon,
  DocIcon,
  HeartIcon,
  TrashIcon,
} from "@/app/components/svgs";
import { SVGProps } from "react";

export const sideNavigationLinksData: Array<SideNavigationLink> = [
  {
    href: "/dashboard",
    linkText: "All Notes",
    leading: DocIcon,
  },
  {
    href: "/dashboard/favorites",
    linkText: "Favorites",
    leading: HeartIcon,
  },
  {
    href: "/dashboard/archived",
    linkText: "Archived",
    leading: ArchiveIcon,
  },
  {
    href: "/dashboard/recently-deleted",
    linkText: "Recently Deleted",
    leading: TrashIcon,
  },
];