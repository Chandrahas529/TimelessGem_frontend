// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAa3nYokYdZTkAdvO33-7TV-sVU8vMPuDQ",
    authDomain: "timelessgem-d5f0b.firebaseapp.com",
    projectId: "timelessgem-d5f0b",
    storageBucket: "timelessgem-d5f0b.appspot.com",
    messagingSenderId: "365303689757",
    appId: "1:365303689757:web:abd2a3e6db78c3b002ccf4"
  };
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)