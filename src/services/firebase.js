// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { metaData, UserStore } from "../store";


const firebaseConfig = {
  apiKey: "AIzaSyAUgTuRnaknXSEjQ2_7_m7ytkJXXjx0tUI",
  authDomain: "svelte-shop-14ad8.firebaseapp.com",
  projectId: "svelte-shop-14ad8",
  storageBucket: "svelte-shop-14ad8.appspot.com",
  messagingSenderId: "130379053639",
  appId: "1:130379053639:web:8aa74524c012330c3e8f62",
  measurementId: "G-8825FQG0E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const auth = getAuth();
const db = getFirestore(app);
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logOut = () => signOut(auth);


export const getMetaData = async (userId) => {
  const docs = doc(db, "metadata", userId);
  const querySnapshot = await getDoc(docs);
  return querySnapshot.data().metadata; // Return the metadata
};



export const insertUserData = async (userId, data) => {
  try {
    const docs = doc(db, "metadata", userId );
    const docRef = await setDoc(docs, data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};



