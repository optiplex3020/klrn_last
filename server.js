const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./admin.js'); // Spécifiez le chemin vers votre fichier de configuration Firebase.

// Initialisation de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://airlibre-9c426.firebaseio.com',
});

// Configuration de votre serveur Express
const app = express();

// Définition de vos routes et d'autres fonctionnalités du serveur

// Écoute du serveur sur un port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
