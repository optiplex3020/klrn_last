const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret_key);

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "eur",
    });

    res.status(200).json({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({error: "Could not create payment intent"});
  }
});
