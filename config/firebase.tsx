// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDd7LsiapWqV-tGkqsyfVhmKU7DgzX8iU",
  authDomain: "nextjs-shaye.firebaseapp.com",
  projectId: "nextjs-shaye",
  storageBucket: "nextjs-shaye.appspot.com",
  messagingSenderId: "1053483859893",
  appId: "1:1053483859893:web:7a022b8fe22c39955663fc",
  measurementId: "G-QE2BBZW8HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  auth=getAuth()

export const  storage=getStorage()
export const db=getFirestore()