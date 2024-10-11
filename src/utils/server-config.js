// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsTrmj3WHQp3yxcRTqrl_ZVOf_evdehgw",
  authDomain: "speakeasy-30630.firebaseapp.com",
  projectId: "speakeasy-30630",
  storageBucket: "speakeasy-30630.appspot.com",
  messagingSenderId: "620754766904",
  appId: "1:620754766904:web:feaf49f55931d703a72acd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);