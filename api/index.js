// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2y_-ZJHHgtsuWx09MwVG9W5U-KcIRibw",
  authDomain: "myfirstproject-3c4e3.firebaseapp.com",
  projectId: "myfirstproject-3c4e3",
  storageBucket: "myfirstproject-3c4e3.appspot.com",
  messagingSenderId: "428057353459",
  appId: "1:428057353459:web:aa3730b986501a5cad2b86",
  measurementId: "G-MCWF8MZ7JH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;