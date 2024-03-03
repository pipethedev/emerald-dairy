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
import { Button, IconButton, Overlay } from "..";
import clsx from "clsx";
import {
  addItemToLocalStorage,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "@/utils/helpers";
// import { createNoteWithImage } from "./createNote";
import { ModalContext } from "@/context";
import Preview from "./Preview";
import Edit from "./Edit";
import { motion } from "framer-motion";
import Spinner from "../Spinner/Spinner";
import { createNoteWithImage } from "@/controllers/note";

export type ImagePreview = string | ArrayBuffer | null | undefined;

type EditorContent = Content & {
  preview?: ImagePreview;
};

type Props = {
  noteEdit?: {
    noteContent?: EditorContent[];
    noteTitle: string;
  };
};

const Editor = ({ noteEdit }: Props) => {
  const { triggerModal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    console.log({ noteEdit });
  }, []);

  const noteTitle = noteEdit?.noteTitle ?? "";
  const noteContent = noteEdit?.noteContent ?? [];

  const editorRef = useRef<HTMLDivElement>(null);
  const paragraphInputRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(noteTitle);
  const [content, setContent] = useState<EditorContent[]>(noteContent);
  const [loading, setLoading] = useState(false);
  const [newContent, setNewContent] = useState<
    Content & {
      preview?: ImagePreview;
      saved?: boolean;
    }
  >();

  const addText = () => {
    saveProgress();
    setNewContent({ type: "paragraph", value: "", saved: false });
  };

  const addLink = () => {
    saveProgress();
    setNewContent({ type: "link", value: "", saved: false });
  };

  const addCheck = () => {
    saveProgress();
    setNewContent({
      type: "check",
      value: { checked: false, label: "" },
      saved: false,
    });
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

  const addVideo = ({
    preview,
    data,
  }: {
    preview?: string | ArrayBuffer | null;
    data: File | null;
  }) => {
    saveProgress();
    console.log({ preview, data });
    setNewContent({ value: data as any, type: "video", preview, saved: false });
  };

  const addFile = ({
    preview,
    data,
  }: {
    preview?: string | ArrayBuffer | null;
    data: File | null;
  }) => {
    saveProgress();
    console.log({ preview, data });
    setNewContent({ value: data as any, type: "file", preview, saved: false });
  };

  const inputCacheDependencyArray = () => {
    const checkValue =
      typeof newContent?.value !== "string" ? newContent?.value.label : "";
    const checkLabel =
      typeof newContent?.value !== "string" ? newContent?.value.checked : "";
    return [newContent?.value, checkValue, checkLabel];
  };
  useEffect(() => {
    inputCacheDependencyArray;
    console.log("SAVING");
    const timeout = setTimeout(() => {
      addItemToLocalStorage({
        item: JSON.stringify(newContent),
        name: "editing",
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [inputCacheDependencyArray()]);

  // COMEBACK: check if this is needed
  const validateNoteData = () => {
    if (!newContent || !newContent.value) return false;
    if (newContent.type === "check" && typeof newContent.value !== "string")
      if (!newContent.value.label) return false;
    return true;
  };

  // COMEBACK: Might make this auto save
  const saveProgress = () => {
    console.log("SAVE: ", { newContent });
    if (!newContent || !newContent.value) return;
    if (newContent.type === "check" && typeof newContent.value !== "string")
      if (!newContent.value.label) return;
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
          value: item.value as string,
          type: item.type,
        })),
        ""
      );

      // Reset form fields after successful note creation
      // COMEBACK
      // setTitle("");
      // setContent([]);
    } catch (error) {
      console.error("Error creating note: ", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filteredContent = content.filter(
      (data) => data.type !== "video" && data.type !== "file"
    );

    const timeout = setTimeout(() => {
      addItemToLocalStorage({
        item: JSON.stringify({ content: filteredContent, title }),
        name: "content",
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [content.length]);

  useEffect(() => {
    if (noteEdit) return;

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

    { name: "add link", icon: Link1Icon, action: addLink },
    {
      name: "add video",
      icon: Image3Icon,
      altIcon: <VideoInput getVideo={addVideo} />,
    },
    {
      name: "another value",
      icon: File7Icon,
      altIcon: <FileInput getFile={addFile} />,
    },
    { name: "add check", icon: CheckCircleIcon, action: addCheck },
  ];

  return (
    <>
      <Overlay show={loading} className="flex items-center justify-center">
        <div className="w-fit">
          <Spinner />
          <p className="w-fit mx-auto">saving in progress...</p>
        </div>
      </Overlay>
      <div className="flex h-full w-full flex-col">
        <header className="h-[72px] w-full border-b-[1px] border-b-[#F2F2F2] shrink-0 flex">
          <div className="w-fit ml-auto gap-2 h-full flex items-center justify-center px-3">
            <Button
              onClick={() => saveProgress()}
              className="mx-auto w-fit py-2"
            >
              Save progress
            </Button>
            <motion.button
              onClick={handleSubmit}
              className={clsx(
                "flex items-center p-2 ml-auto bg-[#F2F2F2] rounded-lg gap-2 "
              )}
            >
              <figure>
                <CheckCircleIcon className="!stroke-gray-800" />
              </figure>
              <p className="capitalize">save note</p>
            </motion.button>
          </div>
        </header>

        <div
          ref={editorRef}
          className="flex-1 flex flex-col-reverse md:flex-row w-full overflow-auto relative px-1"
        >
          <div className="z-10">
            <div className="mx-auto mt-8 w-fit fixed top-[80%] md:static md:top-auto left-0 md:left-auto">
              <Toolbar containerRef={editorRef} tools={tools} />
            </div>
          </div>
          <div className="space-y-4 w-full pb-4 flex-1">
            <article className="w-[95%] space-y-6 pt-8 mx-auto">
              <Preview
                content={content}
                setContent={setContent}
                setNewContent={setNewContent}
                setTitle={setTitle}
                title={title}
              />
              <Edit newContent={newContent} setNewContent={setNewContent} />
            </article>
            <Button
              onClick={() => saveProgress()}
              className="mx-auto hidden md:flex w-[95%] md:w-fit"
            >
              Save progress
            </Button>
          </div>
        </div>
      </div>
    </>
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

type VideoInputProps = {
  getVideo(params: {
    preview?: string | ArrayBuffer | null;
    data: File | null;
  }): void;
};

function VideoInput({ getVideo }: VideoInputProps) {
  const [video, setVideo] = useState("");

  const readURI = (video: Blob, value: File | null) => {
    if (video) {
      let reader = new FileReader();
      reader.onload = function (ev: ProgressEvent<FileReader>) {
        getVideo({
          preview: ev.target?.result,
          // data: ev.target?.result as string,
          data: value,
        });
      };
      return reader.readAsDataURL(video);
    }
  };
  return (
    <>
      <label htmlFor="video" className="bg-red-400">
        <VideoRecorderIcon className="w-6 h-6 stroke-primary" />
      </label>
      <input
        type="file"
        id="video"
        accept="video/mp4,video/x-m4v/video/quicktime,video/*"
        hidden
        multiple={false}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          const value = target.files ? target.files[0] : null;

          console.log("VIDEO_FILE", { value });

          // @ts-ignore TODO
          //TODO COMEBACK ADD_TYPES
          const video = Object.values<any>(target.files)[0];

          readURI(video, value);
          console.log({ value: target.value });
          return setVideo(video);
        }}
      />
    </>
  );
}

type FileInputProps = {
  getFile(params: {
    preview?: string | ArrayBuffer | null;
    data: File | null;
  }): void;
};

function FileInput({ getFile }: FileInputProps) {
  const [file, setFile] = useState("");

  const readURI = (file: Blob, value: File | null) => {
    if (file) {
      let reader = new FileReader();
      reader.onload = function (ev: ProgressEvent<FileReader>) {
        getFile({
          preview: ev.target?.result,
          // data: ev.target?.result as string,
          data: value,
        });
      };
      return reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <label htmlFor="file" className="bg-red-400">
        <File7Icon className="w-6 h-6 stroke-primary" />
      </label>
      <input
        type="file"
        id="file"
        accept="file/pdf,file/doc,file/docx,file/txt,file/*"
        hidden
        multiple={false}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          const value = target.files ? target.files[0] : null;

          console.log("VIDEO_FILE", { value });

          // @ts-ignore TODO
          //TODO COMEBACK ADD_TYPES
          const file = Object.values<any>(target.files)[0];

          readURI(file, value);
          console.log({ value: target.value });
          return setFile(file);
        }}
      />
    </>
  );
}

export default Editor;
