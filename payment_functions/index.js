const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret);

admin.initializeApp();

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  try {
    // Vérifiez que la demande est une requête POST
    if (req.method !== "POST") {
      res.send("Selem, Only POST requests are supported");
      return;
    }

    const customers = await stripe.customers.list();

    const customer = customers.data[0];

    if (!customer) {
      return res.send({
        error: 'manque de bougs carrement',
      });
    }
    const ephemeralKey = await stripe.ephemeralKeys.create({
          customer: customer.id},
          {apiVersion: "2023-10-16"},
    )

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 200000,
      currency: "eur",
      customer: customer.id,
      automatic_payment_methods: {enabled: true},
      payment_method_types: [
        "card",
      ],
    });

    return res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,});
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.send("Payment failed");
  }
});
