import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import { StyleSheet, Text, View, FlatList, ScrollView, ActivityIndicator} from 'react-native';
//import { ListItem, Avatar, SearchBar } from 'react-native-elements'
import firebase from "firebase/compat/app";
import SearchComponent from '../components/SearchComponent';

export default SearchScreen = ({navigation}) => {
  
 
    return (
      
        <View style={{marginHorizontal: 10, marginTop: 90}}>
          <SearchComponent />
        </View>
      );
    }