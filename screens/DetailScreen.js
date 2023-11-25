import React, { useEffect, useRef, useState, useContext } from 'react';
import { ImageBackground, SafeAreaView, View, Text, FlatList, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import NumericInput from 'react-native-numeric-input';
import { ThemeContext } from '../Context/ThemeContext';
import { Ionicons } from '@expo/vector-icons'; 


export default DetailScreen = ({ route, navigation }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;


  const handleAddToCart = (item, quantity) => {
    dispatch(addToCart({ ...item, quantity }));
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  
  const toastConfig = {
    // ...
    cart: ({ name, price, ...props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'white' }}>
        <Text>Produit ajouté au panier!</Text>
        <Text>{name}</Text>
        <Text>{price}€</Text>
      </View>
    ),
  };
  
  

  const { item } = route.params;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);


  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <Animated.View style={[styles.backgroundImageContainer, { opacity: fadeAnim }]}>
        <ImageBackground style={styles.backgroundImage} source={{ uri: item.image }}>
          <View style={styles.header}>
            <View style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={20} onPress={navigation.goBack} /> 
            </View>
            <View style={styles.headerBtn}>
              <Ionicons name="heart" size={20} color={'#FF0000'} /> 
            </View>
          </View>
        </ImageBackground>
      </Animated.View>

      <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
        </View>

        {/* Location text */}
        <Text style={{ fontSize: 16, color: '#66666' }}>{item.lieu}</Text>
        <Text style={{ marginTop: 20, color: '#666666' }}>{item.text}</Text>

        <NumericInput
          maxValue={20}
          value={value}
          marginTop={2000}
          onChange={setValue}
          minValue={1}
          valueType="integer"
          totalWidth={100}
          totalHeight={40}
          rounded
          textColor="#000"
          iconStyle={{ color: 'black' }}
          rightButtonBackgroundColor="#transparent"
          leftButtonBackgroundColor="transparent"
        />
        
        {showMessage && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>Produit ajouté au panier!</Text>
          </View>
        )}

        <View style={styles.footer}>
          <View>
            <Text style={{ color: '#001dff', fontWeight: 'bold', fontSize: 18 }}>{item.prix}€</Text>
          </View>
          <TouchableOpacity onPress={() => handleAddToCart(item, value)} style={styles.bookNowBtn}>
            <Text style={{ color: '#fff' }}>Ajouter au panier</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: '#001dff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    marginTop: "25%",
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { 
    flex: 1, 
    paddingHorizontal: 20, 
    marginTop: 40 
  },
  facility: { 
    flexDirection: 'row', 
    marginRight: 15 
  },
  facilityText: { 
    marginLeft: 5, 
    color: '#666666' 
  },
  alertContainer: {
    top: 20,
    backgroundColor: '#4CAF50', // Couleur de fond de l'alerte (vert ici)
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    width: "80%"
  },
  alertText: {
    color: '#fff', // Couleur du texte de l'alerte (blanc ici)
    fontSize: 16,
  },
  
});
