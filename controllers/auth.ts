import api from "./api";
import { store } from "@/store";
import { notify } from "@/lib/utils/helpers";
import { clearUser } from "@/store/slices/auth";
import { InfoCircleIcon } from "@/app/components/svgs";

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
