// MODAL
type ModalContextType = {
  showModal: boolean;
  modalMessage: {
    title: string | React.ReactNode;
    text: string | React.ReactNode;
  };
  actionConfirm: Function;
  actionCancel: Function;
  disableOnClick: boolean;
  type?: "info" | "error" | "warning";
  icon?: React.FC<React.SVGProps<SVGElement>>;
};

type triggerModalType = {
  message?: ModalContextType["modalMessage"];
  confirm?: Function;
  cancel?: Function;
  clickToDisable?: boolean;
  show?: boolean;
  type?: ModalContextType["type"];
  icon?: ModalContextType["icon"];
};

// NOTIFICATION
type NotificationContextType = {
  showNotification: boolean;
  triggerNotification: Function;
  notificationMessage: string | React.ReactNode;
};
