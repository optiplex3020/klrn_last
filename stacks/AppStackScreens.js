import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../Context/UserContext';
import LoadingScreen from '../screens/LoadingScreen';
import MainStackScreens from './MainStackScreens';
import FirstStackScreens from './FirstStackScreens';

export default AppStackScreens = () => {
  const AppStack = createStackNavigator();
  const [user] = useContext(UserContext);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {user.isAuthenticated === false ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : user.isAuthenticated ? (
        <AppStack.Screen name="Main" component={MainStackScreens} />
      ) : (
        <AppStack.Screen name="SplashStack" component={FirstStackScreens} />      
      )
      }
    </AppStack.Navigator>
  );
};
