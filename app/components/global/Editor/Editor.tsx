// "use client";

// import {
//   CheckCircleIcon,
//   File7Icon,
//   // FontIcon,
//   Image3Icon,
//   Link1Icon,
//   VideoRecorderIcon,
// } from "@/app/components/svgs";
// import Toolbar from "./Toolbar";
// import { ComponentProps, useEffect, useRef, useState, FormEvent, ChangeEvent } from "react";
// import { H2 } from "@/utils/typography";
// import Image from "next/image";
// import { Button } from "..";
// import clsx from "clsx";
// import {
//   addItemToLocalStorage,
//   getItemFromLocalStorage,
//   removeItemFromLocalStorage,
// } from "@/utils/helpers";
// import { createNoteWithImage } from "./createNote"

// type Content = {
//   type: "heading" | "image" | "paragraph";
//   value: string; //other image types
// };

// const Editorzz= () => {
//   const [title, setTitle] = useState<string>("");
//   const [content, setContent] = useState<string>("");
//   const [image, setImage] = useState<File | null>(null);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleCreateNote = async (e: FormEvent) => {
//     e.preventDefault();
//     if (title.trim() === "" || content.trim() === "" || !image) {
//       // Check if title, content, and image are provided
//       alert("Please provide a title, content, and image.");
//       return;
//     }

//     // Call createNoteWithImage function to create a new note
//     await createNoteWithImage(title, content, image);

//     // Reset form fields
//     setTitle("");
//     setContent("");
//     setImage(null);
//   };

//   return (
//     <form onSubmit={handleCreateNote}>
//       <label htmlFor="title">Title:</label>
//       <input
//         type="text"
//         id="title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />

//       <label htmlFor="content">Content:</label>
//       <textarea
//         id="content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         required
//       ></textarea>

//       <label htmlFor="image">Image:</label>
//       <input
//         type="file"
//         id="image"
//         accept="image/*"
//         onChange={handleFileChange}
//         required
//       />

//       <button type="submit">Create Note</button>
//     </form>
//   );
// };

// export default Editor;
