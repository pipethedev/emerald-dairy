"use client";

import { Ref, useRef, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { closeModal, triggerModal } from "@/store/slices/modal";
import { IconButton } from "..";

export default function Modal() {
  const {
    showModal,
    modalMessage,
    actionConfirm,
    actionCancel,
    disableOnClick,
    type,
    children,
  } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const cancel = () => {
    actionCancel ? actionCancel() : dispatch(closeModal());
  };

  const Icon = modalMessage?.icon as React.FC<React.SVGProps<SVGElement>>;

  const modalRef = useRef<HTMLDivElement>();

  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (domReady) {
    if (typeof window === "object") {
      return (
        <>
          {/* {showModal && ( */}
          <ClientOnlyPortal selector={"#modal"}>
            <Overlay
              show={showModal}
              handleShowOverlay={() => cancel}
              disableOnClick={disableOnClick}
              className="z-[999]"
            />
            <Media queries={{ small: { maxWidth: 640 } }}>
              {(matches) => (
                <AnimatePresence>
                  {showModal && (
                    // <div className="relative w-full bg-red-400 h-full sm:w-fit sm:h-fit">
                    <motion.div
                      ref={modalRef as Ref<HTMLDivElement>}
                      className={
                        "bg-body fixed rounded-xl w-full sm:w-96 z-[999] border h-3/5 sm:h-auto bottom-0 sm:bottom-auto sm:-translate-x-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:top-1/2 overflow-clip before:w-16 before:h-1 before:rounded-3xl before:bg-gray-200 before:mx-auto before:z-[1000] before:absolute before:inset-0 before:mt-3 md:before:hidden"
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
                      drag="y"
                      dragElastic={
                        {
                          // bottom: 0.5,
                          // top: 0.5,
                        }
                      }
                      dragDirectionLock={true}
                      dragConstraints={{ left: 0, right: 0, top: 0 }}
                      onDragEnd={(e: PointerEvent, info) => {
                        const offset = info.offset.y;

                        if (offset > 100) {
                          cancel();
                        }
                      }}
                    >
                      <div className="absolute z-[999] cursor-pointer right-1 top-1">
                        <IconButton
                          icon={XClose}
                          onClick={() => {
                            cancel();
                          }}
                        />
                      </div>
                      <div className="p-2 h-full pt-6 pb-4 flex flex-col">
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
                            <div className="overflow-auto overscroll-none space-y-4 flex-1 pb-4">
                              <div>
                                <div className="font-bold text-2xl">
                                  {modalMessage?.title}
                                </div>
                                <div className={"break-word"}>
                                  {modalMessage?.text}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div
                          className={
                            "flex flex-col-reverse md:flex-row gap-3 md:gap-8 mx-auto w-full justify-around mt-auto"
                          }
                        >
                          <Button
                            className="border bg-primary/10 !text-primary"
                            onClick={() => {
                              cancel();
                            }}
                          >
                            Cancel
                          </Button>
                          {actionConfirm && (
                            <Button
                              onClick={() => {
                                actionConfirm();
                                triggerModal({ show: false });
                              }}
                            >
                              Confirm
                            </Button>
                          )}
                        </div>
                      </div>
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
