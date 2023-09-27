import React, { useEffect, useRef, useState, useContext } from 'react';
import { ImageBackground, SafeAreaView, View, Text, Modal, TextInput, TouchableHighlight, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import { ThemeContext } from '../Context/ThemeContext';

export default DetailScreen = ({ route, navigation }) => {
  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const dispatch = useDispatch();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [quantityInput, setQuantityInput] = useState('');

  const handleAddToCart = (item) => {
    const parsedQuantity = parseInt(quantityInput);
    if (parsedQuantity >= 1 && parsedQuantity <= 30) {
      dispatch(addToCart({ ...item, quantity: parsedQuantity }));
      setModalVisible(false);
      setIsQuantityValid(true); // Quantité valide
    } else {
      // Quantité non valide, le bouton reste désactivé
      setIsQuantityValid(false);
    }
  };

  const { item } = route.params;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <Animated.View style={[styles.backgroundImageContainer, { opacity: fadeAnim }]}>
        <ImageBackground style={styles.backgroundImage} source={{ uri: item.image }}>
          <View style={styles.header}>
            <View style={styles.headerBtn}>
              <TouchableOpacity onPress={navigation.goBack}>
                <Icon name="arrow-back-ios" size={20}/>
              </TouchableOpacity>
            </View>
            <View style={styles.headerBtn}>
              <Icon name="favorite" size={20} color={'#FF0000'} />
            </View>
          </View>
        </ImageBackground>
      </Animated.View>

      <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
        </View>

        <Text style={{ fontSize: 16, color: '#66666' }}>{item.lieu}</Text>
        <Text style={{ marginTop: 20, color: '#666666' }}>{item.text}</Text>

        <View style={styles.footer}>
          <View>
            <Text style={{ color: '#001dff', fontWeight: 'bold', fontSize: 18 }}>{item.prix}€</Text>
            <Text style={{ fontSize: 12, color: '#666666', fontWeight: 'bold' }}>Prix total </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.bookNowBtn}>
            <Text style={{ color: '#fff' }}>Ajouter au panier</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Saisissez la quantité (1-30)</Text>
              <TextInput
                style={styles.modalInput}
                onChangeText={(text) => {
                  setQuantityInput(text);
                  setIsQuantityValid(true); // Réinitialise l'état à true
                }}
                value={quantityInput}
                keyboardType="numeric"
                placeholder="Quantité"
              />
              <TouchableHighlight
                style={[styles.modalButton, !isQuantityValid && styles.disabledButton]}
                onPress={() => {
                  handleAddToCart(item);
                }}
                disabled={!isQuantityValid}
              >
                <Text style={{ color: '#fff' }}>Ajouter</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
  disabledButton: {
    backgroundColor: '#ccc', // Couleur de fond grise pour le bouton désactivé
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#505050',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
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
});
