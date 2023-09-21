// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAkKircTUSh2PfPBXZ1WJsIoNm2T9Bb_8E",
  authDomain: "gtao-75851.firebaseapp.com",
  projectId: "gtao-75851",
  storageBucket: "gtao-75851.appspot.com",
  messagingSenderId: "765453959006",
  appId: "1:765453959006:web:53554d30da3770a78319cf",
  measurementId: "G-L70H5BFM4S"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const storage = getStorage(app);