import clsx from "clsx";
import {
  EditIcon,
  HeartsOutlineIcon,
  MoreHorisIcon,
  TagIcon,
} from "../../svgs";

export default function NoteLoader() {
  return (
    <div
      className={clsx(
        "bg-gray-100 outline-gray-300 outline-1 outline w-full p-[16px] rounded-[12px]"
      )}
    >
      <header className="flex gap-[8px] mb-[16px]">
        <div className="flex-1">
          {/* Title */}
          <div
            className={clsx(
              "bg-gray-200 animate-loader-opacity mb-[8px] w-3/4 h-6 rounded-md"
            )}
          />

          {/* Subtitle */}
          <div
            className={clsx(
              "bg-gray-200 animate-loader-opacity rounded-sm h-4"
            )}
          />
        </div>
        <div
          className={clsx(
            "h-[28px] w-[28px] rounded-[8px] bg-gray-200 grid place-items-center"
          )}
        >
          <MoreHorisIcon className={clsx("!stroke-gray-300")} />
        </div>
      </header>
      <div className="flex gap-[8px]">
        <div
          className={clsx(
            "h-[28px] px-[8px] rounded-[8px] bg-gray-200 flex gap-[8px] items-center"
          )}
        >
          <EditIcon className={clsx("!stroke-gray-300")} />
          {/* Date */}
          <div
            className={clsx(
              "bg-gray-300 animate-loader-opacity h-3 w-10 rounded-full"
            )}
          />
        </div>
        <div
          className={clsx(
            "h-[28px] px-[8px] rounded-[8px] bg-gray-200 grid place-items-center"
          )}
        >
          <HeartsOutlineIcon className={clsx("!stroke-gray-300")} />
        </div>

        {/* Tag */}
        <div
          className={clsx(
            "h-[28px] px-[8px] rounded-[8px] bg-gray-200 flex gap-[8px] items-center"
          )}
        >
          <TagIcon className={clsx("!stroke-gray-300")} />
          {/* Tag text */}
          <div
            className={clsx(
              "bg-gray-300 animate-loader-opacity rounded-full h-3 w-12"
            )}
          />
        </div>
      </div>
    </div>
  );
}
