"use client";
import Link from "next/link";
import {
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
import { logOut } from "@/controllers/auth";
import { redirect, useRouter } from "next/navigation";
import clsx from "clsx";
import { BASE_URL } from "@/lib/utils/constants";
import { useState } from "react";
import Input from "../../input";
import Button from "../../button";
import { triggerModal } from "@/store/slices/modal";
import { useAppDispatch } from "@/hooks/store";

type Props = {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingsMenu({ showDropdown, setShowDropdown }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const menuItems: MenuItem[] = [
    {
      href: "profile",
      icon: <User3Icon className="!stroke-primary" />,
      label: "update profile",
    },
    {
      href: "appearance",
      icon: <PaletteIcon className="!stroke-primary" />,
      label: "appearance",
    },
    {
      icon: <Lock4Icon className="!stroke-primary" />,
      label: "security",
      action() {
        dispatch(
          triggerModal({
            children: <SecurityView />,
            show: true,
          })
        );
      },
    },
    {
      action(options) {
        executeAction(
          async () => {
            const isLoggedOut = await logOut();
            console.log({ isLoggedOut });
            if (isLoggedOut) {
              console.log("SHOULD NAVIGATE ", { isLoggedOut });
              router.replace("/signin");
            }
          },
          {
            message: {
              type: "error",
              icon: Logout2Icon,
              title: "Delete Note",
              text: (
                <p>
                  Are you sure you want to{" "}
                  <span className="text-red-400 font-extrabold !uppercase">
                    logout
                  </span>
                  ?
                </p>
              ),
            },
            setLoading: (status) => options?.handleLoading(status),
          }
        );
      },
      icon: <Logout2Icon className="!stroke-red-400" />,
      label: "logout",
    },
  ];

  return (
    <DropdownMenu
      className="left-0"
      buttonProps={{ icon: SettingsIcon }}
      menuItems={menuItems}
      buttonWrapper={(children) => (
        <div className="relative w-fit h-fit ml-auto">{children}</div>
      )}
      show={showDropdown}
      setShow={setShowDropdown}
    />
  );
}

function SecurityView() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/`);
  };

  return (
    <form className="w-full mb-4 h-full flex flex-col" onSubmit={handleSubmit}>
      <div className="w-[95%] overflow-auto flex flex-col flex-1 space-y-4 h-full mx-auto">
        <div>
          <figure
            className={clsx(
              "w-12 h-12 rounded-full flex items-center justify-center bg-primary/10"
            )}
          >
            <Lock4Icon className={clsx("!stroke-primary w-8 h-8")} />
          </figure>
        </div>
        <div className="space-y-4 flex-1 pb-4">
          <div>
            <div className="font-bold text-2xl">Security</div>
            <div className={"break-word"}>
              This means that the amount for your session would be deducted from
              your wallet balance.
            </div>
          </div>
        </div>
        <div className="">
          <fieldset className="flex flex-col gap-3 w-full">
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
          </fieldset>
          <fieldset className="flex flex-col gap-3 w-full">
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
        className="capitalize w-full mt-2 shrink-0"
      >
        {"change password"}
      </Button>
    </form>
  );
}
