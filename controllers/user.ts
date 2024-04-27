import store from "@/store";
import api from "./api";
import { setUser } from "@/store/slices/auth";

export async function updateProfile(details: {
  photo: File | null;
  firstname: string;
  lastname: string;
  email: string;
}) {
  try {
    const formData = new FormData();
    formData.append("firstname", details.firstname);
    formData.append("lastname", details.lastname);
    formData.append("email", details.email);

    const imageFile = details.photo as File;
    if (imageFile && imageFile.name) {
      formData.append("photo", imageFile);
    }

    const res = await api.patch(
      `/users/${store.getState().auth.user?.uid}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important: set the content type to multipart/form-data
        },
      }
    );
    console.log("STATUS: ", res.status);

    if (res.status !== 201) return false;

    const responseData = res.data as User;

    console.log({ responseData });
    const authState = store.getState().auth;
    const currentUserDetails = authState.user;
    store.dispatch(
      setUser({
        ...authState,
        user: { ...currentUserDetails, ...responseData } as User,
      })
    );
  } catch (error) {
    console.error("UPDATE_USER_FORM-DATA: ", { error });
  }
}
