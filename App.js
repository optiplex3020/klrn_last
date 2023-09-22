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
          <Provider store={store}>
            <NavigationContainer>
              <AppStackScreens />
            </NavigationContainer>
          </Provider>
        </UserProvider>
      </FirebaseProvider>
    </ThemeProvider>
  );
}
