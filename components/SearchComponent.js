import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Dimensions, View, StyleSheet } from 'react-native';
import "firebase/compat/firestore";
require('firebase/compat/firestore')
import firebase from "firebase/compat/app";
import { AntDesign } from '@expo/vector-icons';

export default function SearchComponent({ onSearchResults }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    firebase
      .firestore()
      .collection('post')
      .where('title', '>=', searchQuery) // Recherche pour les textes qui commencent par searchQuery dans 'title'
      .where('title', '<=', searchQuery + '\uf8ff') // Recherche pour les textes qui se terminent par searchQuery dans 'title'
      .get()
      .then((titleSnapshot) => {
        const titleResults = titleSnapshot.docs.map((doc) => doc.data());
        
        firebase
          .firestore()
          .collection('post')
          .get()
          .then((snapshot) => {
            const textResults = snapshot.docs
              .map((doc) => doc.data())
              .filter((item) => {
                // Vérifiez si le champ 'text' contient le mot recherché
                return item.text.toLowerCase().includes(searchQuery.toLowerCase());
              });
  
            // Fusionner les résultats des deux recherches
            const mergedResults = [...titleResults, ...textResults];
            
            // Supprimer les doublons potentiellement obtenus dans les deux recherches
            const uniqueResults = mergedResults.filter((item, index) => {
              return (
                mergedResults.findIndex((el) => el.id === item.id) === index
              );
            });
            
            onSearchResults(uniqueResults);
          });
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
        color: "#000"
      },
      search: {
        marginBottom: windowHeight*0.04,
        height: 45,
        width: "95%",
        backgroundColor: "#f7f7f7",
        borderRadius: 10,
        borderColor: 'back',
        borderWidth: 0.5,
        flexDirection: 'row', 
        alignItems: 'center',
        shadowOpacity: 0.2,
        shadowOffset: {
          height: 8,
          width: 2
        },
        shadowColor: '#000',
        justifyContent: 'center'
      },
    searchButton: {
        marginRight: 20
    },
    

    

})