import { H2 } from "@/lib/utils/typography";
import { ImagePreview } from "./Editor";
import TextArea from "./TextArea";
import clsx from "clsx";
import { IconButton } from "..";
import { useContext } from "react";
import { File7Icon, TrashIcon } from "../../svgs";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/store";
import { closeModal, triggerModal } from "@/store/slices/modal";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: (Content & {
    preview?: ImagePreview;
  })[];
  setContent: React.Dispatch<
    React.SetStateAction<
      (Content & {
        preview?: ImagePreview;
      })[]
    >
  >;
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

export default function Preview({
  content,
  setContent,
  setNewContent,
  setTitle,
  title,
}: Props) {
  const dispatch = useAppDispatch();

  const DeleteContent = ({ item }: { item: Content }) => (
    <IconButton
      onClick={() => {
        dispatch(
          triggerModal({
            confirm() {
              const contentCopy = [...content];
              contentCopy.splice(contentCopy.indexOf(item), 1);
              setContent(contentCopy);
              dispatch(closeModal());
            },
            message: {
              title: "Confirm Delete",
              text: "Delete this Item? This action cannot be reversed",
              icon: TrashIcon,
            },
            type: "error",
          })
        );
      }}
      icon={TrashIcon}
      className="absolute opacity-0 group-hover:animate-slide-up -right-[2px] -top-4 z-10 !bg-white/50 group-hover:outline-primary group-hover:outline group-hover:!bg-body group-hover:outline-1"
    />
  );

  return (
    <>
      <TextArea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="text-4xl md:text-6xl !bg-transparent"
      />
      {content.map((item, i) =>
        item.type === "heading" ? (
          <H2
            key={i}
            className={clsx(
              "outline-none text-3xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800"
            )}
          >
            {item.value as string}
          </H2>
        ) : item.type === "paragraph" ? (
          <div key={i} className="relative group">
            <DeleteContent item={item} />
            <p
              className={clsx(
                "outline-none text-xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800 rounded-md p-1",
                "group-hover:outline-primary group-hover:outline group-hover:!bg-body group-hover:outline-1"
              )}
            >
              {item.value as string}
            </p>
          </div>
        ) : item.type === "link" ? (
          <div key={i} className="relative group">
            <DeleteContent item={item} />
            <Link
              href={item.value as string}
              className={clsx(
                "outline-none text-xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-blue-900 rounded-md p-1",
                "group-hover:outline-primary group-hover:outline group-hover:!bg-body group-hover:outline-1"
              )}
            >
              {item.value as string}
            </Link>
          </div>
        ) : item.type === "image" ? (
          <div key={i} className="relative group">
            <DeleteContent item={item} />
            <Image
              src={(item.preview || item.value) as string}
              alt={item.type}
              width={720}
              height={720}
              className="w-full h-60 rounded-xl object-cover bg-gray-400"
            />
          </div>
        ) : item.type === "video" ? (
          <div key={i} className="relative group">
            <DeleteContent item={item} />
            <video
              src={item.preview as string}
              width={720}
              height={720}
              controls
              className="w-full h-60 rounded-xl object-cover bg-gray-400"
            />
          </div>
        ) : item.type === "file" ? (
          <div className="w-24 h-24">
            <File7Icon className="w-full h-full" />
          </div>
        ) : item.type === "check" && typeof item.value !== "string" ? (
          <div key={i} className="relative group">
            <DeleteContent item={item} />
            <div className="flex gap-2">
              <input
                className="mt-1 shrink-0"
                type="checkbox"
                id="check"
                // @ts-ignore COMEBACK
                checked={item.value.checked}
              />
              <p
                className={clsx(
                  "outline-none text-xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800 rounded-md p-1",
                  "group-hover:outline-primary group-hover:outline group-hover:!bg-body group-hover:outline-1"
                )}
              >
                {/* @ts-ignore COMEBACK */}
                {item.value.label}
              </p>
            </div>
          </div>
        ) : null
      )}
    </>
  );
}
