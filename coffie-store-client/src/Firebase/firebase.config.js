// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWVBf8Y2IcXVSJGWrkH_o6lwIqPdlTAuA",
  authDomain: "coffee-store-de758.firebaseapp.com",
  projectId: "coffee-store-de758",
  storageBucket: "coffee-store-de758.appspot.com",
  messagingSenderId: "888925469149",
  appId: "1:888925469149:web:1a4473c77c3acb85269e34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth