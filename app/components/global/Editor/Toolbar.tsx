"use client";

import { IconButton } from "..";
import { RefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { checkInView } from "@/utils/helpers";

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
      className="space-y-3 h-fit bg-[#FAFAFA] w-fit rounded-lg p-2 border-[0.5px]"
    >
      <IconButton>
        {/* NOTE: Just a placeholder needs actual Icon */}
        <p className="text-primary font-extralight text-3xl">T</p>
      </IconButton>
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
    </motion.div>
  );
}
