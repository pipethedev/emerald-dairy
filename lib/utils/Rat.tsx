"use client";

import { Lock4Icon } from "@/app/components/svgs";
import { useAppDispatch } from "@/hooks/store";
import { setUser } from "@/store/slices/auth";
import { triggerNotification } from "@/store/slices/notification";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

let hasRun = false;

export default function Rat() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let user: AuthState["user"] = null;
    const storedUser = localStorage.getItem("user");
    if (storedUser) user = JSON.parse(storedUser);
    const token = localStorage.getItem("token");

    console.log("STORED: ", { token, user });

    if (user && token)
      dispatch(setUser({ user, token, isAuthenticated: true }));
  }, []);

  // NOTE: Testing
  useEffect(() => {
    if (!hasRun) return;
    const interval = setInterval(() => {
      const storedUser = localStorage.getItem("currentUser") as any;
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
