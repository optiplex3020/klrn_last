import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import AppStackScreens from './stacks/AppStackScreens'
import { UserProvider } from './Context/UserContext'
import { FirebaseProvider } from './Context/FirebaseContext'
import { CartContextProvider } from './Context/CartContext';



export default App = () => {
  return (
    <FirebaseProvider>
        <UserProvider>
          <CartContextProvider>
            <NavigationContainer>
              <AppStackScreens />
            </NavigationContainer>
          </CartContextProvider>   
        </UserProvider>
    </FirebaseProvider>
    
    
  )
}