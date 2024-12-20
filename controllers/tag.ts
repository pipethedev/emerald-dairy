import {
  TrashIcon,
  InfoCircleIcon,
  CheckCircleIcon,
} from "@/app/components/svgs";
import api from "./api";
import { notify } from "@/lib/utils/helpers";

export const fetchTags = async (): Promise<Tag[] | null> => {
  try {
    const res = await api.get(`/tags`);
    const responseData = res.data;
    console.log({ responseData });
    return responseData.data;
  } catch (error) {
    console.error("FETCH_TAGS", { error });
    return null;
  }
};

// NOTE: test
export const createTag = async (name: string) => {
  try {
    if (!name) throw new Error("Invalid tag name");
    const res = await api.post("/tags", {
      name,
    });
    const responseData = res.data;

    console.log({ responseData });

    if (!responseData.success) {
      notify({
        message: responseData.message,
        type: "error",
        icon: CheckCircleIcon,
      });
      return null;
    }
    // throw new Error("Couldn't create new tag");

    notify({
      message: "Tag Added To Favourites Successfully",
      type: "success",
      icon: CheckCircleIcon,
    });
    return responseData.data as Tag;
  } catch (error) {
    console.error("CREATE_TAG_FORMDATA: ", { error });
    notify({
      message: "Couldn't create new tag",
      type: "error",
      icon: InfoCircleIcon,
    });
    return null;
  }
};

export const deleteTag = async (id: string) => {
  try {
    console.log("DELETE_RUNNING");
    // await deleteDoc(doc(db, "tags", id));
    const res = await api.delete(`/tags/${id}`);

    const responseData = await res.data;

    console.log({ responseData });

    if (!responseData.success) {
      notify({
        message: `Error Deleting Tag`,
        type: "error",
        icon: TrashIcon,
      });
      return false;
    }

    notify({
      message: responseData.message,
      type: "success",
      icon: TrashIcon,
    });
    return true;
  } catch (error) {
    console.error("error: ", error);
    notify({
      message: `Error Deleting Tag error!`,
      type: "error",
      icon: TrashIcon,
    });
    return false;
  }
};

export const deleteTagPermanently = async (id: string) => {
  try {
    console.log("DELETE_RUNNING");
    // await deleteDoc(doc(db, "tags", id));
    const res = await api.delete(`/tags/${id}?permanent=true`);

    const responseData = res.data;

    console.log({ responseData });

    if (!responseData.success) {
      notify({
        message: `Error Deleting Tag`,
        type: "error",
        icon: TrashIcon,
      });
      return false;
    }

    notify({
      message: responseData.message,
      type: "success",
      icon: TrashIcon,
    });
    return true;
  } catch (error) {
    console.error("error: ", error);
    notify({
      message: `Error Deleting Tag error!`,
      type: "error",
      icon: TrashIcon,
    });
    return false;
  }
};
