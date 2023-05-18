import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const FirebaseKeys = {
    
      apiKey: "AIzaSyCFS3YqoFRZLYnBJzLN9dL8ugXn1_yBYSA",
    authDomain: "airlibre-9c426.firebaseapp.com",
    databaseURL: "https://airlibre-9c426.firebaseio.com",
    projectId: "airlibre-9c426",
    storageBucket: "airlibre-9c426.appspot.com",
    messagingSenderId: "62824552496",
    appId: "1:62824552496:web:281a39bdfbe36648d0b5f5",
    measurementId: "G-50F0VRXX17"
  }
  if (!getApps().length) {
    initializeApp(FirebaseKeys);
}


export const auth = getAuth();
export default FirebaseKeys;