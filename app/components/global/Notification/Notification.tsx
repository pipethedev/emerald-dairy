"use client";

import { useContext, useEffect, useState } from "react";

import { NotificationContext } from "@/context";

import { AnimatePresence, motion } from "framer-motion";
import Media from "react-media";
import ClientOnlyPortal from "../ClientOnlyPortal/ClientOnlyPortal";
import { Bell1, BellRinging1 } from "../../svgs";

// const notification = document.getElementById("notification")!;
export default function Notification() {
  const { showNotification, notificationMessage } =
    useContext(NotificationContext);

  useEffect(() => {
    console.log("NOTIFICATION", showNotification);
  }, [showNotification]);

  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (domReady) {
    if (typeof window === "object" && typeof window.document === "object") {
      return (
        <Media queries={{ small: { maxWidth: 640 } }}>
          {(matches) => (
            <AnimatePresence>
              {showNotification && (
                <ClientOnlyPortal selector={"#notification"}>
                  <motion.div
                    initial={{
                      opacity: 0,
                      // x: matches.small ? 0 : "100%",
                      y: !matches.small ? "-100%" : 0,
                      // scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      // scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      // x: matches.small ? 0 : "100%",
                      y: !matches.small ? "-100%" : 0,
                      // scale: 0,
                    }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    className="fixed inset-0 z-50 w-11/12_ flex items-end w-full p-3 mx-auto bg-white border rounded-2xl shadow-lg md:w-80 md:rounded-xl outline_ outline-primary_ border-b-primary-3 md:border-primary-3 ring-offset-4_ -top-4 md:top-auto md:bottom-16 md:right-16 md:left-auto md:mx-0 h-20 md:h-fit shadow-primary-3/30 active:scale-90"
                  >
                    <div className="flex items-center w-full text-xl gap-2">
                      <span className="relative flex items-center justify-center text-primary">
                        <BellRinging1 className="w-6 h-6 stroke-primary animate-ping" />
                        <Bell1 className="absolute w-6 h-6 stroke-primary" />
                      </span>
                      <div className="w-full overflow-hidden text-primary text-ellipsis">
                        {notificationMessage}
                      </div>
                    </div>
                  </motion.div>
                </ClientOnlyPortal>
              )}
            </AnimatePresence>
          )}
        </Media>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}
