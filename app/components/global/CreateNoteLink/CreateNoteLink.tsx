import Link from "next/link";
import { AddIcon } from "../../svgs";

export default function CreateNoteLink() {
  return (
    <Link href={"/dashboard/create"}>
      <div className="h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#956E60]">
        <AddIcon className="!stroke-white" />
      </div>
    </Link>
  );
}
