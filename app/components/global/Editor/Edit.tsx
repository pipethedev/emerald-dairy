import { useState } from "react";
import { IconButton } from "..";
import { TrashIcon } from "../../svgs";
import Image from "next/image";
import { ImagePreview } from "./Editor";
import TextArea from "./TextArea";
import clsx from "clsx";

type Props = {
  newContent:
    | (Content & {
        preview?: ImagePreview;
        saved?: boolean | undefined;
      })
    | undefined;
  setNewContent: React.Dispatch<
    React.SetStateAction<
      | (Content & {
          preview?: ImagePreview;
          saved?: boolean | undefined;
        })
      | undefined
    >
  >;
};

export default function Edit({ newContent, setNewContent }: Props) {
  const deleteNewContent = () => {
    setNewContent(undefined);
  };

  return (
    <>
      {newContent && (
        <div className="relative group -z-10">
          <IconButton
            onClick={deleteNewContent}
            icon={TrashIcon}
            className="absolute opacity-0 group-hover:animate-slide-up -right-[2px] -top-4 z-10 !bg-white/50 group-hover:outline-primary group-hover:outline group-hover:!bg-body group-hover:outline-1"
          />
          {newContent?.type === "heading" ||
          newContent?.type === "paragraph" ? (
            <TextArea
              // ref={paragraphInputRef}
              autoFocus
              onChange={(e) =>
                setNewContent((prev) => {
                  if (!prev) return undefined;
                  return {
                    ...prev,
                    value: e.target.value,
                  };
                })
              }
              value={newContent?.value as string}
              // contentEditable
              className={clsx(
                newContent?.type === "paragraph" && "text-xl",
                newContent?.type === "heading" && "text-3xl"
              )}
              // placeholder="enter text"
            />
          ) : newContent?.type === "image" ? (
            <Image
              src={newContent.preview as string}
              alt={newContent?.type}
              width={720}
              height={720}
              className="w-full h-60 rounded-xl object-cover bg-gray-400"
            />
          ) : newContent?.type === "video" ? (
            <video
              src={newContent.preview as string}
              width={720}
              height={720}
              controls
              className="w-full h-60 rounded-xl object-cover bg-gray-400"
            />
          ) : newContent?.type === "check" &&
            typeof newContent.value !== "string" ? (
            <label className="flex gap-2" htmlFor="check">
              <input
                className="mt-1 shrink-0"
                type="checkbox"
                id="check"
                onChange={(e) => {
                  typeof newContent.value !== "string" &&
                    setNewContent({
                      type: "check",
                      value: {
                        ...newContent.value,
                        checked: e.target.checked,
                      },
                    });
                }}
                checked={newContent.value.checked}
              />
              <TextArea
                onChange={(e) => {
                  typeof newContent.value !== "string" &&
                    setNewContent({
                      type: "check",
                      value: {
                        ...newContent.value,
                        label: e.target.value,
                      },
                    });
                }}
                value={newContent.value.label}
              />
            </label>
          ) : null}
        </div>
      )}
    </>
  );
}
