import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, TextInput, View } from 'react-native'
import {Icon} from 'react-native-elements';
import CartItem from '../components/CartItem'
import { CartContext } from '../Context/CartContext';
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { useStripe } from '@stripe/stripe-react-native';
import { UserContext } from '../Context/UserContext';

{/*<React.Fragment>
            <main className="cart">
              {shoppingCart.length <= 0 && <p>No Item in the Cart!</p>}
              <ul>
                {shoppingCart.map(cart => (
                  <li key={cart.id}>
                    <div>
                      <strong>{cart.title}</strong> - ${cart.price} (
                      {cart.quantity})
                    </div>
                    <div>
                    </div>
                  </li>
                ))}
              </ul>
            </main>
          </React.Fragment> */ }


export default RecipeScreen = ({navigation}) => {

    const cartItems = useSelector(state => state.cart.items);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text>Total: {totalPrice}</Text>
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