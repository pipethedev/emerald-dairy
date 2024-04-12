"use client"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdRX5uX8HqUN5Vzugr8Hjw2xTVWMkqe5M",
  authDomain: "emerald-diary.firebaseapp.com",
  projectId: "emerald-diary",
  storageBucket: "emerald-diary.appspot.com",
  messagingSenderId: "1048143865347",
  appId: "1:1048143865347:web:6c26e6bc4eb70e6a115036",
  measurementId: "G-17WS4P9QPS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, auth, db, storage };
