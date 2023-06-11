import React, {useEffect, useRef, useState, useContext} from 'react'
import {ImageBackground, SafeAreaView, View,Text, FlatList, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from "firebase/compat/app";
import {UserContext} from '../Context/UserContext'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import NumericInput from 'react-native-numeric-input';


export default DetailScreen = ({route, navigation}) => {

  const [user, setUser] = useContext(UserContext);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

    const {item} = route.params;

    const InteriorCard = ({interior}) => {
      return <Image source={interior} style={style.interiorImage} />;
    };
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* item image */}
  
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
  
            {/* Virtual Tag View */}
            <View style={style.virtualTag}>
              <Text style={{color: "#fff"}}>Virtual tour</Text>
            </View>
          </View>
  
          <View style={style.detailsContainer}>
            {/* Name and rating view container */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={style.ratingTag}>
                  <Text style={{color: "#fff"}}>4.8</Text>
                </View>
                <Text style={{fontSize: 13, marginLeft: 5}}>155 ratings</Text>
              </View>
            </View>
  
            {/* Location text */}
            <Text style={{fontSize: 16, color: "#66666"}}>
              {item.lieu}
            </Text>
  
            {/* Facilities container */}
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <NumericInput 
                value={value}
                minValue={0}
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
  
            {/* Interior list */}
            <FlatList
              contentContainerStyle={{marginTop: 20}}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, key) => key.toString()}
              data={item.interiors}
              renderItem={({item}) => <InteriorCard interior={item} />}
            />
  
            {/* footer container */}
            <View style={style.footer}>
              <View>
                <Text
                  style={{color: "#001dff", fontWeight: 'bold', fontSize: 18}}>
                  {item.prix}€
                </Text>
                <Text
                  style={{fontSize: 12, color: "#666666", fontWeight: 'bold'}}>
                  Total Price
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleAddToCart(item)} style={style.bookNowBtn}>
                <Text style={{color: "#fff"}}>Ajouter au panier</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const {width, height} = Dimensions.get('window');
  
  const style = StyleSheet.create({
    backgroundImageContainer: {
      elevation: 20,
      marginHorizontal: 20,
      marginTop: 20,
      alignItems: 'center',
      height: 350,
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
      top: -20,
      width: 120,
      borderRadius: 10,
      height: 40,
      paddingHorizontal: 20,
      backgroundColor:"#000",
      justifyContent: 'center',
      alignItems: 'center',
    },
    interiorImage: {
      width: width / 3 - 20,
      height: 80,
      marginRight: 10,
      borderRadius: 10,
    },
    footer: {
      height: 70,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    bookNowBtn: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#000",
      borderRadius: 10,
      paddingHorizontal: 20,
    },
    detailsContainer: {flex: 1, paddingHorizontal: 20, marginTop: 40},
    facility: {flexDirection: 'row', marginRight: 15},
    facilityText: {marginLeft: 5, color: "#666666"},
  });