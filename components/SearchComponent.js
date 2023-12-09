import React, { useState } from 'react';
import { TextInput, TouchableOpacity, FlatList, Dimensions, View, StyleSheet } from 'react-native';
import "firebase/compat/firestore";
require('firebase/compat/firestore')
import firebase from "firebase/compat/app";
import { AntDesign } from '@expo/vector-icons';

export default function SearchComponent({ onSearchResults }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    firebase
      .firestore()
      .collection('post')
      .where('title', '>=', searchQuery)
      .get()
      .then((querySnapshot) => {
        const results = querySnapshot.docs.map((doc) => doc.data());
        onSearchResults(results);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Votre prochain repas est ici"
          placeholderTextColor="#8E8E8E"
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;


const styles=StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center'
    },
      searchContainer: {
        borderRadius: 25,
        padding: 5,
        paddingHorizontal: 15,
        width: 25,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
      },
      searchInput: {
        fontSize: 18,
        flex: 1,
        borderColor: "#000",
        borderRadius: 25,
        width: "80%",
        height: 200,
        marginLeft: 20,
        color: "#fff"
      },
      search: {
        marginTop: windowHeight*0.02,
        height: 45,
        width: "95%",
        backgroundColor: "#f7f7f7",
        borderRadius: 10,
        flexDirection: 'row', 
        alignItems: 'center',
        shadowOpacity: 0.2,
        shadowColor: '#000',
        justifyContent: 'center'
      },
    searchButton: {
        marginRight: 20
    },
    

    

})