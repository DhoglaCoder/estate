import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy8duX1sUVO2cQgn7ruPdYPlVK3cKTghE",
  authDomain: "estate-react-app-9c9b2.firebaseapp.com",
  projectId: "estate-react-app-9c9b2",
  storageBucket: "estate-react-app-9c9b2.firebasestorage.app",
  messagingSenderId: "170874099613",
  appId: "1:170874099613:web:6c0afb55dd6082503e8174",
  measurementId: "G-SEDWWVKF4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();
export const db = getFirestore(app);
export default app;
