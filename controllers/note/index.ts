// noteFunctions.js
import { HeartsIcon, TrashIcon } from "@/app/components/svgs";
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

export const deleteNote = async (id: string) => {
  try {
    console.log("DELETE_RUNNING");
    await deleteDoc(doc(db, "notes", id));
    notify({
      message: "Note deleted Successfully",
      type: "success",
      icon: TrashIcon,
    });
  } catch (error) {
    console.error("error: ", error);
    notify({
      message: "Error Deleting Note",
      type: "error",
      icon: TrashIcon,
    });
  }
};
