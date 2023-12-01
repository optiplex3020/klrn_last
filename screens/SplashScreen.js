import React, { useEffect } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('First');
    }, 5000);
  }, []);

  return (
    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <View style={{
        flex: 1,
        backgroundColor: "#fff",
        zIndex: 1,
      }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
          <Text style={{
            color: '#000',
            fontSize: 40,
          }}>
            Kolia
          </Text>
          <Text style={{
            color: 'green',
            fontSize: 40, // Augmentation de la taille du "."
          }}>
            .
          </Text>
        </View>
      </View>
    </View>
  )
}
