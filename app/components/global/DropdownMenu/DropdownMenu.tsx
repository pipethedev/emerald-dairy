"use client";
import Link from "next/link";
import { IconButton } from "..";
import {
  ButtonHTMLAttributes,
  ComponentProps,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  SVGProps,
  useContext,
  useEffect,
  useState,
} from "react";
import AnimateInOut from "../AnimateInOut/AnimateInOut";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/hooks/store";
import { closeModal, triggerModal } from "@/store/slices/modal";
import Spinner from "../Spinner/Spinner";
import { Menu as HMenu } from "@headlessui/react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: React.FC<React.SVGProps<SVGElement>>;
  stroke?: string;
}

type Props = PropsWithChildren<
  ComponentProps<typeof motion.div> & {
    buttonWrapper?(children: React.ReactNode): React.ReactNode;
    buttonProps?: ButtonProps;
    menuItems: MenuItemType[];
    show?: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  }
>;

export default function DropdownMenu({
  buttonProps = { className: "", title: "" },
  buttonWrapper = (children) => <>{children}</>,
  children,
  menuItems,
  show = false,
  setShow,
  ...menuProps
}: Props) {
  const dispatch = useAppDispatch();

  const { className: buttonClassName, ...otherButtonProps } = buttonProps;
  const { className, ...otherMenuProps } = menuProps;

  const [showDropdown, setShowDropdown] = useState(show);

  const toggleDropDown = () => {
    setShowDropdown((prev) => {
      setShow?.(!prev);
      return !prev;
    });
  };

  useEffect(() => {
    console.log("SHOW_MUTATED", { show });
    if (show !== undefined) {
      setShowDropdown(show);
    }
  }, [show]);

  useEffect(() => {
    showDropdown &&
      window.addEventListener("keydown", (e: KeyboardEvent) => {
        e.code === "Escape" && setShowDropdown(false);
      });
  }, [showDropdown]);

  return (
    <>
      {buttonWrapper(
        <IconButton
          onClick={(e) => {
            showDropdown
              ? toggleDropDown()
              : dispatch(
                  triggerModal({
                    children: (
                      <div className="h-full_ overflow-auto overscroll-none">
                        <Menu menuItems={menuItems} />
                      </div>
                    ),
                  })
                );
            // Prevents click event from reaching parent, a link, for instance
            e.stopPropagation();
            e.preventDefault();
          }}
          style={{
            stroke: "black",
          }}
          stroke="!stroke-gray-800"
          className={clsx("!bg-[#FAFAFA] ml-auto md:hidden", buttonClassName)}
          icon={buttonProps?.icon}
          {...otherButtonProps}
        >
          {children ? children : null}
        </IconButton>
      )}

      {/* 
      {buttonWrapper(
        <>
          <IconButton
            onClick={(e) => {
              toggleDropDown();
              // Prevents click event from reaching parent, a link, for instance
              e.stopPropagation();
              e.preventDefault();
            }}
            style={{
              stroke: "black",
            }}
            stroke="!stroke-gray-800"
            className={clsx("!bg-[#FAFAFA] hidden md:flex", buttonClassName)}
            icon={buttonProps?.icon}
            {...otherButtonProps}
          >
      */}

      {buttonWrapper(
        // <HMenu>
        //   {({ open, close }) => (
        <>
          {/* <HMenu.Button> */}
          <IconButton
            onClick={(e) => {
              toggleDropDown();
              // Prevents click event from reaching parent, a link, for instance
              e.stopPropagation();
              e.preventDefault();
            }}
            style={{
              stroke: "black",
            }}
            stroke="!stroke-gray-800"
            className={clsx("!bg-[#FAFAFA] hidden md:flex", buttonClassName)}
            icon={buttonProps?.icon}
            {...otherButtonProps}
          >
            {children ? children : null}
          </IconButton>
          {/* </HMenu.Button> */}
          <AnimateInOut
            show={show && showDropdown}
            initial={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 100 }}
            className={clsx(
              "rounded-xl overflow-clip shadow-xl shadow-primary/20 absolute top-12 z-[10000] bg-white outline outline-1 outline-primary-3/30",
              className
            )}
            {...otherMenuProps}
          >
            <Menu menuItems={menuItems} />
          </AnimateInOut>
        </>
        // {/* )}
        //   </HMenu>
        // )} */}
        // </>
      )}
    </>
  );
}

export function MenuItem({
  item: { href, icon, label, action, type },
  itemBuilder,
}: {
  item: MenuItemType;
  itemBuilder?({ loading }: { loading: boolean }): React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const handleLoading = (loadingState: boolean) => setLoading(loadingState);

  const Item = () =>
    itemBuilder?.({ loading }) || (
      <div className="flex gap-3 p-4 cursor-pointer items-center hover:bg-primary-13 rounded-md active:bg-primary-10 whitespace-nowrap">
        {icon}
        <p className="capitalize">{label}</p>
        <div className="ml-auto">
          {loading && <Spinner className="!h-[10px] !w-[10px]" size="small" />}
        </div>
      </div>
    );
  return action ? (
    <div
      onClick={(e) => {
        action({ handleLoading });
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Item />
    </div>
  ) : (
    <Link href={(href as string) || ""}>
      <Item />
    </Link>
  );
}

export function Menu({ menuItems }: { menuItems: MenuItemType[] }) {
  return (
    <div className="min-w-60 w-full overflow-clip">
      {menuItems.map((item, i) => (
        <MenuItem item={item} key={i} />
      ))}
    </div>
  );
}
