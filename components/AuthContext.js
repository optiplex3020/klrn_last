import {createContext} from 'react'
import firebase from "firebase/compat/app";
import FirebaseKeys from "../config";
import "firebase/compat/firestore";
require('firebase/compat/firestore')
require('firebase/compat/auth')

if(!firebase.apps.length){
    
  firebase.initializeApp(FirebaseKeys)
  }

export const UserContext = createContext( 
  firebase
    .firestore()
    .collection('post')
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .get()
    .then(function(querySnapshot) {
    let posts = querySnapshot.docs.map(doc => doc.data())
    return posts
  })
    .catch(function(error) {
      console.log('Error getting documents: ', error)
  }));
