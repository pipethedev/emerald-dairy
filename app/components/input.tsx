import clsx from "clsx";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "./svgs";

export default function Input(props: InputProps) {
  const { type, className, ...prop } = props;

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisibility((prev) => !prev);

  switch (type) {
    case "password": {
      return (
        <div
          className={clsx(
            "flex w-full justify-between items-center text-black placeholder:text-[#B3B3B3] bg-[#FAFAFA] max-w-[382px]_ lg:max-w-[420px]_ min-w-[342px]_ lg:min-w-[420px]_ p-[16px] md:rounded-[12px] outline-none font-normal md:tracking-[0.32px] text-base gap-3",
            className
          )}
        >
          <input
            className="flex-1  bg-transparent  outline-none"
            type={passwordVisibility ? "text" : type}
            {...prop}
          />
          <button
            type="button"
            className="transition-all duration-300 active:scale-[0.96]"
            onClick={togglePasswordVisibility}
          >
            {passwordVisibility ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        </div>
      );
    }
    case "email": {
      return (
        <input
          className={clsx(
            "block w-full max-w-[382px]_ lg:max-w-[420px]_ min-w-[342px]_ lg:min-w-[420px]_ p-[16px]  md:rounded-[12px] text-black placeholder:text-[#B3B3B3] bg-[#FAFAFA] outline-none font-normal md:tracking-[0.32px] text-base",
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
            "block w-full max-w-[382px]_ lg:max-w-[420px]_ min-w-[342px]_ lg:min-w-[420px]_ p-[16px]  md:rounded-[12px] text-black placeholder:text-[#B3B3B3] bg-[#FAFAFA] outline-none font-normal md:tracking-[0.32px] text-base",
            className
          )}
          {...prop}
        />
      );
    }
  }
}
