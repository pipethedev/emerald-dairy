"use client";
import Link from "next/link";
import {
  Camera1Icon,
  ColorsIcon,
  Info,
  Lock4Icon,
  Logout2Icon,
  PaletteIcon,
  PlusIcon,
  SettingsIcon,
  User3Icon,
} from "../../svgs";
import { DropdownMenu } from "..";
import { executeAction } from "@/lib/utils/helpers";
// import { logOut } from "@/controllers/auth";
import { redirect, useRouter } from "next/navigation";
import clsx from "clsx";
import { BASE_URL, passwordRegex } from "@/lib/utils/constants";
import { useState } from "react";
import Input from "../../input";
import Button from "../../button";
import { triggerModal } from "@/store/slices/modal";
import { useAppDispatch } from "@/hooks/store";
import { changePassword } from "@/lib/firebase/firebase-auth";
import { triggerNotification } from "@/store/slices/notification";
import { logOut } from "@/controllers/auth";
import { signOut } from "firebase/auth";
import Image from "next/image";

export default function SecurityView() {
  const dispatch = useAppDispatch();

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!passwordRegex.test(newPassword))
      return dispatch(
        triggerNotification({
          message: "Please Enter a valid password",
          icon: Lock4Icon,
          type: "warning",
        })
      );

    try {
      setLoading(true);
      const changed = await changePassword(newPassword);
      console.log({ changed });
      if (!changed)
        return dispatch(
          triggerNotification({
            message: "Operation failed",
            icon: Lock4Icon,
            type: "error",
          })
        );

      dispatch(
        triggerNotification({
          message: "Password changed Successfully",
          icon: Lock4Icon,
          type: "success",
        })
      );
    } catch (error) {
      console.error("MODAL_CHANGE_PASSWORD", { error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col w-full h-full mb-4" onSubmit={handleSubmit}>
      <div className="w-[95%] overflow-y-auto flex flex-col flex-1 space-y-4 h-full mx-auto">
        <div>
          <figure
            className={clsx(
              "flex items-center justify-center w-12 h-12 rounded-full bg-primary/10"
            )}
          >
            <Lock4Icon className={clsx("!stroke-primary w-8 h-8")} />
          </figure>
        </div>
        <div className="flex-1 pb-4 space-y-4">
          <div>
            <div className="text-2xl font-bold">Security</div>
            <div className={"break-word"}>
              This means that the amount for your session would be deducted from
              your wallet balance.
            </div>
          </div>
        </div>
        <div className="">
          {/* <fieldset className="flex flex-col w-full gap-3">
            <div className="flex flex-row justify-between">
              <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                Current Password
              </label>
              <Info />
            </div>
            <Input
              type="password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
            />
          </fieldset> */}
          <fieldset className="flex flex-col w-full gap-3">
            <div className="flex flex-row justify-between w-full">
              <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                New Password
              </label>
              <Info />
            </div>
            <Input
              type="password"
              name="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
          </fieldset>
        </div>
      </div>
      <Button
        type="submit"
        disabled={isDisabled}
        loading={loading}
        className="w-full mt-2 capitalize shrink-0"
      >
        {"change password"}
      </Button>
    </form>
  );
}
