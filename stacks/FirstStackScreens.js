import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import ChangepwScreen from '../screens/ChangepwScreen'
import SplashScreen from '../screens/SplashScreen'
import FirstScreen from '../screens/FirstScreen'
import SignupScreen from '../screens/SignupScreen'

export default FirstStackScreens = () => {
    const FirstStack = createStackNavigator();
    return (
        <FirstStack.Navigator 
          initialRouteName="SplashScreen"
          screenOptions={{headerShown: false, cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            };
          },
          transitionSpec: {
            open: 300, // Utilisez la spécification de transition iOS par défaut
            close: {
              animation: 'timing',
              config: {
                duration: 300, // Augmentez la durée de la transition
              },
            },
          },
        }}>
          <FirstStack.Screen name="Splash" component={SplashScreen} />            
          <FirstStack.Screen name="First" component={FirstScreen} />
          <FirstStack.Screen name="Register" component={SignupScreen} />
          <FirstStack.Screen name="Login" component={LoginScreen} />
          <FirstStack.Screen name="Changepw" component={ChangepwScreen} />
      </FirstStack.Navigator>
  )
}