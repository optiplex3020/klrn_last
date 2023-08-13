import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, RefreshControl, TouchableOpacity, FlatList, ScrollView, Image,  Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import SearchComponent from '../components/SearchComponent'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { ThemeContext } from '../Context/ThemeContext';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import CategoryComponent from '../components/CategoryComponent';
require('firebase/compat/firestore');

const HomeScreen = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [post, setPost] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(null);
  const [username, setUsername] = useState('');
  const refPosts = firebase.firestore().collection('post');
  const auth = getAuth();

  const [showSearchResults, setShowSearchResults] = useState(false); // Add this line
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = firebase.firestore().collection('users').doc(uid);
        userRef.get().then((doc) => {
          if (doc.exists) {
            setUsername(doc.data().username);
          } else {
            console.log('No such document!');
          }
        });
      }
    });
  }, []);

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

  const onRefresh = () => {
    setIsRefreshing(true);
    getPosts();
    setIsRefreshing(false);
  };


  const handleToggleSearchResults = () => {
    setShowSearchResults(!showSearchResults);
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
        <Image source={{ uri: item.image }} style={{ width: 150, height: 150, borderRadius: 15 }} />
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>{item.title}</Text>
        <Text style={[styles.text, isDarkMode && styles.textDark]}>{item.categorie}</Text>
        <Text style={[styles.text, styles.price, isDarkMode && styles.textDark]}>{item.prix}€</Text>
      </Pressable>
    </View>  );

  const renderItem2 = ({ item }) => (
    <View style={[styles.card]}>
    <Pressable onPress={() => {
      navigation.navigate('Detail', {
      item: item,
      });
    }}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardInfo}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>{item.title}</Text>
      <Text style={[styles.category, isDarkMode && styles.categoryDark]}>{item.categorie}</Text>
      <Text style={[styles.price, isDarkMode && styles.priceDark]}>{item.prix}€</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </Pressable>
</View>  );

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <View style={styles.header}>
          <Text style={[styles.hi, isDarkMode && styles.hiDark]}>Bonjour, {username}</Text>
          <View style={styles.search}>
            <SearchComponent
              showResults={showSearchResults}
              onToggleResults={handleToggleSearchResults}
            />
          </View>
        </View>
        {showSearchResults && (
          <View style={styles.searchResultsContainer}>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => <Text key={item.id}>{item.title}</Text>}
              keyExtractor={item => item.id}
            />
          </View>
        )}
        <View style={styles.recommendationContainer}>
          <CategoryComponent/>
          <Text style={[styles.recommendation, isDarkMode && styles.recommendationDark]}>
            Les plus populaires
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
          Les dernières tendances
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
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#F8852D" />}
          extraData={selectedId}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
};

const width = Dimensions.get('screen').width / 2;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  header: {
    height: "10%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#202020",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35
  },
  hi: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 25
  },
  hiDark: {
    color: '#fff',
  },
  card: {
    width: 300,
    height: 300,
    marginRight: 5,
    margin: 8, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 12, 
      height: 23,
    },
    shadowOpacity: 45
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
  },
  recommendationDark: {
    color: '#fff',
  },
  item: {
    height: 220,
    width: width,
    fontSize: 12,
    fontWeight: 'bold',
    elevation: 10,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
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
