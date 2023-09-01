import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity, FlatList, ScrollView, Image,  Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { ThemeContext } from '../Context/ThemeContext';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
require('firebase/compat/firestore');

const HomeScreen = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [post, setPost] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(null);
  const refPosts = firebase.firestore().collection('post');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  const getPosts = async () => {
    setLoading(true);
    const snapshot = await refPosts.orderBy('title', 'desc').limit(20).get();
    if (!snapshot.empty) {
      let newPosts = [];
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      for (let i = 0; i < snapshot.docs.length; i++) {
        newPosts.push(snapshot.docs[i].data());
      }
      setPost(newPosts);
    } else {
      setLastDoc(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Pressable
        style={[styles.item, isDarkMode && styles.itemDark]}
        onPress={() => {
          navigation.navigate('Detail', {
            item: item,
          });
        }}>
        <Image source={{ uri: item.image }} style={{ width: 150, height: 150, borderRadius: 15 }} />
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>{item.title}</Text>
        <Text style={[styles.text, isDarkMode && styles.textDark]}>{item.categorie}</Text>
        <Text style={[styles.text, styles.price, isDarkMode && styles.textDark]}>{item.prix}€</Text>
      </Pressable>
    </View>  
  );

  const renderItem2 = ({ item }) => (
    <View style={[styles.card]}>
      <Pressable onPress={() => { navigation.navigate('Detail', {
        item: item,
        });
      }}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardInfo}>
          <Text style={[styles.titleDark, isDarkMode && styles.titleDark]}>{item.title}</Text>
          <Text style={[styles.category, isDarkMode && styles.categoryDark]}>{item.categorie}</Text>
          <Text style={[styles.price, isDarkMode && styles.priceDark]}>{item.prix}€</Text>
          <View style={styles.buttonContainer}>
          </View>
        </View>
      </Pressable>
    </View>  
  );

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <TouchableOpacity style={[styles.iconContainer, isDarkMode && styles.iconContainerDark]} onPress={toggleMenu}>
          <Ionicons name="menu-outline" size={24} color={isDarkMode ? 'white' : 'black'}  />
        </TouchableOpacity>
        <Text style={[styles.appName, isDarkMode && styles.appNameDark]}>Kolia</Text>
        <TouchableOpacity style={[styles.iconContainer, isDarkMode && styles.iconContainerDark]}>
          <Ionicons name="settings-outline" size={24} color={isDarkMode ? 'white' : 'black'}  />
        </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isMenuVisible}
            onRequestClose={toggleMenu}
          >
            <View style={styles.modalContainer}>
              <View style={[styles.menu, isDarkMode && styles.menuDark]}>
                <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                  <Ionicons name="close-outline" size={24} color={isDarkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuItem, isDarkMode && styles.menuItemDark]} onPress={toggleDarkMode}>
                  <Ionicons
                    name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
                    size={24}
                    color={isDarkMode ? 'white' : 'black'} // Changez la couleur en fonction du mode sombre
                  />
                  <Text style={[styles.menuText, isDarkMode && styles.menuTextDark]}>
                    Mode {isDarkMode ? 'clair' : 'sombre'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuItem, isDarkMode && styles.menuItemDark]}>
                  <Ionicons name="home-outline" size={24} color={isDarkMode ? 'white' : 'black'} />
                  <Text style={[styles.menuText, isDarkMode && styles.menuTextDark]}>Accueil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuItem, isDarkMode && styles.menuItemDark]}>
                  <Ionicons name="settings-outline" size={24} color={isDarkMode ? 'white' : 'black'} />
                  <Text style={[styles.menuText, isDarkMode && styles.menuTextDark]}>Paramètres</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.recommendationContainer}>
          <Text style={[styles.recommendation, isDarkMode && styles.recommendationDark]}>
            Voyagez dès maintenant
          </Text>
          <FlatList
            data={post}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            renderItem={renderItem2}
          />
        </View>
        <Text style={[styles.recommendation, isDarkMode && styles.recommendationDark]}>
          En Tendances
        </Text>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={post}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 50,
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
          extraData={selectedId}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
};

const width = Dimensions.get('screen').width / 2;
const {  height } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    marginTop: "8%",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#f5f5f5'
  },
  headerDark: {
    backgroundColor: '#000'
  },
  iconContainer: {
    padding: 8,
  },
  iconContainerDark: {
    // Appliquez des styles spécifiques au mode sombre ici
    backgroundColor: '#000', // Par exemple, changez la couleur de fond en mode sombre
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appNameDark: {
    color: '#fff', // Couleur du texte en mode sombre
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: height,
    width: 200, // Adjust the width as needed
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 16,
    marginTop: 60,
    elevation: 5,
  },
  menuDark: {
    backgroundColor: '#000'
  },
  menuItem: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuItemDark: {
    // Appliquez des styles spécifiques au mode sombre ici
    backgroundColor: '#000', // Par exemple, changez la couleur de fond en mode sombre
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
  menuTextDark: {
    color: '#fff'
  },
  closeButton: {
    marginTop: '10%',
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonDark: {
    color: 'fff'
  },
  card: {
    width: 310,
    height: 220,
    marginRight: 5,
    margin: 8, 
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 1200, 
      height: 2300,
    },
    shadowOpacity: 450
  },
  cardDark: {
    borderColor: '#666',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'transparent',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: "center",
    textAlign: "center"
  },
  category: {
    color: '#fff',
    fontSize: 12,
  },
  price: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  favoriteButton: {
    backgroundColor: 'rgba(51, 51, 51, 0.7)', 
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14
  }, 
  toggleButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  search: {
    marginTop: -10
  },
  recommendationContainer: {
    marginTop: 10,
    paddingHorizontal: 0,
  },
  recommendation: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
    width: width
  },
  recommendationDark: {
    color: '#fff',
  },
  item: {
    height: 220,
    width: 150,
    fontSize: 12,
    backgroundColor: "#fff",
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
  },
  itemDark: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleDark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    paddingHorizontal: 1,
    color: '#848385',
  },
  textDark: {
    color: '#ccc',
  },
  price: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
  },
  priceDark: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '55%',
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
