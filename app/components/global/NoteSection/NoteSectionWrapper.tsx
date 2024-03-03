"use client";

import { useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";
import Editor from "../Editor/Editor";

export default function NoteSectionWrapper({
  children,
  note,
}: PropsWithChildren<{ note: Note }>) {
  const params = useSearchParams();
  const edit = params.get("edit") === "true" ? true : false;

  return (
    <div>
      {edit ? (
        <Editor
          noteEdit={{
            noteTitle: note?.title,
            noteContent: note?.content,
          }}
        />
      ) : (
        children
      )}
    </div>
  );
}
