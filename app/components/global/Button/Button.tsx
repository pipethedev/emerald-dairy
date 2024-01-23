"use client";
import React, { useContext } from "react";
import useButtonStyle from "@/hooks/useButtonStyle";
import Spinner from "../Spinner";
import { ButtonProps } from "./types";
import { ModalContext, NotificationContext } from "@/context";
import { AlertCircle } from "../../svgs";

const Button = ({
  children,
  className,
  onClick,
  full,
  color,
  text,
  disabled,
  loading,
  test = "notification",
}: ButtonProps) => {
  const { triggerNotification } = useContext(NotificationContext);
  const { triggerModal, closeModal } = useContext(ModalContext);

  const btnStyles = useButtonStyle({
    full,
    color,
    text,
    disabled: disabled !== undefined && disabled,
  });

  if (!onClick) {
    if (test === "notification") {
      onClick = () => triggerNotification("Testing Notification");
    } else {
      onClick = () =>
        triggerModal({
          cancel: () => closeModal,
          confirm: () => triggerNotification("Modal Confirmed"),
          message: {
            title: "Confirm",
            text: (
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur, atque at. Voluptas totam voluptate necessitatibus.
                Recusandae nam, pariatur quae commodi esse dolor facere quis
                libero, tempore odit, fuga neque quia!
              </p>
            ),
          },
        });
    }
  }

  return (
    <button
      onClick={() => onClick && onClick()}
      disabled={disabled}
      className={btnStyles + " " + className}
    >
      {loading ? <Spinner size="small" color="body" /> : children}
    </button>
  );
};

export default Button;
