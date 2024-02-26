import React, { useEffect, useState } from 'react';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './stacks/AppStackScreens';
import { UserProvider } from './Context/UserContext';
import { FirebaseProvider } from './Context/FirebaseContext';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import { ThemeProvider } from './Context/ThemeContext';



export default function App() {
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
