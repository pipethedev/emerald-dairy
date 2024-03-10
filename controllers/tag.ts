// tagFunctions.js
import {
  CheckCircleIcon,
  HeartsIcon,
  Info,
  InfoCircleIcon,
  TrashIcon,
} from "@/app/components/svgs";
// import { db, storage } from "@/lib/firebase/firebase-client";
import { isURL, notify } from "@/lib/utils/helpers";
import store from "@/store";
import { triggerModal } from "@/store/slices/modal";
import { triggerNotification } from "@/store/slices/notification";
import {
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidV4 } from "uuid";

export const fetchTags = async (type: string): Promise<Tag[] | null> => {
  try {
    const res = await fetch(`/api/tags`);
    const responseData = await res.json();
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
    const res = await fetch("/api/tags", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const responseData = await res.json();

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
    const res = await fetch(`/api/tags/${id}`, {
      method: "DELETE",
    });

    const responseData = await res.json();

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
    const res = await fetch(`/api/tags/${id}?permanent=true`, {
      method: "DELETE",
    });

    const responseData = await res.json();

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
