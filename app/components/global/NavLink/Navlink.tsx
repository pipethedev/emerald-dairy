"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children({ isActive }: { isActive: boolean }): React.ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // const splitLink = href.split("/");
    // check if pathname includes characters passed through 'href'
    pathname && pathname.includes(href.replace(/[^a-zA-Z0-9\/-]/g, ""))
      ? setIsActive(true)
      : setIsActive(false);
  }, [href, pathname]);

  return (
    <Link href={href} className={className}>
      {children({ isActive })}
    </Link>
  );
}
