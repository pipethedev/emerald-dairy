// MODAL
type ModalState = {
  showModal: boolean;
  modalMessage?: {
    title: string | React.ReactNode;
    text: string | React.ReactNode;
  };
  actionConfirm?: Function;
  actionCancel?: Function;
  disableOnClick: boolean;
  children?: React.ReactNode;
  type?: "info" | "error" | "warning" | "success";
  icon?: React.FC<React.SVGProps<SVGElement>>;
};

type TriggerModal = {
  message?: ModalState["modalMessage"];
  confirm?: Function;
  cancel?: Function;
  clickToDisable?: boolean;
  show?: boolean;
  type?: ModalState["type"];
  icon?: ModalState["icon"];
  children?: ModalState["children"];
};

type TriggerNotification = {
  message?: string | React.ReactNode;
  show?: boolean;
  type?: ModalState["type"];
  icon?: React.FC<React.SVGProps<SVGElement>>;
};

// NOTIFICATION
type NotificationState = TriggerNotification;
