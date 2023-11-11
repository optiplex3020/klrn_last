import firebase from 'firebase/compat/app';

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const storyRef =firebase.firestore().collection('post');
