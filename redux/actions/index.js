import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from '../constants/index'
import firebase from "firebase/compat/app";
require('firebase/compat/firestore')

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else{
                    console.log("n'existe pas")
                }
            })
    })
}

export function fetchUsers() {
        firebase.firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id
          return { id, ...data }
      });
      setUsers(users)
      })
    
}

export function fetchUserPosts() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("post")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("timestamp", "asc")
            .get()
            .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id
                        return { id, ...data }
                    })
                    console.log(posts)
                    dispatch({type : USER_POSTS_STATE_CHANGE, posts })
                //changer post en posts (ecrit comme ca dans la video, avec un s)
            })
    })
}