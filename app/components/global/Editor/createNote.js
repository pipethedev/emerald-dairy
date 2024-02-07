// createNote.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

// Function to create a new note
const createNote = async (title, content) => {
  try {
    console.log("Before creating note");
    // Get a reference to the 'notes' collection
    const notesCollection = collection(db, "notes");

    // Add a new document with a generated ID
    const newNoteRef = await addDoc(notesCollection, {
      title,
      content,
      timestamp: new Date(), // You can add a timestamp for sorting or other purposes
    });

    console.log("Note added with ID: ", newNoteRef.id);
    return newNoteRef.id; // Return the ID of the newly created note if needed
  } catch (error) {
    console.error("Error adding note: ", error);
    throw error; // You might want to handle errors in your application
  }
};

export { createNote };
