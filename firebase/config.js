import {initializeApp, getApps, getApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const FirebaseKeys = {

  apiKey: 'AIzaSyCFS3YqoFRZLYnBJzLN9dL8ugXn1_yBYSA',
  authDomain: 'airlibre-9c426.firebaseapp.com',
  databaseURL: 'https://airlibre-9c426.firebaseio.com',
  projectId: 'airlibre-9c426',
  storageBucket: 'airlibre-9c426.appspot.com',
  messagingSenderId: '62824552496',
  appId: '1:62824552496:web:281a39bdfbe36648d0b5f5',
  measurementId: 'G-50F0VRXX17',
};
if (!getApps().length) {
  initializeApp(FirebaseKeys);
}
const app = getApps.length > 0 ? getApp() : initializeApp(FirebaseKeys);

const storage = getStorage(app);
export const stripeSecretKey = 'sk_test_51NHsDFIldimfBY6saiXKv9gbaLkmkuniuOwppbXMVbq5spzObeb4GrHq4A1dYNQbdXtI2sojnOfdMdtxF9Q4AQbU00dxHC5Fq8';


export const auth = getAuth();
export {storage};
export default FirebaseKeys;
