// Import the Stripe API
const stripe = require("stripe")(process.env.STRIPE_KEY);
stripe.setApiKey(process.env.STRIPE_KEY);
import {useSelector} from "react-redux";

// Create a connection to the Stripe API

// Function to handle an HTTP request
exports.handler = async (req, res) => {
  // Check if the request is a POST request
  if (req.method !== "POST") {
    res.status(405).send("Only POST requests are supported");
    return;
  }

  // Parse the request body
  const body = await req.body.json();

  // Check if the request body contains the necessary information
  if (!body.amount || !body.currency || !body.cardNumber ||
     !body.expirationDate ||
     !body.cvc) {
    res.status(400).send("Invalid request body");
    return;
  }

  // Get the cart information from Redux
  const cart = await store.getState().cart;
  const cartItems = useSelector((state) => state.cart);
  const totalPrice = cartItems.reduce((total, item) => {
    const itemTotalPrice = item.prix * item.quantity;
    return total + itemTotalPrice;
  }, 0);

  // Make a payment with Stripe
  const payment = await stripe.charges.create({
    amount: body.amount,
    currency: body.currency,
    card: {
      number: body.cardNumber,
      expirationMonth: body.expirationDate.split("/")[0],
      expirationYear: body.expirationDate.split("/")[1],
      cvc: body.cvc,
    },
    items: cart.items.map((item) => {
      return {
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      };
    }),
  });

  // Send the response
  res.status(200).send(payment);
};
