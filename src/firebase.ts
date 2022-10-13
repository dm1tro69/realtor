// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "realtor-react-52206.firebaseapp.com",
    projectId: "realtor-react-52206",
    storageBucket: "realtor-react-52206.appspot.com",
    messagingSenderId: "246229824130",
    appId: "1:246229824130:web:c80e741e5b49080777ba9b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)


