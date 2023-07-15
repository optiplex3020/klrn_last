import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/reducers/cartSlice';
import { FontAwesome } from '@expo/vector-icons';

import { useStripe } from '@stripe/stripe-react-native';

export default RecipeScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentSheetOpen, setPaymentSheetOpen] = useState(false); // État de l'affichage du processus de paiement

  const fetchPaymentSheetParams = async () => {
    // Effectuez votre appel API pour récupérer les paramètres du paiement (paymentIntent, ephemeralKey, customer, etc.)
    // Assurez-vous d'adapter cet appel à votre propre backend
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      // methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      // Gérer les erreurs de paiement
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);


  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  let totalPrice = 0;
  cartItems.forEach(item => {
    const itemTotalPrice = item.prix * item.quantity;
    totalPrice += itemTotalPrice;
  });

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
      />
      <View style={styles.productInfoContainer}>
        <Text>{item.title}</Text>
        <Text>{item.prix}€</Text>
      </View>
      <View style={styles.quantityContainer}>
      <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(item.id)}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(item.id)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.quantityButton} onPress={() => handleRemove(item.id)}>
        <FontAwesome name="trash-o" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>Panier</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      <Text>Prix total: {totalPrice}€</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textco: {
    marginTop: 350,
    marginLeft: 25,
    marginRight: 25,
    fontWeight: "bold"
  },
  main: {
    flex: 1,
    alignContent: "center",
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#fff',
    width: '100%',
    height: '12%',
    alignItems: 'center'
  },
  title: {
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 17
  },
  img: {
    width: 70, 
    height: 70, 
    borderRadius: 15
  },
  lign: {
    width: '80%',
    height: '10%',
    marginBottom: '20%'
  },
  flatListContainer: {
    paddingVertical: 10
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100',
    marginLeft: '4%'
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 15
  },
  quantityButton: {
    marginHorizontal: 20
  },
  productInfoContainer: {
    marginLeft: 30
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: '100%'
  }
});
