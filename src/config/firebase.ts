import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTLW9RxlmqkmIqSktIXDYlXtuQllGl0bE",
  authDomain: "nextjs-firebase-auth-75c3c.firebaseapp.com",
  projectId: "nextjs-firebase-auth-75c3c",
  storageBucket: "nextjs-firebase-auth-75c3c.appspot.com",
  messagingSenderId: "981937760122",
  appId: "1:981937760122:web:d725915dea8b1e089f18c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const database = getFirestore(app);
export const storage = getStorage(app);
