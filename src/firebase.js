// Import fungsi yang dibutuhkan
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <--- INI YANG KURANG TADI

// Konfigurasi Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyA-6BKu0cBaMUugJQuYupZ3SVRjIA-3oXA",
  authDomain: "ta-ppb-small-wins-board.firebaseapp.com",
  projectId: "ta-ppb-small-wins-board",
  storageBucket: "ta-ppb-small-wins-board.firebasestorage.app",
  messagingSenderId: "458814160498",
  appId: "1:458814160498:web:dee5ecb78aa39718610ceb",
  measurementId: "G-67246L295F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore dan Export
export const db = getFirestore(app);