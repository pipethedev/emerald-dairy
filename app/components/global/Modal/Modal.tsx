//@ts-nocheck
"use client";

import { useState } from "react";
import { useContext, useEffect } from "react";
import Overlay from "../Overlay";
import { ModalContext } from "@/context";
import { AnimatePresence, motion } from "framer-motion";
import ClientOnlyPortal from "../ClientOnlyPortal";
import { XClose } from "../../svgs";
import Button from "../../button";
import clsx from "clsx";
import { H2 } from "@/utils/typography";
import Media from "react-media";

export default function Modal() {
  const {
    showModal,
    triggerModal,
    modalMessage,
    actionConfirm,
    actionCancel,
    disableOnClick,
    icon,
    type,
    children,
  } = useContext(ModalContext);

  const Icon = icon as React.FC<React.SVGProps<SVGElement>>;

  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    console.log({ type, icon, Icon: <Icon /> });
    setDomReady(true);
  }, []);
  if (domReady) {
    if (typeof window === "object") {
      return (
        <>
          {/* {showModal && ( */}
          <ClientOnlyPortal selector={"#modal"}>
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed ${
                !showModal && "hidden"
              }  top-0 left-0 z-50 flex items-center justify-center w-full h-full`}
            > */}
            <div className="z-[">
              <Overlay
                show={showModal}
                handleShowOverlay={actionCancel}
                disableOnClick={disableOnClick}
              />
            </div>
            <Media queries={{ small: { maxWidth: 640 } }}>
              {(matches) => (
                <AnimatePresence>
                  {showModal && (
                    // <div className="relative w-full bg-red-400 h-full sm:w-fit sm:h-fit">
                    <motion.div
                      className={
                        "bg-body  fixed rounded-xl p-2 pb-0 w-full sm:w-96 z-50 border h-1/2 sm:h-auto bottom-0 sm:bottom-auto sm:-translate-x-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:top-1/2"
                      }
                      transition={{ type: "keyframes", duration: 0.2 }}
                      initial={{
                        y: matches.small ? "100%" : 50,
                        opacity: matches.small ? 1 : 0,
                        left: "50%",
                        x: "-50%",
                      }}
                      animate={{
                        y: matches.small ? 0 : "-50%",
                        opacity: 1,
                        left: "50%",
                        x: "-50%",
                      }}
                      exit={{
                        y: matches.small ? "100%" : 50,
                        opacity: matches.small ? 1 : 0,
                        left: "50%",
                        x: "-50%",
                      }}
                    >
                      <div className="absolute z-50 cursor-pointer right-1 top-1">
                        <button
                          onClick={() => {
                            actionCancel()();
                          }}
                        >
                          <XClose />
                        </button>
                      </div>
                      {children ? (
                        children
                      ) : (
                        <div className="w-[95%] flex flex-col space-y-4 h-full mx-auto">
                          <div>
                            <figure
                              className={clsx(
                                "w-12 h-12 rounded-full flex items-center justify-center bg-primary/10",
                                type === "error" && "bg-red-400/10",
                                type === "warning" && "bg-yellow-400/10"
                              )}
                            >
                              {Icon && (
                                <Icon
                                  className={clsx(
                                    "!stroke-primary w-8 h-8",
                                    type === "error" && "!stroke-red-400",
                                    type === "warning" && "!stroke-yellow-400"
                                  )}
                                />
                              )}
                            </figure>
                          </div>
                          <div className="overflow-auto space-y-4 flex-1 pb-4">
                            <div>
                              <div className="font-bold text-2xl">
                                {modalMessage.title}
                              </div>
                              <div className={"break-all"}>
                                {modalMessage.text}
                              </div>
                            </div>
                            <div
                              className={
                                "flex flex-col md:flex-row-reverse gap-3 md:gap-8 mx-auto w-full justify-around"
                              }
                            >
                              <Button
                                variant="text"
                                className="border bg-primary/10 !text-primary"
                                onClick={() => {
                                  actionCancel();
                                  triggerModal({});
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => {
                                  actionConfirm();
                                  triggerModal({ show: false });
                                }}
                              >
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                    // </div>
                  )}
                </AnimatePresence>
              )}
            </Media>
            {/* </motion.div> */}
          </ClientOnlyPortal>
          {/* )} */}
        </>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}
