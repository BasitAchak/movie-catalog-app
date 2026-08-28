import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeZsj6WjMCTVxCpatAbB2pAVRmFdNnpx8",
  authDomain: "movie-catalog-app-79643.firebaseapp.com",
  projectId: "movie-catalog-app-79643",
  storageBucket: "movie-catalog-app-79643.firebasestorage.app",
  messagingSenderId: "240884032909",
  appId: "1:240884032909:web:dc7e7a6882322de399c9c4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);