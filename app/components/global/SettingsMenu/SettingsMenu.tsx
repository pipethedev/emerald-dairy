import Link from "next/link";
import {
  ColorsIcon,
  Lock4Icon,
  Logout2Icon,
  PaletteIcon,
  PlusIcon,
  User3Icon,
} from "../../svgs";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
  type?: "button" | "link";
  action?: React.MouseEventHandler<HTMLButtonElement>;
};

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
    href: "logout",
    icon: <Logout2Icon className="!stroke-red-400" />,
    label: "logout",
  },
];

export default function SettingsMenu() {
  const MenuItem = ({
    item: { href, icon, label, action, type },
  }: {
    item: MenuItem;
  }) => {
    const Item = () => (
      <div className="flex gap-3 p-4 items-center hover:bg-primary-13 rounded-md active:bg-primary-10 whitespace-nowrap">
        {icon}
        <p>{label}</p>
      </div>
    );
    return type === "button" ? (
      <button onClick={action}>
        <Item />
      </button>
    ) : (
      <Link href={href}>
        <Item />
      </Link>
    );
  };

  return (
    <div className="divide-y-[1px] w-60 overflow-clip">
      {menuItems.map((item, i) => (
        <MenuItem item={item} key={i} />
      ))}
    </div>
  );
}
