"use client";

import Link from "next/link";
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  LinkHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { Interface } from "readline";

// interface Props
//   extends DetailedHTMLProps<
//     AnchorHTMLAttributes<HTMLAnchorElement>,
//     HTMLAnchorElement
//   > {
//   href: string;
//   children({ isActive }: { isActive: boolean }): React.ReactNode;
// }

interface Props {
  href: string;
  children({ isActive }: { isActive: boolean }): React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function NavLink({ href, children, onClick }: Props) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // const splitLink = href.split("/");
    // check if pathname includes characters passed through 'href'
    pathname &&
    pathname.includes(href.split("?")[0].replace(/[^a-zA-Z0-9\/-]/g, ""))
      ? setIsActive(true)
      : setIsActive(false);
  }, [href, pathname]);

  return (
    <Link onClick={(e) => onClick?.(e)} href={href}>
      {children({ isActive })}
    </Link>
  );
}
