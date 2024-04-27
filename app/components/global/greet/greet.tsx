"use client";
import { useAppSelector } from "@/hooks/store";
import Spinner from "../Spinner";

interface greetProps {
  name: string;
}

const Greeting = () => {
  const auth = useAppSelector((state) => state.auth);
  const getGreeting = (): string => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      return "good morning";
    } else if (currentTime >= 12 && currentTime < 18) {
      return "good afternoon";
    } else {
      return "good evening";
    }
  };

  const greeting = getGreeting();

  return (
    <div className="capitalize ">
      {`${greeting}, `}
      <span className="inline-block">
        {auth.user?.displayName ? (
          auth.user?.displayName.split(" ")[0] + "!"
        ) : (
          <span className="flex items-center gap-2">
            <Spinner size="small" className="!h-[10px] !w-[10px]" />
            <Spinner size="small" className="!h-[10px] !w-[10px]" />
            <Spinner size="small" className="!h-[10px] !w-[10px]" />
          </span>
        )}
      </span>
    </div>
  );
};

export default Greeting;
