// noteFunctions.js
import { db, storage } from "../../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidV4 } from "uuid";

// Function to create a new note with image in the Firestore database and upload the image to Firebase Storage
const createNoteWithImage = async (
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
      id: uuidV4(),
      title: title,
      content: content,
      timestamp: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { createNoteWithImage };
