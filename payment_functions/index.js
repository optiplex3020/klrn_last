const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret);

admin.initializeApp();

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  try {
    // Vérifiez que la demande est une requête POST
    if (req.method !== "POST") {
      res.status(405).send("Only POST requests are supported");
      return;
    }

    // Parsez le corps de la demande
    const body = req.body;

    // Vérifiez que le corp les informations nécessaires
    if (!body.amount || !body.currency) {
      res.status(400).send("Invalid request body");
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: body.currency,
      payment_method_types: ["card"],
    });

    res.status(200).json({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).send("Payment failed");
  }
});
