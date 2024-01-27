"use client";

import {
  CheckCircleIcon,
  File7Icon,
  Image3Icon,
  Link1Icon,
  VideoRecorderIcon,
} from "@/app/components/svgs";
import Toolbar from "./Toolbar";
import { ComponentProps, useState } from "react";

type Content = {
  type: "heading" | "image" | "paragraph";
  value: string | Blob; //other image types
};

export default function Editor() {
  const addText = () => {};

  const [content, setContent] = useState<Content[]>([]);

  const tools: ComponentProps<typeof Toolbar>["tools"] = [
    { name: "text", icon: Image3Icon, action: addText },
    { name: "add image", icon: Link1Icon, action: addText },
    { name: "one value", icon: VideoRecorderIcon, action: addText },
    { name: "another value", icon: File7Icon, action: addText },
    { name: "some other", icon: CheckCircleIcon, action: addText },
  ];

  return (
    <div className="flex-1 flex w-full overflow-auto relative">
      <div className="w-32">
        <div className="mx-auto mt-8 w-fit">
          <Toolbar tools={tools} />
        </div>
      </div>
      <div>
        <div className="w-[95%] pt-8 mx-auto">
          <textarea
            // type="text"
            className="text-6xl outline-none border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800"
            placeholder="Note Title"
          />
        </div>
      </div>
    </div>
  );
}
