import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import ChangepwScreen from '../screens/ChangepwScreen'
import FirstScreen from '../screens/FirstScreen'
import SigninScreen from '../screens/SigninScreen'
import SignupScreen from '../screens/SignupScreen'

export default AuthStackScreens = () => {
    const AuthStack = createStackNavigator();
    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="First" component={FirstScreen} />
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
            <AuthStack.Screen name="Changepw" component={ChangepwScreen} />
        </AuthStack.Navigator>
    )
}