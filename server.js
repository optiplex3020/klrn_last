const express = require('express');
const stripe = require('stripe')('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');
const app = express();

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'eur',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Could not create payment intent' });
  }
});

app.listen(3000, () => {
  console.log('Serveur Express en cours d\'écoute sur le port 3000');
});
