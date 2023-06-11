import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import AppStackScreens from './stacks/AppStackScreens'
import { UserProvider } from './Context/UserContext'
import { FirebaseProvider } from './Context/FirebaseContext'
import { CartContextProvider } from './Context/CartContext';
import { Provider } from 'react-redux';
import { store } from './redux/store/index'

export default App = () => {
  return (
    <FirebaseProvider>
        <UserProvider>
          <Provider store={store}>
            <NavigationContainer>
              <AppStackScreens />
            </NavigationContainer>
          </Provider>   
        </UserProvider>
    </FirebaseProvider>
    
    
  )
}