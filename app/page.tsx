"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "./components/global/Spinner";


const Home = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the user is on the / route
    if (pathname === "/") {
      // automatically Redirect to /signin
      router.push("/signin");
    }
  }, [router, pathname]);

  // Render something (this won't be visible as the user is redirected)
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Spinner />
    </div>
  );
};

export default Home;
