const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);

admin.initializeApp();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth || !context.auth.token.email) {
      throw new functions.https.HttpsError("unauthenticated", "user non auth");
    }

    const userEmail = context.auth.token.email;

    // Vérifier si le client existe déjà sur Stripe
    let customer = await findStripeCustomerByEmail(userEmail);

    if (!customer) {
      // Si le client n'existe pas, créer un nouveau client sur Stripe
      customer = await stripe.customers.create({
        email: userEmail,
      });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: "2023-10-16"});

    const cartTotal = calculateCartTotal(data.cart);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartTotal * 100,
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

const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    const itemTotalPrice = item.prix * item.quantity;
    return total + itemTotalPrice;
  }, 0);
};

// Fonction pour rechercher un client Stripe par son adresse e-mail
const findStripeCustomerByEmail = async (email) => {
  const customers = await stripe.customers.list({email: email});
  return customers.data.length > 0 ? customers.data[0] : null;
};
