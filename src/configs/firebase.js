// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD0oLKrGS_oPNsLypNRVn7Rq58PwyYTXc",
  authDomain: "devgram-fc5fc.firebaseapp.com",
  projectId: "devgram-fc5fc",
  storageBucket: "devgram-fc5fc.firebasestorage.app",
  messagingSenderId: "899917472804",
  appId: "1:899917472804:web:0ff265e2adb8b17b74e4b1",
  measurementId: "G-6C8MY1XYD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(app);
const gitHubProvider = new GithubAuthProvider();
const db = getFirestore(app);

export {app, auth, googleProvider, db, gitHubProvider}