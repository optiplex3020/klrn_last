import React, { useState } from 'react';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';

const PaymentScreen = () => {
  const { confirmPayment } = useStripe();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePayment = async () => {
    setPaymentLoading(true);

    try {
      const { paymentIntent, error } = await confirmPayment('CLIENT_SECRET_FROM_SERVER');
      if (error) {
        console.error("Erreur de paiement :", error);
      } else {
        console.log("Paiement réussi, mettez à jour votre backend et l'état de votre application");
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Effectuer un paiement</Text>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: 'Numéro de carte',
          // ...
        }}
        cardStyle={{
          backgroundColor: 'white',
          // ...
        }}
        onCardChange={(cardDetails) => {
          // Gérez les changements dans les détails de la carte ici
          console.log("Détails de la carte mis à jour :", cardDetails);
        }}
        onFocus={(focusedField) => {
          // Gérez le focus sur les champs de la carte ici
          console.log("Focus sur le champ de la carte :", focusedField);
        }}
      />
      {paymentLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <Button title="Payer" onPress={handlePayment} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default PaymentScreen;
