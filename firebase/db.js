import firebase from "firebase/compat/app";
import 'firebase/firestore';
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCFS3YqoFRZLYnBJzLN9dL8ugXn1_yBYSA",
    authDomain: "airlibre-9c426.firebaseapp.com",
    databaseURL: "https://airlibre-9c426.firebaseio.com",
    projectId: "airlibre-9c426",
    storageBucket: "airlibre-9c426.appspot.com",
    messagingSenderId: "62824552496",
    appId: "1:62824552496:web:281a39bdfbe36648d0b5f5",
    measurementId: "G-50F0VRXX17"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export default db;