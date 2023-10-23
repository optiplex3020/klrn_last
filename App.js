import React, { useEffect, useState } from 'react';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './stacks/AppStackScreens';
import { UserProvider } from './Context/UserContext';
import { FirebaseProvider } from './Context/FirebaseContext';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import { ThemeProvider } from './Context/ThemeContext';
import { StripeProvider } from '@stripe/stripe-react-native';



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const STRIPE_PUBLISHABLE_KEY="pk_test_51NHsDFIldimfBY6spENLai4aCsTqrxyl8DljQturL8NCPrb2DBWbMkPKZyXm13IDjDEystKq7okgGmDcWw3D3onQ00SXIJd1Fy";

  useEffect(() => {
      // Vérifier si un token d'authentification est présent dans le stockage local
      AsyncStorage.getItem('authToken')
      .then((token) => {
          if (token) {
              setIsAuthenticated(true);
          }
      })
      .catch((error) => {
          console.error('Error fetching authentication token:', error);
      });
  }, []);

  return (
    <ThemeProvider>
      <FirebaseProvider>
        <UserProvider>
          <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <Provider store={store}>
              <NavigationContainer>
                <AppStackScreens />
              </NavigationContainer>
            </Provider> 
          </StripeProvider>
        </UserProvider>
      </FirebaseProvider>
    </ThemeProvider>
  );
}
