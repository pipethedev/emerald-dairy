import { InfoCircleIcon } from "@/app/components/svgs";
import { auth } from "@/lib/firebase/firebase-client";
import { notify } from "@/lib/utils/helpers";
import { signOut } from "firebase/auth";

export const logOut = async () => {
  try {
    await signOut(auth);
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
