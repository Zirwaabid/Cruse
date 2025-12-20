import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY,
  authDomain: "cruse-native.firebaseapp.com",
  projectId: "cruse-native",
  storageBucket: "cruse-native.firebasestorage.app",
  messagingSenderId: "1072524532866",
  appId: "1:1072524532866:web:59a92cf4bbc1a6fb6fa89b",
  measurementId: "G-Q8D5B13ZN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔑 Initialize Auth
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore(app);
// (Optional) export app if needed later
export default app;