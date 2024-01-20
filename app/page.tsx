"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the user is on the / route
    if (pathname === "/") {
      // automatically Redirect to /signin
      router.push("/signin");
    }
  }, [router]);

  // Render something (this won't be visible as the user is redirected)
  return <div>You are not supposed to see this</div>;
};

export default Home;
