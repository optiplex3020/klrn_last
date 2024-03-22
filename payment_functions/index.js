const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);

admin.initializeApp();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth || !context.auth.token.email) {
      throw new functions.https.HttpsError("unauthenticated", "user non auth");
    }
    const addressDetails = data.address;
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

    const orderRef = admin.firestore().collection("orders").doc();
    const cartTotal = calculateCartTotal(data.cart);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartTotal * 100,
      metadata: {orderId: orderRef.id},
      currency: "eur",
      automatic_payment_methods: {enabled: false},
      customer: customer.id,
    });

    await orderRef.set({
      userId: context.auth.uid,
      items: data.cart, // Les détails du panier passés à la fonction
      shippingDetails: addressDetails,
      paymentIntentId: paymentIntent.id,
      paymentStatus: "Pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });


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
const endpointSe = functions.config().stripe.webhooksecret.trim();

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSe);

    // Traitez l"événement
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        // Récupérez l'ID de commande correspondant à cet intent de paiement
        const orderId = paymentIntent.metadata.orderId;
        // Mettez à jour le document de commande dans Firestore
        const orderRef = admin.firestore().collection("orders").doc(orderId);
        await orderRef.update({
          paymentStatus: "Succeeded",
        });

        console.log(`Pay de ${paymentIntent.amount} réussi et statut update`);
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

