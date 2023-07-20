import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './stacks/AppStackScreens';
import { UserProvider } from './Context/UserContext';
import { FirebaseProvider } from './Context/FirebaseContext';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import { ThemeProvider } from './Context/ThemeContext';

const publishableKey = 'pk_live_51NHsDFIldimfBY6sVhbIjpv4YRu5srhfFolF3tDpO2MorXH7qk7RpLx0MMsMmQURyRLOKJkIXwrcfLTRymUcWq8G00GFwgRXEW';
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://airlibre-9c426.firebaseio.com'
});

export default function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
