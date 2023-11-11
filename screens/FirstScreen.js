import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Pressable, TouchableOpacity, } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'


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
              <Text style={style.title}>Voyager depuis</Text>
              <Text style={style.title}>votre assiette</Text>
            </View>
    
            {/* Text container */}
            <View style={{marginTop: 10}}>
              <Text style={style.textStyle}>
                Embarquer pour de nouvelles saveurs
              </Text>
              <Text style={style.textStyle}>en seulement quelques clics</Text>
            </View>
          </View>
    
          {/* Button container */}
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: 40,
            }}>
              <Animatable.View
                animation="bounceIn" // Animation de pression
                duration={500} // Durée de l'animation
                delay={200} // Délai avant le début de l'animation
                style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 40 }}
              >
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <View style={style.btn}>
                    <Text style={{color: 'white'}}>Commencer</Text>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            {/* button */}
            
          </View>
        </SafeAreaView>
      );
    };
    
    const style = StyleSheet.create({
      image: {
        marginTop: -50,
        height: '65%',
        width: '100%',
        borderBottomLeftRadius: 100,
      },
      btn: {
        height: 60,
        marginHorizontal: 20,
        backgroundColor: 'black',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {fontSize: 32, fontWeight: 'bold'},
      textStyle: {fontSize: 16, color: "#B2B2B2"},
    });