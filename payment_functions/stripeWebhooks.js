const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);
admin.initializeApp();

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(req.rawBody, sig, "endpo");

    // Traitez l"événement
    switch (event.type) {
      case "payment_intent.succeeded": {
        // Notez les accolades ajoutées ici pour créer un nouveau scope
        const paymentIntent = event.data.object;
        console.log(`Paiement pour ${paymentIntent.amount} réussi.`);
        // Logique pour ettre à jour Firestore ou toute autre action nécessaire
        break;
      }
      // Gérez d"autres types d"événements si nécessaire
      default: {
        console.log(`Type d"événement inconnu: ${event.type}`);
      }
    }

    res.status(200).send("Événement reçu");
  } catch (err) {
    console.error(`Erreur webhook: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
