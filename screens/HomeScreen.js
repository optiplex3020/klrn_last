import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, RefreshControl, TouchableOpacity, FlatList, ScrollView, Image,  Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SearchComponent from '../components/SearchComponent'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { ThemeContext } from '../Context/ThemeContext';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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
    const snapshot = await refPosts.orderBy('title', 'desc').limit(10).get();
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

  const renderItem = ({ item }) => (
    <View style={[styles.item, isDarkMode && styles.itemDark]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>{item.title}</Text>
        <Text style={[styles.category, isDarkMode && styles.categoryDark]}>{item.categorie}</Text>
        <Text style={[styles.price, isDarkMode && styles.priceDark]}>{item.prix}€</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('Detail', {
            item: item,
          });
        }}
      >
        <Text style={styles.addButtonText}>Détails</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardInfo}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>{item.title}</Text>
      </View>
      <Text style={[styles.price, isDarkMode && styles.priceDark]}>{item.prix}€</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Ajouter au panier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          {/* Mettez ici l'icône pour le bouton favori */}
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.hi, isDarkMode && styles.hiDark]}>Bonjour, {username}</Text>
        <View style={styles.search}>
          <SearchComponent/>
        </View>
      </View>
      <View style={styles.recommendationContainer}>
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
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#F8852D" />}
        extraData={selectedId}
        renderItem={renderItem2}
      />
      </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  header: {
    height: "22%",
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
    width: 200,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardDark: {
    borderColor: '#666',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardInfo: {
    padding: 10,
  },
  titleContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#F8852D',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  favoriteButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    paddingHorizontal: 20,
  },
  recommendation: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  recommendationDark: {
    color: '#fff',
  },
  item: {
    height: 260,
    width: '48%',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    justifyContent: 'space-between',
  },
  item2: {
    height: 260,
    width: '48%',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    justifyContent: 'space-between',
  },
  itemDark: {
    backgroundColor: '#333',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {},
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  titleDark: {
    color: '#fff',
  },
  category: {
    fontSize: 12,
    color: '#848385',
    marginBottom: 5,
  },
  categoryDark: {
    color: '#ccc',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  priceDark: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#F8852D',
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
