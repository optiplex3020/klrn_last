import firebase from "firebase/compat/app";

export const refPosts = firebase.firestore().collection('post')