import React, { createContext } from 'react';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FirebaseKeys from '../firebase/config';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const FirebaseContext = createContext();



function onAuthStateChange() {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // L'utilisateur est connecté, vous pouvez enregistrer des données d'authentification
      await ReactNativeAsyncStorage.setItem('authToken', 'token_d_utilisateur');
      console.log("L'utilisateur est connecté");
    } else {
      // L'utilisateur est déconnecté, vous pouvez supprimer les données d'authentification
      await ReactNativeAsyncStorage.removeItem('authToken');
      console.log("L'utilisateur est déconnecté");
    }
  });
}

const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(FirebaseKeys);

const db = firebase.firestore();
export const dbb = getFirestore(firebaseApp);
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const Firebase = {
  getCurrentUser: () => {
    return auth.currentUser;
  },

  createUser: async (userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;
      const token = await user.getIdToken(); // Obtenir le token d'identification
      await ReactNativeAsyncStorage.setItem('authToken', token); // Stocker le jeton dans AsyncStorage
      const uid = user.uid;
  
      // Utilisation correcte de userData pour stocker les informations supplémentaires
      await db.collection('users').doc(uid).set({
        username: userData.username, // Utilisez userData pour accéder au nom d'utilisateur
        email: user.email, // Utilisez user pour accéder à l'email
        uid: uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
      return { ...userData, uid }; // Retournez l'objet userData enrichi avec uid
    } catch (error) {
      console.log("Error @createUser: ", error.message);
      throw error; // Rethrow l'erreur pour une gestion ultérieure
    }
  },
  

  getBlob: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new TypeError("La connexion a échoué"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection("users").doc(uid).get();
      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log("Error @getUserInfo: ", error);
    }
  },

  logOut: async () => {
    try {
      await ReactNativeAsyncStorage.removeItem('authToken'); // Supprimer le jeton d'authentification
      await signOut(auth); // Déconnexion avec Firebase Auth
    } catch (error) {
      console.log("Error @logOut: ", error.message);
      throw error;
    }
  },
  

  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = user.accessToken;
      await ReactNativeAsyncStorage.setItem('authToken', token); // Stocker le jeton dans AsyncStorage
      return user;
    } catch (error) {
      // Gérer les erreurs ici
      console.log("Error @signIn: ", error.message);
      throw error;
    }
  },
  

  uploadPhotoAsync: async (uri, filename) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(filename)
        .put(file);

      upload.on(
        "state_changed",
        snapshot => { },
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  },

  addPost: async ({ title, text, categorie, lieu, localUri }) => {
    const remoteUri = await Firebase.uploadPhotoAsync(localUri, `photos/${uid}/${Date.now()}.jpg`);
    const uid = Firebase.getCurrentUser().uid;

    return new Promise((res, rej) => {
      db
        .collection("post")
        .doc()
        .add({
          title,
          text,
          lieu,
          categorie,
          uid: this.id,
          likes: [],
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          image: remoteUri
        })
        .then(ref => {
          res(ref);
        })
        .catch(error => {
          rej(error);
        });
    });
  },
};

const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
};

export { FirebaseContext, FirebaseProvider, onAuthStateChange };
