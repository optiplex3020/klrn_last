import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/reducers/cartSlice';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../Context/ThemeContext';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

export default RecipeScreen = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);


  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };
  
  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };  

  const handleRemove = (itemId) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cet article du panier ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            dispatch(removeFromCart(itemId));
          }
        }
      ]
    );
  };

  const handlePayment = async (amount) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
  
    try {
      // Initialisation du PaymentSheet avec les détails du paiement
      await initPaymentSheet({
        paymentIntentClientSecret: 'TON_CLIENT_SECRET', // Obtenu côté serveur depuis Stripe
        customFlow: true,
        merchantDisplayName: 'KoLia Fr',
      });
  
      // Présentation du PaymentSheet au client
      const { error } = await presentPaymentSheet();
      if (error) {
        console.error('Erreur de paiement :', error);
      } else {
        console.log('Paiement réussi !');
        // Ici, tu peux vider le panier ou faire d'autres actions après le paiement réussi
      }
    } catch (e) {
      console.error('Erreur lors de l\'initialisation du PaymentSheet :', e);
    }
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
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>Panier</Text>
      </View>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartMessage}>Votre panier est vide.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
      <Text style={[styles.totalPrice]}>Prix total: {totalPrice}€</Text>
      <TouchableOpacity
        style={[styles.paymentButton, isDarkMode && styles.paymentButtonDark, {
          shadowColor: isDarkMode ? "white" : "black",
          shadowOffset: { width: 1, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 3, // Pour Android
        },]}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text style={[styles.paymentButtonText, isDarkMode && styles.paymentButtonTextDark]}>Payer</Text>
      </TouchableOpacity>
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
  headerDark: {
    backgroundColor: "#000",
    borderBottomWidth: 0.5,
    borderColor: "#f7f7f7"
  },
  title: {
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 17
  },
  titleDark: {
    color: "#fff"
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

  productContainerDark: {
    backgroundColor: "#fff"
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
    width: "90%",
    backgroundColor: "#000",
    alignItems: "center",
    marginBottom: '7%',
    shadowOpacity: 4,
    shadowColor: "green",
    shadowOffset: {width: 500, height: 5},
  },
  paymentButtonDark: {
    backgroundColor: "#fff",
  },
  paymentButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  paymentButtonTextDark: {
    color: "black"
  },
});