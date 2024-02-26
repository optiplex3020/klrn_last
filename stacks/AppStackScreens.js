import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../Context/UserContext';
import LoadingScreen from '../screens/LoadingScreen';
import MainStackScreens from './MainStackScreens';
import FirstStackScreens from './FirstStackScreens';

export default AppStackScreens = () => {
  const AppStack = createStackNavigator();
  const [user] = useContext(UserContext);

  useEffect(() => {
    // Log pour vérifier si l'utilisateur est authentifié et afficher son nom d'utilisateur
    if (user.isAuthenticated) {
      console.log(`L'utilisateur est authentifié. Nom d'utilisateur: ${user.email}`);
    } else {
      console.log("L'utilisateur n'est pas authentifié.");
    }
  }, [user.isAuthenticated, user.email]); // Dépendances pour ré-exécuter le useEffect si ces valeurs changent

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {user.isAuthenticated ? (
        <AppStack.Screen name="Main" component={MainStackScreens} />
      ) : user.isAuthenticated === null ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : (
        <AppStack.Screen name="SplashStack" component={FirstStackScreens} />
      )}
    </AppStack.Navigator>
  );
};
