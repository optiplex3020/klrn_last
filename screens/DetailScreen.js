import React, { useEffect, useRef, useState, useContext } from 'react';
import { ImageBackground, SafeAreaView, View, Text, FlatList, StyleSheet, Modal, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import NumericInput from 'react-native-numeric-input';
import { ThemeContext } from '../Context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 



export default DetailScreen = ({ route, navigation }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);


  const handleAddToCart = (item, quantity) => {
    dispatch(addToCart({ ...item, quantity }));
    setShowMessage(true);
    setModalVisible(true); // Ajout pour afficher le modal


    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  const goToHome = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  const viewCart = () => {
    setModalVisible(false);
    navigation.navigate('Recipe');
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
          value={value}
          onChange={setValue}
          minValue={1}
          totalHeight={40}
          totalWidth={100}
          step={1}
          maxValue={10}
          rounded
          iconStyle={{color: "#fff"}}
          rightButtonBackgroundColor={"#000"}
          leftButtonBackgroundColor={"#000"} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Produit ajouté au panier!</Text>
              <TouchableOpacity style={styles.modalButton} onPress={goToHome}>
                <Text style={styles.modalButtonText}>Continuer mes achats</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={viewCart}>
                <Text style={styles.modalButtonText}>Voir mon panier</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.footer}>
          <View>
            <Text style={{ color: '#009387', fontWeight: 'bold', fontSize: 18 }}>{item.prix}€</Text>
          </View>
          <TouchableOpacity onPress={() => handleAddToCart(item, value)} style={styles.bookNowBtn}>
            <Text style={{ color: '#fff' }}>Ajouter au panier</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

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
    backgroundColor: '#009387',
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
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#009387',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});
