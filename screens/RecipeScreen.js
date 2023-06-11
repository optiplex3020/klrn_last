import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, TextInput, View } from 'react-native'
import {Icon} from 'react-native-elements';
import CartItem from '../components/CartItem'
import { CartContext } from '../Context/CartContext';
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'

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

  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
  return(
    <View style={{flex:1}}>
      { shoppingCart.length == 0 ? 
        <Text style={styles.textco} >Aucun article dans votre panier or slow internet causing trouble (Refresh the page) or you are not logged in</Text>
           
        : null  }
      {shoppingCart.map(cart => (
              <View style={{flex:1}} key={cart.ProductID}>

                  <View>
                      <Image source={cart.ProductImg} alt="not found" />
                  </View>

                  <View>{cart.ProductName}</View>

                  <View>{cart.ProductPrice}</View>

                  <TouchableOpacity onPress={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                      <Icon icon={ic_add} size={24} />
                  </TouchableOpacity>

                  <Text>{cart.qty}</Text>

                  <TouchableOpacity onPress={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                      <Icon icon={ic_remove} size={24} />
                  </TouchableOpacity>

                  <View>
                      <Text>Rs {cart.TotalProductPrice}.00</Text> 
                  </View>

                  <TouchableOpacity onPress={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                      <Icon icon={iosTrashOutline} size={24} />
                  </TouchableOpacity>
              </View>
          ))
          }
          {shoppingCart.length > 0 ? 
              <View>
                  <View>
                      <Text>Cart-Summary</Text> 
                  </View>
                  <View>
                      <Text>Total Price</Text>
                      <Text>{totalPrice}</Text>
                  </View>
                  <View>
                      <Text>Total Qty</Text>
                      <Text>{totalQty}</Text>
                  </View>
              </View>: null} 
    </View>
  )
}

const styles = StyleSheet.create({
    textco: {
        marginTop: 350,
        marginLeft: 25,
        marginRight: 25,
        fontWeight: "bold"
    }

})
