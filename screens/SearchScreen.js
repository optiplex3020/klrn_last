import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Modal, Image, SafeAreaView } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import * as Animatable from 'react-native-animatable';  
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AntDesign } from '@expo/vector-icons';

export default SearchScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleClose = () => {
    setIsSearching(false);
  };

  const handleSearch = () => {
    setIsSearching(true);
    firebase
      .firestore()
      .collection('post')
      .where('title', '>=', searchQuery)
      .get()
      .then((querySnapshot) => {
        const results = querySnapshot.docs.map((doc) => doc.data());
        setSearchResults(results);
      });
  };
  const imageRef = useRef(null);

  const handlePress = () => {
    imageRef.current.animate('pulse', 500);
    navigation.navigate('Detail', { item: item });
  };

  const renderItem = ({ item }) => (
    <SafeAreaView>
    <TouchableOpacity
      style={[styles.itemContainer, isDarkMode && styles.itemContainerDark]}
      onPress={handlePress}>
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
    </TouchableOpacity>

    </SafeAreaView>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
          placeholder="Recherche"
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <AntDesign name="search1" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>
      <Modal visible={isSearching} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <AntDesign name="close" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </Modal>
    </SafeAreaView>
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
  searchContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 7,
    paddingHorizontal: 10,
    margin: 10,
    shadowOpacity: 0.2,
    shadowColor: '#000',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
  },
  searchInputDark: {
    color: '#fff',
  },
  searchButton: {
    marginRight: 10,
  },
  flatListContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContainerDark: {
    backgroundColor: '#333',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  itemTitleDark: {
    color: '#fff',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemDescriptionDark: {
    color: '#ccc',
  },
});
