// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "blog-app-6565d.firebaseapp.com",
  projectId: "blog-app-6565d",
  storageBucket: "blog-app-6565d.appspot.com",
  messagingSenderId: "458049222183",
  appId: "1:458049222183:web:56ecc0cc29ad9a407b4002"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);