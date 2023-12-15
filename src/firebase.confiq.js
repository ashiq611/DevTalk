// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQSxpKYCuyiY1y6Y5X6oG4WYnGWWB7HVw",
  authDomain: "devtalk-b41ed.firebaseapp.com",
  projectId: "devtalk-b41ed",
  storageBucket: "devtalk-b41ed.appspot.com",
  messagingSenderId: "784128334080",
  appId: "1:784128334080:web:d141d7402c215e0a593be5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);
export { fireDB, auth, storage };