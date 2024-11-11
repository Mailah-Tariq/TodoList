// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOpLQ218-MtLnXmUHobJvqhXewzylQu6E",
  authDomain: "multi-todo-list-3efa3.firebaseapp.com",
  projectId: "multi-todo-list-3efa3",
  storageBucket: "multi-todo-list-3efa3.firebasestorage.app",
  messagingSenderId: "327480752515",
  appId: "1:327480752515:web:3674a855cf25a354d45eb6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };