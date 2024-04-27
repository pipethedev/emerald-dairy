import { PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="h-[72px] z-[102] relative border-b-[1px] border-b-[#F2F2F2] flex shrink-0 px-2 gap-1 items-center justify-between py-[16px]">
      {children}
    </header>
  );
}
