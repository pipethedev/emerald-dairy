import { InfoCircleIcon } from "@/app/components/svgs";
import { auth } from "@/lib/firebase/firebase-client";
import { notify } from "@/lib/utils/helpers";
import { signOut } from "firebase/auth";
import api from "./api";
import store from "@/store";
import { clearUser } from "@/store/slices/auth";

export const logOut = async () => {
  try {
    // const response = await fetch("/api/auth/sign-out", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    const response = await api.post("/auth/sign-out", {});
    console.log("LOGOUT: ", { response: response.data });

    store.dispatch(clearUser());

    // signOut(auth);

    notify({
      message: "Logged out",
      type: "success",
      icon: InfoCircleIcon,
    });
    return true;
  } catch (error) {
    console.error("LOGOUT_ERROR: ", { error });
    notify({
      message: "Unable to logout at the moment",
      type: "error",
      icon: InfoCircleIcon,
    });
    return false;
  }
};

export async function changePassword(newPassword: string) {
  try {
    const response = await api.post("/auth/change-password", {
      newPassword,
    });
    const data = await response.data;

    if (data.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error Changing Password", error);
    return false;
  }
}
