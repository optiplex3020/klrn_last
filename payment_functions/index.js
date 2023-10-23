const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

admin.initializeApp();

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  try {
    // Vérifiez que la demande est une requête POST
    if (req.method !== "POST") {
      res.status(405).send("Only POST requests are supported");
      return;
    }

    // Parsez le corps de la demande
    const body = JSON.parse(req.body);

    // Vérifiez que le corps de la demande contient les informations nécessaires
    if (!body.amount || !body.currency || !body.cardToken) {
      res.status(400).send("Invalid request body");
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: body.currency,
      payment_method: body.cardToken,
      confirm: true,
    });

    res.json({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).send("Payment failed");
  }
});
