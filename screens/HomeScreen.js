import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, RefreshControl, TouchableOpacity, FlatList, ScrollView, Image,  Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
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

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
          <Ionicons name={isDarkMode ? 'md-sunny' : 'md-moon'} size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.hi, isDarkMode && styles.hiDark]}>Bonjour, {username}</Text>
        <TouchableOpacity style={styles.search} onPress={navigation.navigate('Search')}>
          <AntDesign name="search1" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
      </View>
      <View style={styles.recommendationContainer}>
        <Text style={[styles.recommendation, isDarkMode && styles.recommendationDark]}>Nos Recommandations</Text>
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
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hi: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  hiDark: {
    color: '#fff',
  },
  toggleButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  search: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
