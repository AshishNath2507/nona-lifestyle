import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG5ZrYhD5jI2Jv_QlVXebnlM-jKMJwOMk",
  authDomain: "nona-lifestyle-react.firebaseapp.com",
  databaseURL: "https://nona-lifestyle-react-default-rtdb.firebaseio.com",
  projectId: "nona-lifestyle-react",
  storageBucket: "nona-lifestyle-react.appspot.com",
  messagingSenderId: "188945295232",
  appId: "1:188945295232:web:a53bc92f0d12a7f89ec365",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
