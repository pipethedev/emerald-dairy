// MODAL
type ModalState = {
  showModal: boolean;
  modalMessage?: {
    title: string | React.ReactNode;
    text: string | React.ReactNode;
    icon?: React.FC<React.SVGProps<SVGElement>>;
  };
  actionConfirm?: Function;
  actionCancel?: Function;
  disableOnClick: boolean;
  children?: React.ReactNode | JSX.Element;
  type?: "info" | "error" | "warning" | "success";
};

type TriggerModal = {
  message?: ModalState["modalMessage"];
  confirm?: Function;
  cancel?: Function;
  clickToDisable?: boolean;
  show?: boolean;
  type?: ModalState["type"];
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
