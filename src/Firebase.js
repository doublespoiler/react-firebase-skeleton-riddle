import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCrgXFy6w1ZOfuGK9dzmYQIeJKk7PvMaVg",
  authDomain: "react-riddle-adventure.firebaseapp.com",
  projectId: "react-riddle-adventure",
  storageBucket: "react-riddle-adventure.appspot.com",
  messagingSenderId: "1013449627463",
  appId: "1:1013449627463:web:59791d1975f66a99931e62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;