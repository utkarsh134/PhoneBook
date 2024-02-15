import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZiMxGpnrP7tQ9_9rCI6D7aJ9hq0vmkLI",
  authDomain: "phonebook-9fd8b.firebaseapp.com",
  projectId: "phonebook-9fd8b",
  storageBucket: "phonebook-9fd8b.appspot.com",
  messagingSenderId: "374829636995",
  appId: "1:374829636995:web:ff0eb248520ab3de13aab6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
