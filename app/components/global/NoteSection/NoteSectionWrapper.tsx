"use client";

import { useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";
import Editor from "../Editor/Editor";

export default function NoteSectionWrapper({
  children,
  note,
}: PropsWithChildren<{ note?: Note | null }>) {
  const params = useSearchParams();
  const edit = params.get("edit") === "true" ? true : false;

  return (
    <div>
      {edit && note ? (
        <>
          <Editor
            noteEdit={{
              id: note.id,
              noteTitle: note?.title,
              noteContent: note?.content,
            }}
          />
        </>
      ) : (
        children
      )}
    </div>
  );
}
