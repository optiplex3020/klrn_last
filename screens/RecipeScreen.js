import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/reducers/cartSlice';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../Context/ThemeContext';
import { useStripe } from '@stripe/stripe-react-native';

export default RecipeScreen = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

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
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(item)}>
          <Text style={[styles.quantityButtonText]}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.quantityText]}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(item)}>
          <Text style={[styles.quantityButtonText]}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.quantityButton} onPress={() => handleRemove(item.id)}>
        <FontAwesome name="trash-o" size={20} color="black" />
        <Text>Supp</Text>
      </TouchableOpacity>
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
      <Text style={[styles.totalPrice]}>Prix total: {totalPrice}€</Text>
      {loading && (
        <TouchableOpacity style={[styles.paymentButton]} onPress={openPaymentSheet}>
          <Text style={[styles.paymentButtonText]}>Payer</Text>
        </TouchableOpacity>
      )}
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
    width: '100',
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
    borderRadius: 5
  },
  paymentButtonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});
