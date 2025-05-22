import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBbBkLCE8wpEkQQmfNm2YC3AYbh95QUMhQ",
    authDomain: "ics4u-3b915.firebaseapp.com",
    projectId: "ics4u-3b915",
    storageBucket: "ics4u-3b915.firebasestorage.app",
    messagingSenderId: "134316000639",
    appId: "1:134316000639:web:d8d2f2cee6ccb01104464a"
};

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };