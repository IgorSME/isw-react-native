// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { AppState } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAmrJTIn7alGwNrEFsstEanf8KZQkKV3HI",
  authDomain: "rn-insta-e9b83.firebaseapp.com",
  projectId: "rn-insta-e9b83",
  storageBucket: "rn-insta-e9b83.appspot.com",
  messagingSenderId: "522785158140",
  appId: "1:522785158140:web:cecd9cf83e1ddf2d4cf879",
  measurementId: "G-6Q7DG91T6S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
