// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCu1Gkctv0fv9YT3Pohf3GPb5ux6bqQY4w",
  authDomain: "quizgenius-ccdc7.firebaseapp.com",
  projectId: "quizgenius-ccdc7",
  storageBucket: "quizgenius-ccdc7.firebasestorage.app",
  messagingSenderId: "789582500615",
  appId: "1:789582500615:web:11ba11d0135877977f2ba2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
