"use client";

import {
  CheckCircleIcon,
  File7Icon,
  FontIcon,
  Image3Icon,
  Link1Icon,
  TrashIcon,
  VideoRecorderIcon,
} from "@/app/components/svgs";
import Toolbar from "./Toolbar";
import {
  ComponentProps,
  useEffect,
  useRef,
  useState,
  FormEvent,
  useContext,
  FormEventHandler,
} from "react";
import { H2 } from "@/utils/typography";
import Image from "next/image";
import { Button, IconButton } from "..";
import clsx from "clsx";
import {
  addItemToLocalStorage,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "@/utils/helpers";
import { createNoteWithImage } from "./createNote";
import { ModalContext } from "@/context";

import TextArea from "react-textarea-autosize";

type ImagePreview = string | ArrayBuffer | null | undefined;

const Editor = () => {
  const { triggerModal, closeModal } = useContext(ModalContext);

  const editorRef = useRef<HTMLDivElement>(null);
  const paragraphInputRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<
    (Content & {
      preview?: ImagePreview;
    })[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [newContent, setNewContent] = useState<
    Content & {
      preview?: ImagePreview;
      saved: boolean;
    }
  >();

  const addText = () => {
    saveProgress();
    setNewContent({ type: "paragraph", value: "", saved: false });
  };

  const addImage = ({
    preview,
    data,
  }: {
    preview?: string | ArrayBuffer | null;
    data: File | null;
  }) => {
    saveProgress();
    console.log({ preview, data });
    setNewContent({ value: data as any, type: "image", preview, saved: false });
  };

  useEffect(() => {
    console.log("SAVING");
    const timeout = setTimeout(() => {
      addItemToLocalStorage({
        item: JSON.stringify(newContent),
        name: "editing",
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [newContent?.value]);

  // COMEBACK: Might make this auto save
  const saveProgress = () => {
    console.log("SAVE: ", { newContent });
    if (!newContent) return;
    // if (newContent.type !== "paragraph")
    if (!newContent.value) return;
    setContent((prev) => [
      ...prev,
      {
        type: newContent.type,
        // COMEBACK: would get to this soon
        value: newContent?.value,
        preview: newContent.preview,
      },
    ]);
    setNewContent(undefined);
  };

  const cacheInput = () => {
    console.log("CACHE INPUT: ", { newContent });
    if (!newContent) return;
    // if (newContent.type !== "paragraph")
    if (!newContent.value) return;
    setContent((prev) => [
      ...prev,
      {
        type: newContent.type,
        // COMEBACK: would get to this soon
        value: paragraphInputRef.current?.innerHTML || newContent?.value,
      },
    ]);
    setNewContent(undefined);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call createNote function to add a new note
      // COMEBACK: Add image fle
      await createNoteWithImage(
        title,
        content.map((item) => ({
          value: item.value,
          type: item.type,
        })),
        ""
      );

      // Reset form fields after successful note creation
      setTitle("");
      setContent([]);
    } catch (error) {
      console.error("Error creating note: ", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      addItemToLocalStorage({
        item: JSON.stringify({ content, title }),
        name: "content",
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [content.length]);

  useEffect(() => {
    let editingData;

    const cachedData: any = getItemFromLocalStorage("content");
    const cachedEditing: any = getItemFromLocalStorage("editing");
    if (!cachedData) return;
    const data = JSON.parse(cachedData);

    if (cachedEditing !== "undefined") {
      console.log({ cachedEditing });
      editingData = JSON.parse(cachedEditing);
    }

    console.log("Cached Data", { data });
    const { title: cachedTitle, content: cachedContent } = data;
    console.log({ cachedTitle, cachedContent });
    setTitle(cachedTitle);
    setContent(cachedContent);
    setNewContent(editingData);
  }, []);

  // Spammed addText. Coz why not lol.
  const tools: ComponentProps<typeof Toolbar>["tools"] = [
    {
      name: "add text",
      icon: FontIcon,
      action: addText,
    },
    {
      name: "add image",
      icon: Image3Icon,
      altIcon: <ImageInput getImage={addImage} />,
    },
    { name: "add link", icon: Link1Icon, action: addText },
    { name: "one value", icon: VideoRecorderIcon, action: addText },
    { name: "another value", icon: File7Icon, action: addText },
    { name: "some other", icon: CheckCircleIcon, action: addText },
  ];

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
    <div className="flex h-full w-full flex-col">
      <header className="h-[72px] w-full border-b-[1px] border-b-[#F2F2F2] shrink-0 sticky">
        <div className="w-[95%] h-full flex items-center justify-center mx-auto">
          <button
            onClick={handleSubmit}
            className="flex items-center p-2 ml-auto bg-[#F2F2F2] rounded-lg gap-2"
          >
            <figure>
              <CheckCircleIcon className="!stroke-gray-800" />
            </figure>
            <p className="capitalize">save note</p>
          </button>
        </div>
      </header>

      <div
        ref={editorRef}
        className="flex-1 flex w-full overflow-auto relative"
      >
        <div className="w-32">
          <div className="mx-auto mt-8 w-fit">
            <Toolbar containerRef={editorRef} tools={tools} />
          </div>
        </div>
        <div className="space-y-4">
          <article className="w-[95%] space-y-6 pt-8 mx-auto">
            <TextArea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-6xl resize-none outline-none border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800"
              placeholder="Note Title"
            />
            {content.map((item, i) =>
              item.type === "heading" ? (
                <H2
                  key={i}
                  className={clsx(
                    "outline-none text-3xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800"
                  )}
                >
                  {item.value}
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
                    {item.value}
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
              ) : null
            )}
            {newContent &&
            (newContent?.type === "heading" ||
              newContent?.type === "paragraph") ? (
              // <H2>{newContent?.value}</H2>
              // <div
              //   ref={paragraphInputRef}
              //   // onChange={(e) =>
              //   //   setNewContent((prev) => {
              //   //     if (!prev) return undefined;
              //   //     return {
              //   //       ...prev,
              //   //       value: e.target.value,
              //   //     };
              //   //   })
              //   // }
              //   // value={newContent?.value}
              //   contentEditable
              //   className={clsx(
              //     "outline-none border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800 border border-l border-yellow-100 bg-primary/10 rounded-md p-1 break-words",
              //     newContent?.type === "paragraph" && "text-xl",
              //     newContent?.type === "heading" && "text-3xl"
              //   )}
              //   // placeholder="enter text"
              // >
              //   {/* COMEBACK: Thi is meant to be a quick implementation primarily for testing purposes. Would likely remove, or improve.  */}
              //   {newContent?.value}
              // </div>
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
                value={newContent?.value}
                // contentEditable
                className={clsx(
                  "outline-none border-none font-bold placeholder:text-gray-300 overflow-hidden w-full h-fit text-wrap text-gray-800 border border-l border-yellow-100 bg-primary/10 rounded-md p-1 break-words resize-none",
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
            ) : null}
          </article>
          <Button onClick={() => saveProgress()}>Save progress</Button>
        </div>
      </div>
    </div>
  );
};

type ImageInputProps = {
  getImage(params: {
    preview?: string | ArrayBuffer | null;
    data: File | null;
  }): void;
};

function ImageInput({ getImage }: ImageInputProps) {
  const [image, setImage] = useState("");

  const readURI = (img: Blob, value: File | null) => {
    if (img) {
      let reader = new FileReader();
      reader.onload = function (ev: ProgressEvent<FileReader>) {
        getImage({
          preview: ev.target?.result,
          // data: ev.target?.result as string,
          data: value,
        });
      };
      return reader.readAsDataURL(img);
    }
  };
  return (
    <>
      <label htmlFor="image" className="bg-red-400">
        <Image3Icon className="w-6 h-6 stroke-primary" />
      </label>
      <input
        type="file"
        id="image"
        accept="image/*"
        hidden
        multiple={false}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          const value = target.files ? target.files[0] : null;

          console.log("IMAGE_FILE", { value });

          // @ts-ignore TODO
          //TODO COMEBACK ADD_TYPES
          const img = Object.values<any>(target.files)[0];

          readURI(img, value);
          console.log({ value: target.value });
          return setImage(img);
        }}
      />
    </>
  );
}

export default Editor;
