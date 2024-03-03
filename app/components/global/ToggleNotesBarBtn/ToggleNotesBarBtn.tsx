"use client";

import { toggleNotesBar } from "@/store/slices/notesbar";
import { IconButton } from "..";
import { ExpandMoreIcon } from "../../svgs";
import { useAppDispatch } from "@/hooks/store";

export default function ToggleNotesBarBtn() {
  const dispatch = useAppDispatch();
  return (
    <IconButton
      className="rotate-180 md:hidden"
      onClick={() => dispatch(toggleNotesBar())}
      icon={ExpandMoreIcon}
      title="Toggle Notes"
    />
  );
}
