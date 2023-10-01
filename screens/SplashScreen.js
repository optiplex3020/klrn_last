import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, Dimensions } from 'react-native';

export default function SplashScreen({ navigation }) {
  const startAnimation = useRef(new Animated.Value(0)).current;
  const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current; // Utilisez une échelle pour l'animation de la taille du texte
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 10,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setShowText(true);
      Animated.timing(scaleValue, {
        toValue: 10, // Taille finale du texte (ajustez selon vos besoins)
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        navigation.navigate('Login');
      });
    }, 5000);
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
          {showText && (
            <Animated.Text
              style={{
                color: 'white',
                transform: [{ scale: scaleValue }], // Utilisez l'échelle pour l'animation de la taille
                opacity: opacityValue,
              }}
            >
              Kolia
            </Animated.Text>
          )}
        </Animated.View>
      </Animated.View>
    </View>
  )
}
