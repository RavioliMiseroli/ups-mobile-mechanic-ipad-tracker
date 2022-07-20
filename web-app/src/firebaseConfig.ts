// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS5WLP6HJbozahARenE476OhzpXhSFiTk",
  authDomain: "gcp-hackathon-22-5.firebaseapp.com",
  projectId: "gcp-hackathon-22-5",
  storageBucket: "gcp-hackathon-22-5.appspot.com",
  messagingSenderId: "365434160477",
  appId: "1:365434160477:web:de068bf2427367a0c9d4b4",
  firebaseUrl: "https://gcp-hackathon-22-5-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = firebase.auth();
export const auth = getAuth(app);
export const database = getDatabase(app);
