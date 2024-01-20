import clsx from "clsx";
import { HorizontalDots } from "../svgs";

interface Note {
  title: string;
  context: string;
  date: number;
  label?: any;
  favourite?: boolean;
  className?: string;
}

const Note = (params: Note) => {
  return (
    <div
      className={clsx(
        "w-[311px] h-[121px] rounded-[12px] bg-[#FAFAFA]",
        params.className
      )}
    >
      <div className="flex items-start">
        <div className="inline-flex items-start flex-col gap-[8px]">
          <p>{params.title}</p>
          <span>{params.context}</span>
        </div>
        <button className="flex w-[28px] h-[28px] p-[8px] items-center justify-center gap-[6px]">
          <figure>
            <HorizontalDots />
          </figure>
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Note;
