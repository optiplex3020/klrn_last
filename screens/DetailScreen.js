import React, {useEffect, useRef, useState, useContext} from 'react'
import {ImageBackground, SafeAreaView, View,Text, FlatList, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../Context/UserContext'
import NumericInput from 'react-native-numeric-input';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default DetailScreen = ({route, navigation}) => {

  const [user, setUser] = useContext(UserContext);
  const [value, setValue] = useState(0);

  const addToCart = (item) => {
    if (user) {
      const { id, title, lieu, prix } = item;
      const cartRef = firebase.firestore().collection('users').doc(user.uid).collection('cart');
  
      cartRef
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // L'article existe déjà dans le panier, mise à jour de la quantité
            const newQuantity = doc.data().quantity + 1;
            cartRef.doc(id).update({ quantity: newQuantity });
          } else {
            // Ajouter un nouvel article au panier
            cartRef.doc(id).set({
              id,
              title,
              lieu,
              prix,
              quantity: 1,
            });
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'article au panier :", error);
        });
    } else {
      // L'utilisateur n'est pas connecté, gérer cette situation selon votre logique
    }
  };
  
 

    const {item} = route.params;

    const InteriorCard = ({interior}) => {
      return <Image source={interior} style={style.interiorImage} />;
    };
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "#f7f7f7"}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={style.backgroundImageContainer}>
            <ImageBackground style={style.backgroundImage} source={{uri:item.image}}>
              <View style={style.header}>
                <View style={style.headerBtn}>
                  <Icon
                    name="arrow-back-ios"
                    size={20}
                    onPress={navigation.goBack}
                  />
                </View>
                <View style={style.headerBtn}>
                  <Icon name="favorite" size={20} color={"#FF0000"} />
                </View>
              </View>
            </ImageBackground>
            <View style={style.virtualTag}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.title}</Text>
              <View style={style.location}>
                <Entypo name="location" size={16} color="black" />
                <Text style={{fontSize: 16, color: "#66666"}}>
                  {item.lieu}
                </Text>
              </View>
            </View>
          </View>
          <View style={style.detailsContainer}>
            <Text style={{fontSize: 16, color: "#66666"}}>
              {item.lieu}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <NumericInput 
                value={value}
                minValue={1}
                totalHeight={30}
                totalWidth={140}
                step={1}
                maxValue={10}
                rounded
                iconStyle={{color: "#fff"}}
                rightButtonBackgroundColor={"#000"}
                leftButtonBackgroundColor={"#000"} />
            </View>
            <Text style={{marginTop: 20, color: "#666666"}}>
              {item.text}
            </Text>
            <FlatList
              contentContainerStyle={{marginTop: 20}}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, key) => key.toString()}
              data={item.interiors}
              renderItem={({item}) => <InteriorCard interior={item} />}
            />
          </View>
        </ScrollView>
        <View style={style.footer}>
          <View>
            <Text style={{color: "#001dff", fontWeight: 'bold', fontSize: 18}}>
              {item.prix}€
            </Text>
            <Text style={{fontSize: 12, color: "#666666", fontWeight: 'bold'}}>
              Prix Total
            </Text>
          </View>
          <TouchableOpacity style={style.bookNowBtn} onPress={() => addToCart(item)}>
            <Text style={{ color: "#fff" }}>Ajouter au panier</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }; 

  const {width, height} = Dimensions.get('window');
  
  const style = StyleSheet.create({
    backgroundImageContainer: {
      alignItems: 'center',
      height: 450,
    },
    backgroundImage: {
      height: '100%',
      width: '100%',
      borderRadius: 20,
      overflow: 'hidden',
    },
    header: {
      paddingVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    headerBtn: {
      height: 50,
      width: 50,
      backgroundColor: "#fff",
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ratingTag: {
      height: 30,
      width: 35,
      backgroundColor: "#001dff",
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    virtualTag: {
      top: -40,
      width: "75%",
      borderRadius: 10,
      height: 80,
      paddingHorizontal: 20,
      backgroundColor:"#fff",
      shadowColor: "#000",
      shadowOpacity: 0.5,
      shadowRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    location: {
      width: "80%",
      flexDirection: 'row', 
      alignItems: 'center'
    },
    interiorImage: {
      width: width / 3 - 20,
      height: 80,
      marginRight: 10,
      borderRadius: 10,
    },
    footer: {
      height: 70,
      width: "75%",
      backgroundColor: "#fff",
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      marginLeft: 43,
      shadowColor: '#000',
      shadowOffset: { width: 1.5, height: 1.5},
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    bookNowBtn: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#000",
      borderRadius: 10,
      paddingHorizontal: 20,
    },
    detailsContainer: {
      flex: 1, 
      paddingHorizontal: 20, 
      marginTop: 40
    },
    facility: {
      flexDirection: 'row', 
      marginRight: 15
    },
    facilityText: {
      marginLeft: 5, 
      color: "#666666"
    },
  });