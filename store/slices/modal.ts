import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertCircle } from "@/app/components/svgs";

const initialModalState: ModalState = {
  showModal: false,
  modalMessage: {
    text: "",
    title: "",
    icon: AlertCircle,
  },
  disableOnClick: true,
  type: "info",
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    triggerModal: (state, action: PayloadAction<TriggerModal>) => {
      const {
        message,
        confirm,
        cancel,
        clickToDisable,
        show,
        type = "info",

        children,
      } = action.payload;

      console.log("TRIGGER_MODAL: ", action.payload);

      return {
        ...state,
        showModal: show !== undefined ? show : !state.showModal,
        actionCancel:
          typeof cancel === "function" ? cancel : state.actionCancel,
        disableOnClick:
          typeof clickToDisable === "boolean"
            ? clickToDisable
            : state.disableOnClick,
        actionConfirm:
          typeof confirm === "function" ? confirm : state.actionConfirm,
        children,
        modalMessage: message,
        type,
      };
    },

    closeModal() {
      return initialModalState;
    },
  },
});

export const { triggerModal, closeModal } = modalSlice.actions;
export default modalSlice;
