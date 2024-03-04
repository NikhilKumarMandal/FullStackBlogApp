// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-2d994.firebaseapp.com",
  projectId: "mern-auth-2d994",
  storageBucket: "mern-auth-2d994.appspot.com",
  messagingSenderId: "15655139137",
  appId: "1:15655139137:web:60d3b7e8a8670f030153c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);