// src/redux/authActions.js
import { auth, signInWithEmailAndPassword, signOut } from '../firebase';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from '../actions/authActions';

// Créer une fonction asynchrone pour se connecter
export const login = (email, password) => async (dispatch) => {
  try {
    // Dispatch l'action loginStart
    dispatch(loginStart());
    // Appeler le service de Firebase Auth pour se connecter avec email et mot de passe
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Récupérer l'utilisateur connecté
    const user = userCredential.user;
    // Dispatch l'action loginSuccess avec les données de l'utilisateur
    dispatch(loginSuccess({ uid: user.uid, email: user.email }));
  } catch (error) {
    // Dispatch l'action loginFailure avec le message d'erreur
    dispatch(loginFailure(error.message));
  }
};

// Créer une fonction asynchrone pour se déconnecter
export const logout = () => async (dispatch) => {
  try {
    // Dispatch l'action logoutStart
    dispatch(logoutStart());
    // Appeler le service de Firebase Auth pour se déconnecter
    await signOut(auth);
    // Dispatch l'action logoutSuccess
    dispatch(logoutSuccess());
  } catch (error) {
    // Dispatch l'action logoutFailure avec le message d'erreur
    dispatch(logoutFailure(error.message));
  }
};
