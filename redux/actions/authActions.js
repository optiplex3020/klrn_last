// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { auth, signInWithEmailAndPassword, signOut } from  "firebase/auth";

// Créer le slice Redux pour l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // L'utilisateur connecté
    loading: false, // L'état de chargement
    error: null, // L'erreur éventuelle
  },
  reducers: {
    // Définir les reducers pour les actions d'authentification
    loginStart: (state) => {
      // Commencer le chargement
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      // Terminer le chargement et mettre à jour l'utilisateur
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      // Terminer le chargement et mettre à jour l'erreur
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      // Commencer le chargement
      state.loading = true;
    },
    logoutSuccess: (state) => {
      // Terminer le chargement et réinitialiser l'utilisateur
      state.loading = false;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      // Terminer le chargement et mettre à jour l'erreur
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Exporter les actions et le reducer du slice
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
