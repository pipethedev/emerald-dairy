"use client";
import { useAppSelector } from "@/hooks/store";

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
    <div className="capitalize ">{`${greeting}, ${
      auth.user?.displayName.split(" ")[0]
    }!`}</div>
  );
};

export default Greeting;
