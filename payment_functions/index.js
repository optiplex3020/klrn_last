const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  // Check if the request is a POST request
  if (req.method !== "POST") {
    res.status(405).send("Only POST requests are supported");
    return;
  }

  // Parse the request body
  const body = req.body; // No need for .json() here

  // Check if the request body contains the necessary information
  if (!body.amount || !body.currency || !body.cardToken) {
    res.status(400).send("Invalid request body");
    return;
  }

  // Calculate the total price
  const cartItems = body.cartItems;
  const totalPrice = cartItems.reduce((total, item) => {
    const itemTotalPrice = item.prix * item.quantity;
    return total + itemTotalPrice;
  }, 0);

  // Log the totalPrice for debugging purposes
  console.log("Total Price:", totalPrice);

  // Make a payment with Stripe
  try {
    const payment = await stripe.charges.create({
      amount: totalPrice,
      currency: body.currency,
      source: body.cardToken, // Use cardToken instead of card details
      description: "Payment for cart items",
    });

    // Send the response
    res.status(200).send(payment);
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).send("Payment failed");
  }
});
