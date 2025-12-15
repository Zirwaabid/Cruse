import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCzVUVVCQUaDHSGs0S9ILE1rM8m3iW6Vo4",
  authDomain: "cruse-d5eba.firebaseapp.com",
  projectId: "cruse-d5eba",
  storageBucket: "cruse-d5eba.firebasestorage.app",
  messagingSenderId: "145816572184",
  appId: "1:145816572184:web:3b2a2cd047e2de887a8e6d",
  measurementId: "G-J18Q0BVQT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔑 Initialize Auth
export const auth = getAuth(app);

// (Optional) export app if needed later
export default app;