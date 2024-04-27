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
import SecurityView from "./Security";
import ProfileEditView from "./Profile";

type Props = {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingsMenu({ showDropdown, setShowDropdown }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const menuItems: MenuItemType[] = [
    {
      icon: <User3Icon className="!stroke-primary" />,
      label: "update profile",
      action() {
        dispatch(
          triggerModal({
            children: <ProfileEditView />,
            show: true,
          })
        );
      },
    },
    // {
    //   href: "appearance",
    //   icon: <PaletteIcon className="!stroke-primary" />,
    //   label: "appearance",
    // },
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
            try {
              const isLoggedOut = await logOut();
              console.log({ isLoggedOut });
              if (isLoggedOut) {
                console.log("SHOULD NAVIGATE ", { isLoggedOut });
                router.replace("/signin");
              }
            } catch (error) {}
          },
          {
            message: {
              type: "error",
              icon: Logout2Icon,
              title: "Logout",
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
        <div className="relative ml-auto w-fit h-fit">{children}</div>
      )}
      show={showDropdown}
      setShow={setShowDropdown}
    />
  );
}
