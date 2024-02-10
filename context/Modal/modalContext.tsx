"use client";

import { AlertCircle } from "@/app/components/svgs";
import React, { createContext, useState } from "react";
// import { ModalContextType, triggerModalType } from "../types";

const ModalContext = createContext<
  ModalContextType & {
    triggerModal({
      message,
      confirm,
      cancel,
      clickToDisable,
    }: triggerModalType): void;
    closeModal(): void;
  }
>({
  showModal: false,
  triggerModal() {},
  modalMessage: {
    text: "",
    title: "",
  },
  actionConfirm() {},
  actionCancel() {},
  disableOnClick: true,
  icon: AlertCircle,
  type: "warning",
  closeModal() {},
});

const initialModalState: ModalContextType = {
  showModal: false,
  actionConfirm() {},
  actionCancel() {},
  modalMessage: { text: "", title: "" },
  disableOnClick: true,
  icon: AlertCircle,
  type: "info",
};

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalState, setModalState] =
    useState<ModalContextType>(initialModalState);

  const triggerModal = ({
    message,
    confirm,
    cancel,
    clickToDisable,
    show,
    type,
    icon = AlertCircle,
    children,
  }: triggerModalType) => {
    console.log("Triggered");

    show !== undefined
      ? setModalState((prev) => ({ ...prev, showModal: show }))
      : modalState.showModal
      ? setModalState((prev) => ({ ...prev, showModal: false }))
      : setModalState((prev) => ({ ...prev, showModal: true }));

    cancel &&
      typeof cancel === "function" &&
      setModalState((prev) => ({ ...prev, actionCancel: cancel }));

    typeof clickToDisable === "boolean" &&
      setModalState((prev) => ({ ...prev, disableOnClick: clickToDisable }));

    confirm &&
      typeof confirm === "function" &&
      setModalState((prev) => ({ ...prev, actionConfirm: confirm }));

    if (children) return setModalState((prev) => ({ ...prev, children }));

    message &&
      setModalState((prev) => ({ ...prev, modalMessage: message, type, icon }));
  };

  const closeModal = () => {
    console.log("CLOSE MODAL");
    setModalState(initialModalState);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal: modalState.showModal,
        triggerModal,
        modalMessage: modalState.modalMessage,
        actionConfirm: modalState.actionConfirm,
        actionCancel: modalState.actionCancel,
        disableOnClick: modalState.disableOnClick,
        type: modalState.type,
        icon: modalState.icon,
        closeModal,
        children: modalState.children,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
