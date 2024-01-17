import { ArchiveIcon, DocIcon, HeartIcon, TrashIcon } from "@/components/svgs";
import { SVGProps } from "react";

interface SideNavigationLink {
    href: string;
    linkText: string;
    leading: React.FC<SVGProps<SVGElement>>;
}

export const sideNavigationLinksData: Array<SideNavigationLink> = [
    {
        href: '/dashboard',
        linkText: 'All Notes',
        leading: DocIcon,
    },
    {
        href: '/dashboard/favorites',
        linkText: 'Favorites',
        leading: HeartIcon,
    },
    {
        href: '/dashboard/archived',
        linkText: 'Archived',
        leading: ArchiveIcon,
    },
    {
        href: '/dashboard/recently-deleted',
        linkText: 'Recently Deleted',
        leading: TrashIcon,
    },
];
