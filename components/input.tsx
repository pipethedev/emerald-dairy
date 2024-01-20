import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "./svgs";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
}
export default function Input(props: InputProps) {
  const { type, className, ...prop } = props;

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePassswordVisibility = () =>
    setPasswordVisibility((prev) => !prev);

  switch (type) {
    case "password": {
      return (
        <div
          className={clsx(
            "flex justify-between items-center text-[#B3B3B3] bg-[#FAFAFA] w-[382px] lg:w-[420px] p-[16px] md:rounded-[12px] outline-none font-normal md:tracking-[0.32px] text-base gap-3",
            className
          )}
        >
          <input
            className="flex-1  bg-transparent  outline-none"
            type={passwordVisibility ? "text" : type}
            {...prop}
          />
          <span
            className="transition-all duration-300 active:scale-[0.96]"
            onClick={togglePassswordVisibility}
          >
            {passwordVisibility ? <EyeIcon /> : <EyeSlashIcon />}
          </span>
        </div>
      );
    }
    case "email": {
      return (
        <input
          className={clsx(
            "block w-[382px] lg:w-[420px] p-[16px]  md:rounded-[12px] text-[#B3B3B3] bg-[#FAFAFA] outline-none font-normal md:tracking-[0.32px] text-base",
            className
          )}
          {...prop}
        />
      );
    }
    default: {
      return (
        <input
          className={clsx(
            "block w-[382px] lg:w-[420px] p-[16px]  md:rounded-[12px] text-[#B3B3B3] bg-[#FAFAFA] outline-none font-normal md:tracking-[0.32px] text-base",
            className
          )}
          {...prop}
        />
      );
    }
  }
}
