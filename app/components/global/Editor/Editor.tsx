"use client";

import {
  CheckCircleIcon,
  File7Icon,
  FontIcon,
  Image3Icon,
  Link1Icon,
  VideoRecorderIcon,
} from "@/app/components/svgs";
import Toolbar from "./Toolbar";
import { ComponentProps, useEffect, useRef, useState, FormEvent } from "react";
import { H2 } from "@/utils/typography";
import Image from "next/image";
import { Button } from "..";
import clsx from "clsx";
import {
  addItemToLocalStorage,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "@/utils/helpers";
import { createNote } from "./createNote";

type Content = {
  type: "heading" | "image" | "paragraph";
  value: string; //other image types
};

const Editor: React.FC = () => {
  //   const editorRef = useRef<HTMLDivElement>(null);
  //   const paragraphInputRef = useRef<HTMLDivElement>(null);

  //   const [content, setContent] = useState<Content[]>([]);
  //   const [newContent, setNewContent] = useState<Content & { saved: boolean }>();
  //   const [imageContent, setImageContent] = useState<
  //     string | ArrayBuffer | null | undefined
  //   >("");

  //   const addText = () => {
  //     setNewContent({ type: "paragraph", value: "", saved: false });
  //   };

  //   const addImage = ({
  //     preview,
  //     data,
  //   }: {
  //     preview?: string | ArrayBuffer | null;
  //     data: string;
  //   }) => {
  //     console.log({ preview, data });
  //     setNewContent({ value: data, type: "image", saved: false });
  //     setImageContent(preview);
  //   };npm install --save mtn-momo

  //   // COMEBACK: Might make this auto save
  //   const saveProgress = () => {
  //     if (!newContent) return;
  //     setContent((prev) => [
  //       ...prev,
  //       {
  //         type: newContent.type,
  //         // COMEBACK: would get to this soon
  //         value: paragraphInputRef.current?.innerHTML || newContent?.value,
  //       },
  //     ]);
  //     setNewContent(undefined);
  //   };

  //   // Spammed addText. Coz why not lol.
  //   const tools: ComponentProps<typeof Toolbar>["tools"] = [
  //     {
  //       name: "add text",
  //       icon: FontIcon,
  //       action: addText,
  //     },
  //     {
  //       name: "add image",
  //       icon: Image3Icon,
  //       altIcon: <ImageInput getImage={addImage} />,
  //     },
  //     { name: "add link", icon: Link1Icon, action: addText },
  //     { name: "one value", icon: VideoRecorderIcon, action: addText },
  //     { name: "another value", icon: File7Icon, action: addText },
  //     { name: "some other", icon: CheckCircleIcon, action: addText },
  //   ];

  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       addItemToLocalStorage({
  //         item: JSON.stringify(content),
  //         name: "content",
  //       });
  //     }, 2000);

  //     return () => clearTimeout(timeout);
  //   }, [content.length]);

  //   useEffect(() => {
  //     const cachedData: any = getItemFromLocalStorage("content");
  //     if (!cachedData) return;
  //     const cachedContent = JSON.parse(cachedData);
  //     setContent(cachedContent);
  //   }, []);

  //   return (
  //     <div ref={editorRef} className="flex-1 flex w-full overflow-auto relative">
  //       <div className="w-32">
  //         <div className="mx-auto mt-8 w-fit">
  //           <Toolbar containerRef={editorRef} tools={tools} />
  //         </div>
  //       </div>
  //       <div className="space-y-4">
  //         <article className="w-[95%] space-y-6 pt-8 mx-auto">
  //           <textarea
  //             rows={1}
  //             className="text-6xl resize-none outline-none border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800"
  //             placeholder="Note Title"
  //           />
  //           {content.map((item, i) =>
  //             item.type === "heading" ? (
  //               <H2
  //                 key={i}
  //                 className={clsx(
  //                   "outline-none text-3xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800"
  //                 )}
  //               >
  //                 {item.value}
  //               </H2>
  //             ) : item.type === "paragraph" ? (
  //               <p
  //                 key={i}
  //                 className={clsx(
  //                   "outline-none text-xl border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800"
  //                 )}
  //               >
  //                 {item.value}
  //               </p>
  //             ) : item.type === "image" ? (
  //               <Image
  //                 key={i}
  //                 src={item.value}
  //                 alt={item.type}
  //                 width={720}
  //                 height={720}
  //                 className="w-full h-60 rounded-xl object-cover bg-gray-400"
  //               />
  //             ) : null
  //           )}
  //           {newContent &&
  //           (newContent?.type === "heading" ||
  //             newContent?.type === "paragraph") ? (
  //             // <H2>{newContent?.value}</H2>
  //             <div
  //               ref={paragraphInputRef}
  //               // onChange={(e) =>
  //               //   setNewContent((prev) => {
  //               //     if (!prev) return undefined;
  //               //     return {
  //               //       ...prev,
  //               //       value: e.target.value,
  //               //     };
  //               //   })
  //               // }
  //               // value={newContent?.value}
  //               contentEditable
  //               className={clsx(
  //                 "outline-none border-none font-bold placeholder:text-gray-300 overflow-hidden w-full text-wrap text-gray-800 underline border border-l border-yellow-100",
  //                 newContent?.type === "paragraph" && "text-xl",
  //                 newContent?.type === "heading" && "text-3xl"
  //               )}
  //               // placeholder="enter text"
  //             >
  //               {/* COMEBACK: Thi is meant to be a quick implementation primarily for testing purposes. Would likely remove, or improve.  */}
  //               {newContent?.value}
  //             </div>
  //           ) : newContent?.type === "image" ? (
  //             <Image
  //               src={imageContent as string}
  //               alt={newContent?.type}
  //               width={720}
  //               height={720}
  //               className="w-full h-60 rounded-xl object-cover bg-gray-400"
  //             />
  //           ) : null}
  //         </article>
  //         <Button onClick={() => saveProgress()}>Save progress</Button
  //       </div>
  //     </div>
  //   );
  // }

  // type ImageInputProps = {
  //   getImage(params: {
  //     preview?: string | ArrayBuffer | null;
  //     data: string;
  //   }): void;
  // };

  // function ImageInput({ getImage }: ImageInputProps) {
  //   const [image, setImage] = useState("");

  //   const readURI = (img: Blob) => {
  //     if (img) {
  //       let reader = new FileReader();
  //       reader.onload = function (ev: ProgressEvent<FileReader>) {
  //         getImage({
  //           preview: ev.target?.result,
  //           data: ev.target?.result as string,
  //         });
  //       };
  //       return reader.readAsDataURL(img);
  //     }
  //   };
  //   return (
  //     <>
  //       <label htmlFor="image" className="bg-red-400">
  //         <Image3Icon className="w-6 h-6 stroke-primary" />
  //       </label>
  //       <input
  //         type="file"
  //         id="image"
  //         accept="image/*"
  //         hidden
  //         multiple={false}
  //         onInput={(e: any) => {
  //           const target = e.target as HTMLInputElement;

  //           // @ts-ignore TODO
  //           //TODO COMEBACK ADD_TYPES
  //           const img = Object.values<any>(target.files)[0];

  //           readURI(img);
  //           console.log({ value: target.value });
  //           return setImage(img);
  //         }}
  //       />
  //     </>
  //   );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Call createNote function to add a new note
      await createNote(title, content);

      // Reset form fields after successful note creation
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note: ", error);
      // Handle error if needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>

      <button type="submit">Create Note</button>
    </form>
  );
};

export default Editor;
