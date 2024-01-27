"use client";

import { IconButton } from "..";
import { useState } from "react";

interface Tool {
  name: string;
  icon: React.FC<React.SVGProps<SVGElement>>;
  action: Function;
}

interface Props {
  tools: Tool[];
}

export default function Toolbar({ tools }: Props) {
  const [activeTool, setActiveTool] = useState("");

  return (
    // COMEBACK: Add background color to tailwind config
    <div className="space-y-3 h-fit bg-[#FAFAFA] w-fit rounded-lg p-2 border-[0.5px]">
      <IconButton>
        <p className="text-primary font-extralight text-3xl">T</p>
      </IconButton>
      {tools.map((tool, i) => (
        <IconButton
          key={i}
          isActive={activeTool === tool.name}
          onClick={() => setActiveTool(tool.name)}
          icon={tool.icon}
          title={tool.name}
        />
      ))}
    </div>
  );
}
