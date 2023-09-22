const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_KEY);

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
