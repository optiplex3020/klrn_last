const functions = require('firebase-functions');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.generatePaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    const { totalPrice } = data; // Récupérez le montant total depuis l'application

    // Créez un paiementIntent avec le montant total et d'autres détails
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100, // Le montant doit être en cents (par exemple, 1000 pour 10 EUR)
      currency: 'eur',
    });

    // Retournez le client secret du paiement
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Erreur lors de la création du paiementIntent :', error);
    throw new functions.https.HttpsError('internal', 'Erreur lors de la création du paiementIntent');
  }
});
