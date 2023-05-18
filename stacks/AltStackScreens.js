import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import PostScreen from '../screens/PostScreen'
import ChangepwScreen from '../screens/ChangepwScreen'

export default AuthStackScreens = () => {
    const AuthStack = createStackNavigator();
    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="Home" component={HomeScreen} />
            <AuthStack.Screen name="Post" component={PostScreen} />
            <AuthStack.Screen name="Changepw" component={ChangepwScreen} />
        </AuthStack.Navigator>
    )
}