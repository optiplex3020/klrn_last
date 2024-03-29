import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert, Platform, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/reducers/cartSlice';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../Context/ThemeContext';
import { StripeProvider, usePaymentSheet, AddressSheet } from '@stripe/stripe-react-native';
import firebase from "firebase/compat/app";
import 'firebase/compat/functions';


const RecipeScreen = () => {
  const [ready, setReady] = useState(false);
  const [addressSheetVisible, setAddressSheetVisible] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [addressDetails, setAddressDetails] = useState(null);
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();

  useEffect(() => {
    updatePaymentSheet();
  }, [cartItems]);

  // Appelez cette fonction lorsque l'utilisateur soumet son adresse
  const handleAddressSubmit = async (details) => {
    setAddressDetails(details); // Enregistrez les détails pour une utilisation ultérieure
    setAddressSheetVisible(false); // Fermez la feuille d'adresse

    // Continuez avec la feuille de paiement
    await initializePaymentSheetWithAddress(details);
  };

  const initializePaymentSheetWithAddress = async (addressDetails) => {
    try {
      const { ephemeralKey, paymentIntent } = await fetchPaymentSheetParams(addressDetails);
      const { error } = await initPaymentSheet({
        ephemeralKey: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: 'KoLia Fr',
        // Ajoutez les détails de l'adresse ici
        defaultShippingDetails: addressDetails,
      });

      if (error) {
        console.error('Erreur lors de l’initialisation de la feuille de paiement', error);
      } else {
        setReady(true); // Ici, vous pouvez définir l'état pour indiquer que la feuille de paiement est prête à être présentée
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres de la feuille de paiement:', error);
    }
  };

  const updatePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        appearance: customAppearance,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: 'KoLia Fr',
        allowsDelayedPaymentMethods: true,
      });

      if (error) {
        Alert.alert(`Code d'erreur : ${error.code}`, error.message);
      } else {
        setReady(true);
      }
    } catch (error) {
      console.error('Erreur d\'initialisation de la feuille de paiement :', error);
    }
  };

  const customAppearance = {
    font: {
      family:
        Platform.OS === 'android' ? 'avenirnextregular' : 'AvenirNext-Regular',
    },
    shapes: {
      borderRadius: 12,
      borderWidth: 0.5,
    },
    primaryButton: {
      shapes: {
       borderRadius: 20,
      },
    },
    colors: {
      primary: '#fcfdff',
      background: '#ffffff',
      componentBackground: '#f3f8fa',
      componentBorder: '#f3f8fa',
      componentDivider: '#000000',
      primaryText: '#000000',
      secondaryText: '#000000',
      componentText: '#000000',
      placeholderText: '#73757b',
    },
   };

  const buy = async () => {

    try {

      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert(`Code d'erreur : ${error.code}`, error.message);
      } else {
        Alert.alert('Succès', 'Le paiement a été confirmé ');
        setReady(false);
      }
    } catch (error) {
      console.error('Erreur lors de la présentation de la feuille de paiement :', error);
    }
  };
  
  const fetchPaymentSheetParams = async (addressDetails) => {
    try {
      const response = await firebase.functions().httpsCallable('createPaymentIntent')({
        cart: cartItems,
        address: addressDetails // Assurez-vous que cette information est correctement fournie
      });
      const data = response.data;
  
      return {
        paymentIntent: data.clientSecret,
        ephemeralKey: data.ephemeralKey,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres de la feuille de paiement:', error);
      throw error;
    }
  };  
  
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

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const itemTotalPrice = item.prix * item.quantity;
      return total + itemTotalPrice;
    }, 0);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.productContainer, isDarkMode && styles.darkModeContainer]}>
      <Image
        source={{ uri: item.image }}
        style={[styles.productImage, isDarkMode && styles.darkModeImage]}
      />
      <View style={styles.productInfoContainer}>
        <Text style={[styles.productTitle, isDarkMode && styles.darkModeText]}>{item.title}</Text>
        <Text style={[styles.productPrice, isDarkMode && styles.darkModeText]}>{item.prix}€</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(item.id)}>
          <Text style={[styles.quantityButtonText, isDarkMode && styles.darkModeText]}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.quantityText, isDarkMode && styles.darkModeText]}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(item.id)}>
          <Text style={[styles.quantityButtonText, isDarkMode && styles.darkModeText]}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleRemove(item.id)}>
          <FontAwesome name="trash-o" size={20} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const STRIPE_PUBLISHABLE_KEY="pk_test_51NHsDFIldimfBY6spENLai4aCsTqrxyl8DljQturL8NCPrb2DBWbMkPKZyXm13IDjDEystKq7okgGmDcWw3D3onQ00SXIJd1Fy";

  return (

    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY} urlScheme='fr.airlibre.kolia'>
      <SafeAreaView style={[styles.main, isDarkMode && styles.mainDark]}>
          <View style={[styles.header, isDarkMode && styles.headerDark]}>
            <Text style={[styles.title, isDarkMode && styles.titleDark]}>Panier</Text>
          </View>
          {cartItems.length === 0 ? (
            <View style={[styles.main, isDarkMode && styles.mainDark]}>
              <Text style={[styles.emptyCartMessage, isDarkMode && styles.emptyCartMessageDark]}>Votre panier est vide.</Text>
            </View>
          ) : (
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
          <AddressSheet
            visible={addressSheetVisible}
            onSubmit={handleAddressSubmit}
            onError={(error) => {
              if (error.code === AddressSheetError.Failed) {
                Alert.alert('Une erreur s\'est produite.', 'Veuillez vérifier les journaux pour plus de détails.');
                console.log(error?.localizedMessage);
              }
              setAddressSheetVisible(false);
            }}
            appearance={{
              colors: {
                primary: '#F8F8F2',
                background: '#272822'
              }
            }}
            defaultValues={{
              phone: '7 62 49 52 96',
              address: {
                country: 'France',
                city: 'Bondy',
              },
            }}
            additionalFields={{
              phoneNumber: 'required',
            }}
            allowedCountries={['FR', 'GB']}
            primaryButtonTitle={'Utiliser cette adresse'}
            sheetTitle={'Adresse de livraison'}
          />


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
          
          <Text style={[styles.totalPrice, isDarkMode && styles.totalPriceDark]}>Prix total: {calculateTotalPrice(cartItems)}€</Text>
          {/* Bouton pour ouvrir la feuille d'adresse */}
          <TouchableOpacity style={[
                styles.paymentButton,
                isDarkMode && styles.paymentButtonDark,
                {
                  shadowColor: isDarkMode ? 'white' : 'black',
                  shadowOffset: { width: 1, height: 3 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 3, 
                  opacity: !ready ? 0.5 : 1,
                  backgroundColor: !ready ? '#ccc' : '#000', },
              ]}
              onPress={() => setAddressSheetVisible(true)}>
            <Text>Ajouter une adresse de livraison</Text>
          </TouchableOpacity>
          {ready && (
            <TouchableOpacity
              style={[
                styles.paymentButton,
                isDarkMode && styles.paymentButtonDark,
                {
                  shadowColor: isDarkMode ? 'white' : 'black',
                  shadowOffset: { width: 1, height: 3 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 3, 
                  opacity: !ready ? 0.5 : 1,
                  backgroundColor: !ready ? '#ccc' : '#000', },
              ]}
              onPress={buy}
              disabled={!ready} 
            >
              <Text style={[styles.paymentButtonText, isDarkMode && styles.paymentButtonTextDark]}>Payer</Text>
            </TouchableOpacity>
          )}

      </SafeAreaView>
    </StripeProvider>
    
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
    width: '100%',
    height: '12%',
    alignItems: 'center'
  },
  headerDark: {
    backgroundColor: "#000",
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
    paddingVertical: 10,
    width: '100%',
  },
  darkModeText: {
    color: "#fff"
  },
  totalPriceDark: {
    color: "#fff"
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%', 
    marginLeft: '4%'
  },
  darkModeContainer: {
    backgroundColor: 'black',
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
    marginBottom: '15%',
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
  emptyCartMessage: {
    justifyContent: 'center',
    alignContent: "center",
    alignItems: 'center',
  },
  emptyCartMessageDark: {
    color: "white"
  },
});

export default RecipeScreen