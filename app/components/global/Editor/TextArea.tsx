import clsx from "clsx";
import TextAreaAutoSize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

export default function TextArea({
  className,
  ...textAreaProps
}: TextareaAutosizeProps) {
  return (
    <TextAreaAutoSize
      autoFocus
      className={clsx(
        "outline-none border-none font-bold placeholder:text-gray-300 overflow-hidden w-full h-fit text-wrap text-gray-800 border border-l border-yellow-100 bg-primary/10 rounded-md p-1 break-words resize-none",
        className
      )}
      {...textAreaProps}
    />
  );
}
