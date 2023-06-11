import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/reducers/cartSlice';


export default RecipeScreen = ({navigation}) => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <View>
      <Text>Panier</Text>
        <ScrollView>
      {cartItems.map(item => ( 
          <View style={styles.main} key={item.id}>
            <Text>{item.title}</Text>
            <Image
              source={{ uri: item.image }}
              style={{ width: 150, height: 150, borderRadius: 15 }}
            />
            <Text>{item.prix}</Text>
            <TouchableOpacity onPress={() => handleIncrement(item.id)}>
              <Text>+</Text>
            </TouchableOpacity>
            <Text>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleDecrement(item.id)}>
              <Text>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <Text>Supprimer</Text>
            </TouchableOpacity>
          </View>
      ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    textco: {
        marginTop: 350,
        marginLeft: 25,
        marginRight: 25,
        fontWeight: "bold"
    }

})
