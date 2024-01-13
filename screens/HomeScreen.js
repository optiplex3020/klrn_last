import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Modal, TouchableOpacity, FlatList, ScrollView, Image,  Pressable, Animated } from 'react-native';
import firebase from 'firebase/compat/app';
import * as Animatable from 'react-native-animatable';  
import { ThemeContext } from '../Context/ThemeContext';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import SearchComponent from '../components/SearchComponent';
require('firebase/compat/firestore');

const HomeScreen = ({ navigation }) => {  
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [post, setPost] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(null);
  const refPosts = firebase.firestore().collection('post');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const receiveSearchResults = (results) => {
    setSearchResults(results);
    setIsModalVisible(true); 
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  

  const imageRef = useRef(null);


  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  useEffect(() => {
    getPosts();
  }, []);
  
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setIsModalVisible(false);
    });
    return unsubscribe;
  }, [navigation]);

  const Separator = () => {
    return <View style={{ width: width * 0.05 }} />; // Espace de 5% entre les catégories
  };

  const getPosts = async () => {
    setLoading(true);
    const snapshot = await refPosts.orderBy('title').limit(20).get();
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

  const getCategories = async () => {
    const snapshot = await refPosts.orderBy('categorie').get();
    if (!snapshot.empty) {
      let newCategories = Array.from(new Set(snapshot.docs.map((doc) => doc.data().categorie))).sort();
      setCategories(newCategories);
    } else {
      setCategories([]);
    }
  };

  const showCategoryItems = (category) => {
    if (selectedCategory === category) {
      hideCategoryItems();
    } else {
      setSelectedCategory(category);
      setFilteredPosts(post.filter((p) => p.categorie === category));
      // Appliquer une animation
      imageRef.current.fadeIn(); // Assurez-vous que imageRef est correctement référencé
    }
  };
  
  const hideCategoryItems = () => {
    setSelectedCategory(null);
    setFilteredPosts([]); 
  };
      
      
  const renderCategoryIcon = (category) => {
    return (
      <Pressable
        style={[
          styles.category1,
          category === selectedCategory && styles.categorySelected,
        ]}
        onPress={() => showCategoryItems(category)}
      >
        <Text style={[styles.categoryText, category === selectedCategory && styles.categoryTextDark, isDarkMode && styles.categoryTextDark]}>{category}</Text>
      </Pressable>
    );
  };

  const renderItem = ({ item }) => (
    <View>
      <Pressable
        style={[styles.item, isDarkMode && styles.itemDark]}
        onPress={() => {
          navigation.navigate('Detail', {
            item: item,
          });
        }}>
        <Animatable.Image source={{ uri: item.image }} style={{ width: 150, height: 150, borderRadius: 15 }} animation="fadeIn"  ref={imageRef} />
        
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>{item.title}</Text>
        <Text style={[styles.text, isDarkMode && styles.textDark]}>{item.categorie}</Text>
        <Text style={[styles.text, isDarkMode && styles.textDark]}>{item.type}</Text>
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
  const renderItem3 = ({ item }) => (
      <TouchableOpacity
        style={[styles.itemContainer, isDarkMode && styles.itemContainerDark]}
        onPress={() => {
          navigation.navigate('Detail', {
            item: item,
          });
          closeModal();
        }}
      >
        <View style={styles.itemContent}>
          <Animatable.Image
            source={{ uri: item.image }}
            style={styles.itemImage}
            animation="fadeIn"
            ref={imageRef}
          />
          <View style={styles.itemInfoContainer}>
            <Text style={[styles.itemTitle, isDarkMode && styles.itemTitleDark]}>{item.title}</Text>
            <Text style={[styles.itemDescription, isDarkMode && styles.itemDescriptionDark]}>
              {item.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.view, isDarkMode && styles.viewDark]} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
        <View style={[styles.header, isDarkMode && styles.headerDark]}>
          <Text style={[styles.appName, isDarkMode && styles.appNameDark]}>Kolia</Text>
        </View>
       <View>
        <SearchComponent onSearchResults={receiveSearchResults} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {searchResults.length === 0 ? (
                <Text>Aucun produit correspondant à votre recherche.</Text>
              ) : (
                <FlatList
                  data={searchResults}
                  renderItem={renderItem3}
                  keyExtractor={(item) => item.id.toString()}
                />
              )}
            </View>
          </TouchableOpacity>
        </Modal>
       </View>
       <FlatList
         data={categories}
         horizontal
         showsHorizontalScrollIndicator={false}
         keyExtractor={(item) => item}
         renderItem={({ item }) => (
           <Pressable
             style={[styles.category1, item === selectedCategory && styles.categorySelected]}
             onPress={() => showCategoryItems(item)}
           >
             {renderCategoryIcon(item)}
           </Pressable>
         )}
         ItemSeparatorComponent={Separator}

       />
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
          data={filteredPosts.length > 0 ? filteredPosts : post} // Utilisation de la donnée conditionnelle
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
      </SafeAreaView>
    </ScrollView>
  );
};

const width = Dimensions.get('screen').width / 2;
const { height } = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  view: { 
    flex: 1, 
    backgroundColor: "#f7f7f7" 
},
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  viewDark: {
    backgroundColor: '#000',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#f5f5f5'
  },
  headerDark: {
    backgroundColor: '#000'
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appNameDark: {
    color: '#fff', 
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'transparent',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    width: '100%'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '95%',
    maxHeight: '100%',
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  itemInfoContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#009387',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: height,
    width: 200, 
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
    backgroundColor: '#000', 
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
  menuTextDark: {
    color: '#fff'
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
    marginTop: "5%",
    paddingHorizontal: 0,
  },
  recommendation: {
    fontSize: 20,
    color: '#009387',
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
  category1: {
    height: windowHeight * 0.05, // Exemple: 8% de la hauteur de l'écran
    width: width * 0.7, // Exemple: 70% de la largeur de l'écran
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0.4,
    borderColor: "#009387"
  },
  categoryText: {
    color: "black"
  },
  categoryTextDark: {
    color: "white"
  },
  categorySelected: {
    height: windowHeight * 0.05, // 8% de la hauteur de l'écran
    width: width * 0.7, // 70% de la largeur de l'écran
    backgroundColor: '#009387',
  },
  closeButton1: {
    marginTop: '10%',
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    padding: 10,
    backgroundColor: '#FFA500',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default HomeScreen;
