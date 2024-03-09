// noteFunctions.js
import {
  CheckCircleIcon,
  HeartsIcon,
  Info,
  InfoCircleIcon,
  TrashIcon,
} from "@/app/components/svgs";
import { db, storage } from "@/lib/firebase/firebase-client";
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

export const fetchNotes = async (type: string): Promise<Note[] | null> => {
  try {
    const res = await fetch(`/api/notes?type=${type}`);
    const responseData = await res.json();
    console.log({ responseData });
    return responseData.data;
  } catch (error) {
    console.error("FETCH_N0TES", { error });
    return null;
  }
};

// Function to create a new note with image in the Firestore database and upload the image to Firebase Storage
export const createNoteWithImage = async (
  title: string,
  content: (Content & { value: File | string })[],
  imageFile: any
) => {
  try {
    for (const item of content) {
      if (item.type === "image") {
        const imageFile = item.value as File;
        console.log("UPLOAD", { imageFile });
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, "images/" + imageFile.name);
        // imageFile.name
        await uploadBytes(storageRef, imageFile);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);
        console.log({ imageUrl });
        item.value = imageUrl;
      }
    }

    // Add the note to the Firestore database
    const docRef = await addDoc(collection(db, "notes"), {
      // id: uuidV4(),
      title: title,
      content: content,
      timestamp: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// NOTE: test
export const createNoteAsFormData = async (
  title: string,
  content: (Content & { value: File | string })[]
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);

    const contentCopy = [];

    for (const [index, item] of content.entries() as any) {
      console.log({ index, item });
      let itemCopy = { ...item };
      console.log("CREATE_IS-URL: ", isURL(itemCopy.value.toString()));
      if (
        itemCopy.type === "image" ||
        (itemCopy.type === "video" && !isURL(itemCopy.value.toString()))
      ) {
        console.log("IMAGE_VALUE", item.value);
        const imageFile = itemCopy.value as File;
        if (imageFile && imageFile.name) {
          itemCopy = { ...itemCopy, value: index };
          console.log("UPLOAD", { imageFile });
          formData.append(`file-${index}`, imageFile);
        }
      }

      contentCopy.push(itemCopy);
    }

    formData.append("content", JSON.stringify(contentCopy));

    const res = await fetch("/api/notes", {
      method: "POST",
      body: formData,
    });
    const responseData = await res.json();

    console.log({ responseData });
  } catch (error) {
    console.error("CREATE_N0TE_FORMDATA: ", { error });
  }
};

export const editNoteAsFormData = async (
  {
    content,
    title,
  }: {
    title: string;
    content: (Content & { value: File | string })[];
  },
  id: string
) => {
  try {
    console.log("editNoteAsFormData:ID=> ", id);
    if (!id) throw new Error("Invalid note Id");

    const formData = new FormData();
    formData.append("title", title);

    const contentCopy = [];

    for (const [index, item] of content.entries() as any) {
      console.log({ index, item });
      let itemCopy = { ...item };
      console.log("CREATE_IS-URL: ", isURL(itemCopy.value.toString()));
      if (
        itemCopy.type === "image" ||
        (itemCopy.type === "video" && !isURL(itemCopy.value.toString()))
      ) {
        console.log("IMAGE_VALUE", item.value);
        const imageFile = itemCopy.value as File;
        if (imageFile && imageFile.name) {
          itemCopy = { ...itemCopy, value: index };
          console.log("UPLOAD", { imageFile });
          formData.append(`file-${index}`, imageFile);
        }
      }

      contentCopy.push(itemCopy);
    }

    formData.append("content", JSON.stringify(contentCopy));

    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      body: formData,
    });
    const responseData = await res.json();

    console.log({ responseData });
  } catch (error) {
    console.error("EDIT_N0TE_FORM-DATA: ", { error });
  }
};

export const addNoteToFavorite = async (id: string): Promise<boolean> => {
  try {
    console.log("FAVOURITE_NOTE_ID: ", id);

    const res = await fetch(`/api/notes/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: "favourite",
      }),
    });

    const responseData = await res.json();

    console.log({ responseData });

    if (!responseData.success) {
      notify({
        message: "Failed  To Add Note to Favourites",
        type: "error",
        icon: InfoCircleIcon,
      });
      return false;
    }

    notify({
      message: "Note Added To Favourites Successfully",
      type: "success",
      icon: CheckCircleIcon,
    });
    return true;
  } catch (error) {
    console.error("Error Adding Note To Favourites", error);
    notify({
      message: "Operation Failed",
      type: "error",
      icon: Info,
    });
    return false;
  }
};

export const addNoteToArchive = async (id: string): Promise<boolean> => {
  try {
    console.log("ARCHIVE_NOTE_ID: ", id);

    const res = await fetch(`/api/notes/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: "archived",
      }),
    });

    const responseData = await res.json();

    console.log({ responseData });

    if (!responseData.success) {
      notify({
        message: "Failed To Archive Note",
        type: "error",
        icon: InfoCircleIcon,
      });
      return false;
    }

    notify({
      message: "Note Added To Archive Successfully",
      type: "success",
      icon: CheckCircleIcon,
    });
    return true;
  } catch (error) {
    console.error("Error Adding Note To Archive", error);
    notify({
      message: "Operation Failed",
      type: "error",
      icon: Info,
    });
    return false;
  }
};

export const deleteNote = async (id: string) => {
  try {
    console.log("DELETE_RUNNING");
    // await deleteDoc(doc(db, "notes", id));
    const res = await fetch(`/api/notes/${id}?permanent=false`, {
      method: "DELETE",
    });

    const responseData = await res.json();

    console.log({ responseData });

    if (!responseData.success) {
      notify({
        message: `Error Deleting Note`,
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
      message: `Error Deleting Note error!`,
      type: "error",
      icon: TrashIcon,
    });
    return false;
  }
};

export const deleteNotePermanently = async (id: string) => {
  try {
    console.log("DELETE_RUNNING");
    // await deleteDoc(doc(db, "notes", id));
    const res = await fetch(`/api/notes/${id}?permanent=true`, {
      method: "DELETE",
    });

    const responseData = await res.json();

    console.log({ responseData });

    if (!responseData.success) {
      notify({
        message: `Error Deleting Note`,
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
      message: `Error Deleting Note error!`,
      type: "error",
      icon: TrashIcon,
    });
    return false;
  }
};
