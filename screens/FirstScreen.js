import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'

const { width, height } = Dimensions.get('window');


export default FirstScreen = ({navigation}) => {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <StatusBar translucent />
    
          {/* Onboarding Image */}
          <Image
            source={require('../assets/fam2.jpg')}
            style={style.image}
          />
    
          {/* Indicator container 
          <View style={style.indicatorContainer}>
            <View style={style.indicator} />
            <View style={style.indicator} />
            <View style={[style.indicator, style.indicatorActive]} />
          </View>*/}
    
          {/* Title and text container */}
          <View style={{paddingHorizontal: 20, paddingTop: 20}}>
            {/* Title container */}
            <View>
              <Text style={style.title}>Voyagez depuis</Text>
              <Text style={style.title}>votre assiette</Text>
            </View>
    
            {/* Text container */}
            <View style={{marginTop: 10}}>
              <Text style={style.textStyle}>
                Embarquez pour de nouvelles saveurs
              </Text>
              <Text style={style.textStyle}>en seulement quelques clics</Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: "5%" }}>
            <Animatable.View
              animation="bounceIn" 
              duration={500} 
              delay={200} 
              style={{ flex: 1, paddingBottom: "10%" }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={style.btn}>
                  <Text style={{color: 'white'}}>Connexion</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <View style={style.btn2}>
                  <Text style={{color: '#009387'}}>Commencer</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </SafeAreaView>
      );
    };
    
    const style = StyleSheet.create({
      image: {
        marginTop: -50,
        height: height * 0.6, // 65% de la hauteur de l'écran
        width: '100%',
        borderBottomLeftRadius: 100,
      },
      btn: {
        height: 60,
        marginHorizontal: width * 0.05, // 5% de la largeur de l'écran
        backgroundColor: '#009387',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      btn2: {
        height: 60,
        marginHorizontal: width * 0.05, // 5% de la largeur de l'écran
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: '#009387',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#009387'
      },
      textStyle: {
        fontSize: 16,
        color: "#B2B2B2"
      },
    });