import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';

const CartItem = ({item}) => {
  return (
    <View style={{flex:1, backgroundColor: "#000"}}>
        <Text>
            Recipe
        </Text>
        <Image source={{uri: item.image}} style={{ maxWidth: '150px', maxHeight: '150px'}} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={{ fontWeight: 600, marginRight: '2px' }}>{item.Prix}€</Text>
            <Text>Nombre d'article</Text>
            <TextInput keyboardType='number'/>
        <TouchableOpacity>Supprimer</TouchableOpacity>
        </View>

  );
};

export default CartItem;
