import clsx from "clsx";
import { DropdownMenu } from "..";
import {
  ArchiveIcon,
  FolderDownLoadIcon,
  HeartsOutlineIcon,
  Info,
  InfoCircleIcon,
  Lock4Icon,
  Logout2Icon,
  MoreHorisIcon,
  PaletteIcon,
  SearchIcon,
  TagIcon,
  TrashIcon,
  User3Icon,
} from "../../svgs";
import {
  addNoteToArchive,
  addNoteToFavorite,
  deleteNote,
} from "@/controllers/note";
import { ComponentProps } from "react";
import { useAppDispatch } from "@/hooks/store";
import { closeModal, triggerModal } from "@/store/slices/modal";

type Props = {
  noteActive?: boolean;
  note?: Note;
};

export default function NoteOptions({ noteActive, note }: Props) {
  const dispatch = useAppDispatch();

  const executeAction = (
    action: (...args: any) => Promise<void>,
    {
      message: { type, ...message },
      setLoading,
    }: {
      message: ModalState["modalMessage"] & {
        type?: ModalState["type"];
      };
      setLoading(status: boolean): void;
    }
  ) => {
    dispatch(
      triggerModal({
        message,
        type,
        show: true,
        async confirm() {
          try {
            dispatch(closeModal());
            setLoading(true);
            await action();
          } catch (error) {
            console.error("DELETE ACTION OPTION: ", error);
          } finally {
            setLoading(false);
          }
        },
      })
    );
  };

  const options: ComponentProps<typeof DropdownMenu>["menuItems"][number][] = [
    {
      action(options) {
        executeAction(() => addNoteToFavorite(note?.id!), {
          message: {
            icon: ArchiveIcon,
            title: "Add Note to Favourites",
            text: (
              <p>
                Are you sure you want to add{" "}
                <span className="text-primary font-bold">{note?.title}</span> to
                Favourites?
              </p>
            ),
          },
          setLoading: (status) => options?.handleLoading(status),
        });
      },
      icon: <HeartsOutlineIcon className="!stroke-primary" />,
      label: "add to favourite",
    },
    {
      action() {
        console.log("ACTION");
        deleteNote("");
      },
      icon: <SearchIcon className="!stroke-primary" />,
      label: "search note",
    },
    {
      action() {
        console.log("ACTION");
        deleteNote("");
      },
      icon: <FolderDownLoadIcon className="!stroke-primary rotate-90" />,
      label: "move to folder",
    },
    {
      action() {
        console.log("ACTION");
        deleteNote("");
      },
      icon: <TagIcon className="!stroke-primary" />,
      label: "add tag",
    },
    {
      action() {
        console.log("ACTION");
        deleteNote("");
      },
      icon: <InfoCircleIcon className="!stroke-primary" />,
      label: "note info",
    },
    {
      action(options) {
        executeAction(() => addNoteToArchive(note?.id!), {
          message: {
            icon: ArchiveIcon,
            title: "Archive Note",
            text: (
              <p>
                Are you sure you want to add{" "}
                <span className="text-primary font-bold">{note?.title}</span> to
                archive?
              </p>
            ),
          },
          setLoading: (status) => options?.handleLoading(status),
        });
      },
      icon: <ArchiveIcon className="!stroke-primary" />,
      label: "archive note",
    },
    {
      action(options) {
        executeAction(() => deleteNote(note?.id!), {
          message: {
            type: "error",
            icon: TrashIcon,
            title: "Delete Note",
            text: (
              <p>
                Are you sure you want to delete{" "}
                <span className="text-primary font-bold">{note?.title}</span>?
              </p>
            ),
          },
          setLoading: (status) => options?.handleLoading(status),
        });
      },
      icon: <TrashIcon className="!stroke-red-400" />,
      label: "delete note",
    },
  ];

  return (
    <DropdownMenu
      menuItems={options}
      buttonProps={{
        icon: MoreHorisIcon,
        title: "options",
        stroke: "!stroke-primary",
        className: clsx(
          "bg-[#F2F2F2] grid place-items-center relative",
          noteActive && "bg-primary-10"
        ),
      }}
      className="-right-6"
      buttonWrapper={(children) => <div className="relative">{children}</div>}
    />
  );
}
