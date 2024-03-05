// noteFunctions.js
import {
  CheckCircleIcon,
  HeartsIcon,
  Info,
  TrashIcon,
} from "@/app/components/svgs";
import { db, storage } from "@/app/config/firebase";
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

const notify = (props: TriggerNotification) => {
  store.dispatch(triggerNotification(props));
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

export const addNoteToFavorite = async (id: string) => {
  try {
    console.log("FAVOURITE_NOTE_ID: ", id);
    await updateDoc(doc(db, "notes", id), {
      type: "favourite",
    });
    notify({
      message: "Note Added To Favourites Successfully",
      type: "success",
      icon: CheckCircleIcon,
    });
  } catch (error) {
    console.error("Error Adding Note To Favourites", error);
    notify({
      message: "Operation Failed",
      type: "error",
      icon: Info,
    });
  }
};

export const addNoteToArchive = async (id: string) => {
  try {
    console.log("FAVOURITE_NOTE_ID: ", id);
    await updateDoc(doc(db, "notes", id), {
      type: "archived",
    });
    notify({
      message: "Note Added To Archive Successfully",
      type: "success",
      icon: CheckCircleIcon,
    });
  } catch (error) {
    console.error("Error Adding Note To Archive", error);
    notify({
      message: "Operation Failed",
      type: "error",
      icon: Info,
    });
  }
};

export const deleteNote = async (id: string) => {
  try {
    console.log("DELETE_RUNNING");
    // await deleteDoc(doc(db, "notes", id));
    await updateDoc(doc(db, "notes", id), {
      type: "deleted",
    });
    notify({
      message: "Note deleted Successfully",
      type: "success",
      icon: TrashIcon,
    });
  } catch (error) {
    console.error("error: ", error);
    notify({
      message: `Error Deleting Note ${id}`,
      type: "error",
      icon: TrashIcon,
    });
  }
};
