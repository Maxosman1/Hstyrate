// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD5NQbPThN7wO0vID2Uvg1fb_JCCS1l04",
  authDomain: "styrate-2ca66.firebaseapp.com",
  projectId: "styrate-2ca66",
  storageBucket: "styrate-2ca66.appspot.com",
  messagingSenderId: "56860576310",
  appId: "1:56860576310:web:0270c6c470c05a16602697",
  measurementId: "G-YH58NS4ZHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
