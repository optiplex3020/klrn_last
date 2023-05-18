import React, {createContext} from 'react';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FirebaseKeys from '../firebase/config';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';




const FirebaseContext = createContext();
constructor()
if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseKeys);
} else {
    firebase.app(); // if already initialized, use that one
}
function onAuthStateChange() {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("The user is logged in");
      } else {
        console.log("The user is not logged in");
      }
    });
  }
 

const db = firebase.firestore();
const auth = getAuth();

const Firebase = {
    getCurrentUser: () => {
        return auth.currentUser 
    },

    createUser: async (user) => {
        try {
            await createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
            const uid = Firebase.getCurrentUser().uid;

            let profilePhotoUrl = "default";

             await db.collection('users').doc(uid).set({
                username: user.username,
                email: user.email,
                uid: uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                profilePhotoUrl
            })


            if (user.profilePhoto) {
                profilePhotoUrl = await firebase.uploadProfilePhoto(user.profilePhoto);
            }

            delete user.password;

            return {...user, profilePhotoUrl, uid};
        } catch (error) {
            console.log("Error @createUser: ", error.message)
        }
    },

    uploadProfilePhoto: async (uri) => {
        const uid = Firebase.getCurrentUser().uid;

        try {
            const photo = await Firebase.getBlob(uri);

            const imageRef = firebase.storage().ref("avatars").child(uid);
            await imageRef.put(photo);

            const url = await imageRef.getDownloadURL();

            await db.collection("users").doc(uid).update({
                profilePhotoUrl: url,
            });

            return url;
        } catch (error) {
            console.log("Error @uploadProfilePhoto: ", error)
        }
    },

    getBlob: async (uri) => {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onload = () => {
                resolve(xhr.response) 
            }

            xhr.onerror = () => {
                reject(new TypeError("La connexion a échoué"))
            }

            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
    },

    getUserInfo: async (uid) => {
        try {
            const user = await  db.collection("users").doc(uid).get()
            if (user.exists) {
                return user.data();
            }

        } catch (error) {
            console.log("Error @getUserInfo: ", error)
        }
    },

    logOut: async () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    },

    signIn: async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const token = user.accessToken;
                    AsyncStorage.setItem('userToken', token);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
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
                snapshot => {},
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
}

export { FirebaseContext, FirebaseProvider, onAuthStateChange } 