"use client";
import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isActive?: boolean;
  icon?: React.FC<React.SVGProps<SVGElement>>;
}

export default function IconButton({
  isActive,
  icon,
  children,
  ...buttonProps
}: PropsWithChildren<Props>) {
  const Icon = icon;
  return (
    <button
      {...buttonProps}
      className={clsx(
        "p-3 w-10 h-10 aspect-square bg-white hover:bg-primary-13 rounded-xl flex items-center justify-center",
        isActive && "outline-primary outline-1 outline !bg-primary-10 "
      )}
    >
      <figure>
        {children
          ? children
          : Icon && <Icon className={clsx("!stroke-primary !w-8")} />}
      </figure>
    </button>
  );
}
