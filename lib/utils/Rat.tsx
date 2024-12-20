"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/slices/auth";
import { useAppDispatch } from "@/hooks/store";
import { Lock4Icon } from "@/app/components/svgs";
import { triggerNotification } from "@/store/slices/notification";
import { getItemFromLocalStorage } from "./helpers";

let hasRun = false;

export default function Rat() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let user: AuthState["user"] = null;
    const storedUser = getItemFromLocalStorage("currentUser");
    if (storedUser) user = JSON.parse(storedUser);
    const token = getItemFromLocalStorage("token");

    console.log("STORED: ", { token, user });

    if (user && token)
      dispatch(setUser({ user, token, isAuthenticated: true }));
  }, [dispatch]);

  // NOTE: Testing
  useEffect(() => {
    if (!hasRun) return;
    const interval = setInterval(() => {
      const storedUser = getItemFromLocalStorage("currentUser") as any;
      const currentUser = JSON.parse(storedUser);
      console.log("RAT: ", currentUser);
      if (!currentUser || !currentUser.uid) {
        router.replace("/signin");
        dispatch(
          triggerNotification({
            icon: Lock4Icon,
            message: "Authentication error",
            type: "error",
          })
        );
      }
    }, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
