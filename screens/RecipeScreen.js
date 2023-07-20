import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/reducers/cartSlice';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../Context/ThemeContext';
import { useStripe, StripeProvider } from '@stripe/stripe-react-native';

export default RecipeScreen = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [loading, setLoading] = useState(false);
  const [paymentSheetOpen, setPaymentSheetOpen] = useState(false); // État de l'affichage du processus de paiement

  useEffect(() => {
    initPaymentSheet({ // Utilisez la méthode initPaymentSheet pour initialiser Stripe avec votre clé publique
      paymentSheetEnabled: true,
      merchantDisplayName: 'KoLia, Inc.',
    });
  }, []);

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'KoLia, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      // methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: false,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });

    if (!error) {
      setLoading(true);
      setPaymentSheetOpen(true);
    }
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      return data; // L'objet JSON doit contenir les clés paymentIntent, ephemeralKey, customer, etc.
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres de paiement:', error);
      return null;
    }
  };
  
  const openPaymentSheet = async () => {
    // Vérifiez si la feuille de paiement a été initialisée avant de l'ouvrir
    if (paymentSheetOpen) {
      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
      }
    } else {
      // Affichez une alerte ou un message pour indiquer que la feuille de paiement n'a pas été initialisée
      Alert.alert('Error', 'Payment sheet has not been initialized yet.');
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

  let totalPrice = cartItems.reduce((total, item) => {
    const itemTotalPrice = item.prix * item.quantity;
    return total + itemTotalPrice;
  }, 0);
  

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
      />
      <View style={styles.productInfoContainer}>
        <Text style={[styles.productTitle]}>{item.title}</Text>
        <Text style={[styles.productPrice]}>{item.prix}€</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(item.id)}>
          <Text style={[styles.quantityButtonText]}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.quantityText]}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(item.id)}>
          <Text style={[styles.quantityButtonText]}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleRemove(item.id)}>
          <FontAwesome name="trash-o" size={20} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  );

  console.log(cartItems);

  return (
    <View style={[styles.main, isDarkMode && styles.mainDark]}>
      <View style={styles.header}>
        <Text style={[styles.title]}>Panier</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={styles.view2}>

      </View>
      <Text style={[styles.totalPrice]}>Prix total: {totalPrice}€</Text>
      <TouchableOpacity style={[styles.paymentButton]} onPress={openPaymentSheet}>
          <Text style={[styles.paymentButtonText]}>Payer</Text>
        </TouchableOpacity>
      {/**
      <StripeProvider
        publishableKey="pk_test_51NHsDFIldimfBY6spENLai4aCsTqrxyl8DljQturL8NCPrb2DBWbMkPKZyXm13IDjDEystKq7okgGmDcWw3D3onQ00SXIJd1Fy"
      ><PaymentScreen />

      </StripeProvider> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  mainDark: {
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#fff',
    width: '100%',
    height: '12%',
    alignItems: 'center'
  },
  view2: {
    marginTop: -1200
  },
  title: {
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 17
  },
  flatListContainer: {
    paddingVertical: 10
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%', // Modifier cette ligne
    marginLeft: '4%'
  },
  
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 15
  },
  productInfoContainer: {
    marginLeft: 30
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  productPrice: {
    fontSize: 14
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: '100%'
  },
  quantityButton: {
    marginHorizontal: 20
  },
  quantityText: {
    fontSize: 16
  },
  quantityButtonText: {
    fontSize: 18
  },
  totalPrice: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  paymentButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#B0228C"
  },
  paymentButtonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});

import { CardField } from '@stripe/stripe-react-native';


function PaymentScreen() {
  const { confirmPayment } = useStripe();

  return (
    <CardField
      postalCodeEnabled={true}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
  );
}