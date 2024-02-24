"use client";

import Button from "@/app/components/button";
import Note from "@/app/components/dashboard/note";
// import { Editor, NavButton, NoteItem } from "@/app/components/global";
import { NavButton, NoteItem } from "@/app/components/global";
import { AddIcon, CheckCircleIcon, SearchIcon } from "@/app/components/svgs";
import { H1 } from "@/utils/typography";
import Image from "next/image";
import Link from "next/link";
import { db, storage } from "../../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, FormEvent, ChangeEvent } from "react";

export default function CreateNote() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const createNoteWithImage = async (
    title: String,
    content: String,
    imageFile: File
  ) => {
    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, "images/" + imageFile.name);
      await uploadBytes(storageRef, imageFile);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Add the note to the Firestore database
      const docRef = await addDoc(collection(db, "notes"), {
        title: title,
        content: content,
        imageUrl: imageUrl,
        timestamp: Timestamp.fromDate(new Date()),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleCreateNote = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "" || !image) {
      // Check if title, content, and image are provided
      alert("Please provide a title, content, and image.");
      return;
    }

    // Call createNoteWithImage function to create a new note
    await createNoteWithImage(title, content, image);

    // Reset form fields
    setTitle("");
    setContent("");
    setImage(null);
  };
  return (
    <>
      <header className="h-[72px] fixed md:hidden w-full bg-body border-b-[1px] border-b-[#F2F2F2] flex px-[24px] gap-[12px] py-[16px] shrink-0 z-50">
        <NavButton />
        <H1 className="text-2xl">Create Note</H1>
      </header>
      <div className="hidden_ lg:flex h-full flex-row">
        <div className="md:w-[360px] flex flex-col shrink-0 border-r-[1px] border-r-[#F2F2F2]">
          <header className="invisible md:visible h-[72px] sticky border-b-[1px] border-b-[#F2F2F2] md:flex px-[24px] gap-[12px] py-[16px] shrink-0">
            <H1 className="text-2xl">Create Note</H1>
          </header>
          {/* ALL NOTES - SHOULD BE MOVED TO A SEPARATE COMPONENTS SOON */}
          {/* <Notes /> */}
          <div className="flex-1  overflow-auto">
            {/* <>new Note item</> */}
            <div className="w-[95%] mx-auto py-3 h-full">
              <div className="animate-slide-up">
                <NoteItem
                  title="Note Title"
                  date={Date.now()}
                  subtitle="..."
                  tag="@tag"
                  isActive
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col">
          <header className="h-[72px] w-full border-b-[1px] border-b-[#F2F2F2] shrink-0">
            <div className="w-[95%] h-full flex items-center justify-center mx-auto">
              <button className="flex items-center p-2 ml-auto bg-[#F2F2F2] rounded-lg gap-2">
                <figure>
                  <CheckCircleIcon className="!stroke-gray-800" />
                </figure>
                <p className="capitalize">save note</p>
              </button>
            </div>
          </header>
          <div>
            <form onSubmit={handleCreateNote}>
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

              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />

              <button type="submit">Create Note</button>
            </form>
          </div>
          {/* <Editor /> */}
        </div>
      </div>
    </>
  );
}
