const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51NHsDFIldimfBY6saiXKv9gbaLkmkuniuOwppbXMVbq5spzObeb4GrHq4A1dYNQbdXtI2sojnOfdMdtxF9Q4AQbU00dxHC5Fq8');
import { useSelector } from 'react-redux';

// Initialisez l'application Firebase Admin
admin.initializeApp();

// Cloud Function pour renvoyer les paramètres de paiement
exports.getPaymentSheetParams = functions.https.onRequest(async (request, response) => {
  try {
    // Obtenez les données du panier depuis votre Redux store
    const cartItems = useSelector(state => state.cart); // Assurez-vous d'adapter cette sélecteur en fonction de votre implémentation réelle
    const totalPrice = cartItems.reduce((total, item) => {
      const itemTotalPrice = item.prix * item.quantity;
      return total + itemTotalPrice;
    }, 0);

    // Créez un paiement intent avec le montant total depuis le panier
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100, // Le montant doit être en centimes (1€ = 100 centimes)
      currency: 'eur',
    });

    // Créez une clé éphémère pour le client (dans un vrai cas, vous obtiendrez ceci à partir du SDK Stripe)
    exports.getEphemeralKey = functions.https.onCall(async (data, context) => {
      // Assurez-vous d'authentifier l'appelant et d'autoriser l'accès
      // ...
    
      const customerId = data.customerId; // L'ID du client envoyé par l'application
    
      // Créez une clé éphémère pour le client
      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customerId },
        { apiVersion: '2022-11-15' }
      );
    
      return {
        ephemeralKey: ephemeralKey.secret
      };
    });
    

    // Construisez l'objet JSON avec les paramètres de paiement
    const paymentSheetParams = {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: 'customer_id', // Remplacez 'customer_id' par l'ID du client réel
      // Ajoutez d'autres données nécessaires pour le paiement si nécessaire
    };

    // Répondez avec les paramètres de paiement au format JSON
    console.log('Payment sheet parameters:', paymentSheetParams);
    response.status(200).json(paymentSheetParams);
  } catch (error) {
    console.error('Erreur lors de la récupération des paramètres de paiement:', error);
    response.status(500).json({ error: 'Erreur lors de la récupération des paramètres de paiement' });
  }
});
