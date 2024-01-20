import { H2 } from "@/utils/typography";
import Button from "../../button";

export default function NoteItem() {
  return (
    <div className="rounded-lg p-3 hover:bg-primary/20 hover:outline hover:outline-primary hover:outline-[1px] transition-all duration-300">
      <div className="flex items-center">
        <h2>Prayer as an Anchor</h2>
        <button className="bg-primary/70 p-1 ml-auto rounded-lg">
          {/* NOTE */}
          ooo
        </button>
      </div>
      <p className="">
        Some note context come over to the second teeedeeeeeeeeee
      </p>
    </div>
  );
}
