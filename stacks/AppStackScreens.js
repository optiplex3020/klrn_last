import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../Context/UserContext';
import LoadingScreen from '../screens/LoadingScreen';
import MainStackScreens from './MainStackScreens';
import AuthStackScreens from './AuthStackScreens';

export default AppStackScreens = () => {
  const AppStack = createStackNavigator();
  const [user] = useContext(UserContext);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {user.isLoggedIn === null ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : user.isLoggedIn ? (
        <AppStack.Screen name="Main" component={MainStackScreens} />
      ) : (
        <AppStack.Screen name="Auth" component={AuthStackScreens} />
      )}
    </AppStack.Navigator>
  );
};
