import { H5 } from "@/lib/utils/typography";

interface VerseOfDayProps {
  className?: string;
}

export default function VerseOfDay({ className }: VerseOfDayProps) {
  return (
    <div
      className={`${className} font-aeonikBold text-[#956E60] mx-3 bg-[#FEF6F4] transition-all duration-300 hover:bg-[#956E60]/60 hover:text-[#FEF6F4] md-h-[113px] md:w-[215px] rounded-md`}
    >
      <H5 className="pl-3 pb-[80px] md:pt-4 ">Verse of the Day</H5>
    </div>
  );
}
