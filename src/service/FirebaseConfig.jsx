// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCULFNb3Pp_nlme-0xyzkyBehXk7lJOasQ",
  authDomain: "ai-travel-planner-9b35b.firebaseapp.com",
  projectId: "ai-travel-planner-9b35b",
  storageBucket: "ai-travel-planner-9b35b.firebasestorage.app",
  messagingSenderId: "712501734479",
  appId: "1:712501734479:web:ebe8db9a1928d860940e3a",
  measurementId: "G-DWX6J2142V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);

