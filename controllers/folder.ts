// folder.ts
import {
  TrashIcon,
  InfoCircleIcon,
  CheckCircleIcon,
} from "@/app/components/svgs";
import api from "./api";
import { notify } from "@/lib/utils/helpers";

export const fetchFolders = async (): Promise<Folder[] | null> => {
  try {
    const res = await api.get(`/folders`);
    const responseData = res.data;
    console.log({ responseData });
    return responseData.data;
  } catch (error) {
    console.error("FETCH_FOLDERS", { error });
    return null;
  }
};

// NOTE: test
export const createFolder = async (name: string) => {
  try {
    if (!name) throw new Error("Invalid folder name");
    const res = await api.post("/folders", {
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
    // throw new Error("Couldn't create new folder");

    notify({
      message: "Folder Added To Favourites Successfully",
      type: "success",
      icon: CheckCircleIcon,
    });
    return responseData.data as Folder;
  } catch (error) {
    console.error("CREATE_FOLDER_FORMDATA: ", { error });
    notify({
      message: "Couldn't create new folder",
      type: "error",
      icon: InfoCircleIcon,
    });
    return null;
  }
};

export const deleteFolder = async (id: string) => {
  try {
    console.log("DELETE_RUNNING");
    // await deleteDoc(doc(db, "folders", id));
    const res = await api.delete(`/folders/${id}`);

    const responseData = await res.data;

    console.log({ responseData });

    if (!responseData.success) {
      notify({
        message: `Error Deleting Folder`,
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
      message: `Error Deleting Folder error!`,
      type: "error",
      icon: TrashIcon,
    });
    return false;
  }
};

export const deleteFolderPermanently = async (id: string) => {
  try {
    console.log("DELETE_RUNNING");
    // await deleteDoc(doc(db, "folders", id));
    const res = await api.delete(`/folders/${id}?permanent=true`);

    const responseData = await res.data;

    console.log({ responseData });

    if (!responseData.success) {
      notify({
        message: `Error Deleting Folder`,
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
      message: `Error Deleting Folder error!`,
      type: "error",
      icon: TrashIcon,
    });
    return false;
  }
};
