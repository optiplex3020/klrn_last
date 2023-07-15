import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import AppStackScreens from './stacks/AppStackScreens'
import { UserProvider } from './Context/UserContext'
import { FirebaseProvider } from './Context/FirebaseContext'
import { StripeProvider } from '@stripe/stripe-react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store/index'

const publishableKey = 'pk_live_51NHsDFIldimfBY6sVhbIjpv4YRu5srhfFolF3tDpO2MorXH7qk7RpLx0MMsMmQURyRLOKJkIXwrcfLTRymUcWq8G00GFwgRXEW';

export default App = () => {
  return (
    <FirebaseProvider>
        <UserProvider>
          <Provider store={store}>
          <StripeProvider publishableKey={publishableKey}>
            <NavigationContainer>
              <AppStackScreens />
            </NavigationContainer>
          </StripeProvider>
          </Provider>   
        </UserProvider>
    </FirebaseProvider>
  )
}