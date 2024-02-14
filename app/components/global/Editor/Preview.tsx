import { H2 } from "@/utils/typography";
import { ImagePreview } from "./Editor";
import TextArea from "./TextArea";
import clsx from "clsx";
import { IconButton } from "..";
import { useContext } from "react";
import { ModalContext } from "@/context";
import { TrashIcon } from "../../svgs";
import Image from "next/image";

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
  const { triggerModal, closeModal } = useContext(ModalContext);

  const DeleteContent = ({ item }: { item: Content }) => (
    <IconButton
      onClick={() => {
        triggerModal({
          confirm() {
            const contentCopy = [...content];
            contentCopy.splice(contentCopy.indexOf(item), 1);
            setContent(contentCopy);
          },
          cancel: () => closeModal,
          message: {
            title: "Confirm Delete",
            text: "Delete this text? This action cannot be reversed",
          },
          icon: TrashIcon,
          type: "error",
        });
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
        className="text-4xl md:text-6xl"
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
        ) : item.type === "image" ? (
          <div key={i} className="relative">
            <DeleteContent item={item} />
            <Image
              src={item.preview as string}
              alt={item.type}
              width={720}
              height={720}
              className="w-full h-60 rounded-xl object-cover bg-gray-400"
            />
          </div>
        ) : item.type === "check" && typeof item.value !== "string" ? (
          <div key={i} className="relative group">
            <DeleteContent item={item} />
            <div className="flex gap-2">
              <input
                className="mt-1 shrink-0"
                type="checkbox"
                id="check"
                checked={item.value.checked}
              />
              <p
                className={clsx(
                  "outline-none text-xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800 rounded-md p-1",
                  "group-hover:outline-primary group-hover:outline group-hover:!bg-body group-hover:outline-1"
                )}
              >
                {item.value.label}
              </p>
            </div>
          </div>
        ) : null
      )}
    </>
  );
}
