const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);

admin.initializeApp();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    const customer = await stripe.customers.create({
      email: "customer@example.com",
    });

    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: "2023-10-16"});

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 200000,
      currency: "eur",
      automatic_payment_methods: {enabled: true},
      customer: customer.id});

    return {
      ephemeralKey: ephemeralKey.secret,
      clientSecret: paymentIntent.client_secret,
      publishableKey: functions.config().stripe.public_key,
    };
  } catch (error) {
    console.error("Erreur de paiement:", error);
    throw new functions.https.HttpsError("internal", "Erreur de paiement");
  }
});
