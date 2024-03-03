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
        "h-fit bg-[#FAFAFA] w-fit rounded-lg border-[0.5px] flex items-center justify-center flex-col"
      )}
    >
      <div
        className={clsx(
          "space-y-3 h-[19.5rem] p-2 overflow-hidden transition-all duration-500",
          mini && "!h-0 py-0"
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
            mini ? "" : "rotate-180"
          )}
        />
      </IconButton>
    </motion.div>
  );
}
