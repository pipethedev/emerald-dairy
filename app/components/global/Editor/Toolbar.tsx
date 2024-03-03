"use client";

import { IconButton } from "..";
import { RefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { checkInView } from "@/utils/helpers";
import clsx from "clsx";
import { ExpandMoreIcon } from "../../svgs";

interface Tool {
  name: string;
  icon: React.FC<React.SVGProps<SVGElement>>;
  altIcon?: React.ReactNode;
  action?: Function;
}

interface Props {
  tools: Tool[];
  containerRef: RefObject<HTMLDivElement>;
}

export default function Toolbar({ tools, containerRef }: Props) {
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [activeTool, setActiveTool] = useState("");
  const [mini, setMini] = useState(false);

  return (
    <motion.div
      ref={toolbarRef}
      drag
      dragMomentum={false}
      transition={{
        type: "keyframes",
      }}
      dragConstraints={containerRef}
      // COMEBACK: Add background color to tailwind config
      className={clsx(
        "h-fit bg-[#FAFAFA] w-fit rounded-lg border-[0.5px] flex items-center justify-center md:flex-col bottom-0 md:bottom-auto"
      )}
    >
      <div
        className={clsx(
          "flex md:flex-col bottom-0 md:bottom-auto gap-3 w-[19.5rem] md:!w-auto md:h-[19.5rem] p-2 overflow-hidden transition-all duration-500",
          mini && "md:!h-0 !w-0 md:!w-auto py-2 md:py-0 px-0 md:px-2"
        )}
      >
        {tools.map((tool, i) => (
          <IconButton
            key={i}
            isActive={activeTool === tool.name}
            onClick={() => {
              setActiveTool(tool.name);
              tool.action?.();
            }}
            icon={tool.icon}
            title={tool.name}
          >
            {tool.altIcon}
          </IconButton>
        ))}
      </div>
      <IconButton
        title={mini ? "maximize" : "minimize"}
        onClick={() => setMini((prev) => !prev)}
        className="mx-auto"
      >
        <ExpandMoreIcon
          className={clsx(
            "!stroke-primary transition-all duration-200",
            mini ? "-rotate-90 md:-rotate-0" : "rotate-90 md:rotate-180"
          )}
        />
      </IconButton>
    </motion.div>
  );
}
