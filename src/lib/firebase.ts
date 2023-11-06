// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fullstack-blog-anjas.firebaseapp.com",
  projectId: "fullstack-blog-anjas",
  storageBucket: "fullstack-blog-anjas.appspot.com",
  messagingSenderId: "641975286356",
  appId: "1:641975286356:web:5dfffcb2b4dc4370440bc1",
  measurementId: "G-L8YBLHJQVR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
