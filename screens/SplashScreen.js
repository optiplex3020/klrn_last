import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, Dimensions } from 'react-native';
import koliaImage from '../assets/pLogo.png'; // Remplacez le chemin par le chemin de votre image

export default function SplashScreen({ navigation }) {
  const startAnimation = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current; // Utilisez une échelle pour l'animation de la taille du texte

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(scaleValue, {
        toValue: 100, // Taille finale du texte (ajustez selon vos besoins)
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        navigation.navigate('Login');
      });
    }, 2000);
  }, []);

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      <Animated.View style={{
        flex: 1,
        backgroundColor: "#000",
        zIndex: 1,
        transform: [
          { translateY: startAnimation }
        ]
      }}>
        <Animated.View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Animated.Image
            source={koliaImage} // Utilisez votre image importée
            style={{
              width: '100%', // Ajustez la largeur selon vos besoins
              height: '100%', // Ajustez la hauteur selon vos besoins
              transform: [{ scale: scaleValue }], // Utilisez l'échelle pour l'animation de la taille
            }}
            resizeMode="contain" // Assurez-vous que l'image est ajustée correctement dans le conteneur
          />
        </Animated.View>
      </Animated.View>
    </View>
  )
}
