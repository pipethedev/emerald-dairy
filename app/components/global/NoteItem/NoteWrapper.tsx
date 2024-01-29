"use client";
import clsx from "clsx";
import {
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ExpandMoreIcon } from "../../svgs";
import { Button } from "..";
import AnimateInOut from "../AnimateInOut";
import { motion } from "framer-motion";
import { checkInView } from "@/utils/helpers";

type NoteWrapperProps = PropsWithChildren<{
  isActive: boolean;
  containerRef: RefObject<HTMLDivElement>;
  title: string;
  index: number;
}>;

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// This component which wraps the NoteItem component checks if a note item is in view and shows a little popup, which when clicked scrolls the active note item into view
export default function NoteWrapper({
  containerRef,
  children,
  index,
  isActive,
  title,
}: NoteWrapperProps) {
  const noteRef = useRef<HTMLDivElement>(null);

  const [isInView, setIsInView] = useState<boolean | undefined>(undefined);
  const [position, setPosition] = useState<"top" | "bottom" | undefined>(
    undefined
  );
  const [loaded, setLoaded] = useState(false);

  const handleCheckInView = () => {
    const inViewValue = checkInView({
      containerRef,
      elementRef: noteRef,
    });
    setIsInView(inViewValue?.inViewVertical ?? false);
    setPosition(inViewValue?.offsetVertical);
  };

  useEffect(() => {
    const currentContainerRef = containerRef.current;

    if (!loaded) handleCheckInView();

    currentContainerRef?.addEventListener("scroll", () => {
      handleCheckInView();
    });
    setLoaded(true);

    return () =>
      currentContainerRef?.removeEventListener("scroll", () => {
        checkInView({ containerRef, elementRef: noteRef });
      });
  }, [isActive, checkInView, containerRef]);

  return (
    <>
      <motion.div
        initial={{ translateY: 100 }}
        animate={{ translateY: 0 }}
        transition={{
          delay: index / 10,
          duration: (index + 2.1) / 10,
        }}
        ref={noteRef as any}
        className="mb-2"
      >
        {children}
      </motion.div>
      {isActive && isInView === false && (
        <Button
          onClick={() =>
            noteRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className={clsx(
            "bg-primary active:scale-90 rounded-xl ml-6 w-60 mx-auto p-3 h-fit fixed bottom-0 flex items-center text-white transition-all duration-150 z-50",
            position === "top" ? "top-20" : "bottom-4"
          )}
        >
          <p>{title}</p>
          <figure
            className={clsx("ml-auto", position === "top" && "rotate-180")}
          >
            <ExpandMoreIcon className="!stroke-white" />
          </figure>
        </Button>
      )}
    </>
  );
}
