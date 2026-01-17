import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // 🔥 Firestore profile
  const [loading, setLoading] = useState(true);
  // 🔐 Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // 🔥 fetch role/profile
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setUserData(userDoc.exists() ? userDoc.data() : null);
        console.log(userDoc.data().role)
       
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🆕 REGISTER USER
  const registerUser = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name,
      role: "user", //  default role
      createdAt: serverTimestamp(),
    });

    return user;
  };

  // 🔐 LOGIN
  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  


  // 🚪 LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        registerUser,
        loginUser,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
