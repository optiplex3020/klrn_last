import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import AppStackScreens from './stacks/AppStackScreens'
import { UserProvider } from './Context/UserContext'
import { FirebaseProvider } from './Context/FirebaseContext'



export default App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreens />
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
    
    
  )
}