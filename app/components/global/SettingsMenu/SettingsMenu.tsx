import Link from "next/link";
import {
  ColorsIcon,
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

type Props = {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingsMenu({ showDropdown, setShowDropdown }: Props) {
  const router = useRouter();

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
      href: "security",
      icon: <Lock4Icon className="!stroke-primary" />,
      label: "security",
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
