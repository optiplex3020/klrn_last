const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { stripe } = require('stripe'); // Importez le module stripe contenant votre clé secrète Stripe

// Initialisez l'application Firebase Admin
admin.initializeApp();

// Cloud Function pour renvoyer les paramètres de paiement
exports.getPaymentSheetParams = functions.https.onRequest(async (request, response) => {
  try {
    // Obtenez les données du panier depuis votre Redux store
    const cartItems = [/* Remplacez cette liste par les données de votre Redux store */];
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
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: 'customer_id' }, // Remplacez 'customer_id' par l'ID du client réel
      { apiVersion: '2020-08-27' } // Utilisez la version appropriée de l'API Stripe
    );

    // Construisez l'objet JSON avec les paramètres de paiement
    const paymentSheetParams = {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: 'customer_id', // Remplacez 'customer_id' par l'ID du client réel
      // Ajoutez d'autres données nécessaires pour le paiement si nécessaire
    };

    // Répondez avec les paramètres de paiement au format JSON
    response.status(200).json(paymentSheetParams);
  } catch (error) {
    console.error('Erreur lors de la récupération des paramètres de paiement:', error);
    response.status(500).json({ error: 'Erreur lors de la récupération des paramètres de paiement' });
  }
});
