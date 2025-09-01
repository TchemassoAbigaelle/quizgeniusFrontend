// src/auth/AuthContext.js
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  const signOut = () => {
    firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
