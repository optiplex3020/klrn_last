import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, RefreshControl, TouchableOpacity, FlatList, ScrollView, Image,  Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import SearchComponent from '../components/SearchComponent';
import { UserContext } from '../Context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../Context/ThemeContext';
import { AntDesign } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';
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

  const animation = {
    from: {
      opacity: 0,
      translateY: 90,
    },
    to: {
      opacity: 1,
      translateY: 0,
    },
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.subheader}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
            <Ionicons name={isDarkMode ? 'md-sunny' : 'md-moon'} size={24} color={isDarkMode ? '#FFF' : '#000'} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={[styles.hi, isDarkMode && styles.hiDark]}>Bonjour, {username}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.search} onPress={navigation.navigate('SearchScreen')}>
              <AntDesign name="search1" size={24} color={isDarkMode ? '#FFF' : '#000'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
        <Text style={[styles.recommand, isDarkMode && styles.recommandDark]}>Nos Recommandations</Text>
      </View>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={post}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 50,
          paddingBottom: 50,
          marginBottom: 55,
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#F8852D" />
        }
        extraData={selectedId}
        renderItem={({ item }) => (
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
        )}
      />
    </View>
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
  hi: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 30,
  },
 hiDark: {
    color: '#fff',
  },
  subheader: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: -27,
  },
  search: {
    marginTop: -27,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  toggleButtonDark: {
    backgroundColor: '#000',
  },
  toggleButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButtonTextDark: {
    color: '#f7f7f7',
  },
  main: {
    width: '100%',
    marginTop: 55,
    paddingHorizontal: 20,
  },
  recommand: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  recommandDark: {
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
});

export default HomeScreen;