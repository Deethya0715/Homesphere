// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Correct modular imports for auth
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5-UOiyXj_xZHnQwbC8r6GPBKq3K2wuMs",
  authDomain: "homesphere-cf28f.firebaseapp.com",
  projectId: "homesphere-cf28f",
  storageBucket: "homesphere-cf28f.firebasestorage.app",
  messagingSenderId: "947343777414",
  appId: "1:947343777414:web:7fb0a0fe17c560685e3b07",
  measurementId: "G-L6GWR59J6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services
export { auth, db, storage, onAuthStateChanged };
