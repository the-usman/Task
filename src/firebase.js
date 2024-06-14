// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA0F4EG9iw65pDbsyjD7UG67DgkXILdo7s",
    authDomain: "taskproject-1dd7d.firebaseapp.com",
    projectId: "taskproject-1dd7d",
    storageBucket: "taskproject-1dd7d.appspot.com",
    messagingSenderId: "1072385071729",
    appId: "1:1072385071729:web:9f782b00364bcd8b8a59d0",
    measurementId: "G-QRPPGTSXGR"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);