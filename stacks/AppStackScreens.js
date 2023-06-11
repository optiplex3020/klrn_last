import React, {useState, useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { onAuthStateChange } from '../Context/FirebaseContext';
import {UserContext} from '../Context/UserContext';
import LoadingScreen from '../screens/LoadingScreen';
import MainStackScreens from './MainStackScreens';
import AuthStackScreens from './AuthStackScreens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { View } from 'react-native';

import DetailScreen from '../screens/DetailScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SearchScreen from '../screens/SearchScreen'
import RecipeScreen from '../screens/RecipeScreen'
import { FontAwesome5 } from '@expo/vector-icons'
import PostScreen from '../screens/PostScreen';

export default AppStackScreens = () => {

    const AppStack = createStackNavigator();
    const [user, setUser] = useContext(UserContext);
    const screenOptionStyle = {
        tabBarLabel:"",
        header: () => null,
        cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-100, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            };
          },
        };
        const Tab = createBottomTabNavigator();
        const BottomTabNavigator = () => {
            return(
                <Tab.Navigator 
                    tabBarOptions={{
                        showLabel: false,
                        style: {
                            position: 'absolute',
                            bottom:  25,
                            left: 20,
                            right: 20,
                            elevation: 0,
                            backgroundColor: '#f7f7f7',
                            borderRadius: 15,
                            height: 90
                        }
                    }}
                    screenOptions={{
                        style:{
                            height:65,
                            justifyContent:"center",
                            paddingVertical:15,
                            backgroundColor:"#eff4f0",
                            elevation:2
                        }
                    }}
                >
                    <Tab.Screen 
                        name="Home"
                        component={HomeScreen}
                        options={{
                                headerShown: false,
                                tabBarLabel:"",
                                tabBarIcon: ({ focused }) => (
                                    <View style={{
                                        position: 'absolute',
                                        top: '50%'
                                    }}>
                                        <FontAwesome5
                                            name="home"
                                            size={20}
                                            color={focused ? '#009387' : 'grey'} />
                                    </View>
                                
                                )
                        }}
                    />
        
                    <Tab.Screen 
                        name="Search"
                        component={SearchScreen}
                        options={{
                                headerShown: false,
                                tabBarLabel:"",
                                tabBarIcon: ({ focused }) => (
                                    <View style={{
                                        position: 'absolute',
                                        top: '50%'
                                    }}>
                                        <FontAwesome5
                                            name="search"
                                            size={20}
                                            color={focused ? '#009387' : 'grey'} />
                                    </View>
                                
                                )
                        }}
                    />
        
                    <Tab.Screen
                        name="Post"
                        component={PostScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel:"",
                            tabBarIcon: ({ focused }) => (
                                <View style={{
                                    position: 'absolute',
                                    top: '50%'
                                }}>
                                    <FontAwesome5
                                        name="plus"
                                        size={20}
                                        color={focused ? '#009387' : 'grey'} />
                                </View>
                            
                            )
                        }}
                    />
        
                    <Tab.Screen
                        name="Recipe"
                        component={RecipeScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel:"",
                            tabBarIcon: ({ focused }) => (
                                <View style={{
                                    position: 'absolute',
                                    top: '50%'
                                }}>
                                    <FontAwesome5
                                        name="heart"
                                        size={20}
                                        color={focused ? '#009387' : 'grey'} />
                                </View>
                            
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel:"",
                            tabBarIcon: ({ focused }) => (
                                <View style={{
                                    position: 'absolute',
                                    top: '50%'
                                }}>
                                    <FontAwesome5
                                        name="user"
                                        size={20}
                                        color={focused ? '#009387' : 'grey'} />
                                </View>
                            
                            )
                        }}
                    />
                </Tab.Navigator>
            );
        };
        useEffect(() => {
            const unsubscribe = onAuthStateChange();
            return () => {
              unsubscribe();
            };
          }, []);    
 
    return (
        <AppStack.Navigator screenOptions={{headerShown: false}}>
            {user.isLoggedIn ? (
                <>
                    <AppStack.Screen name="Main" component={BottomTabNavigator}/>
                    <AppStack.Screen name="Detail" component={DetailScreen} sharedElements={(route) => {
                        return [route.params.post.uid];}}
                    /> 
                </>

                ) : (
                    <>
                        <AppStack.Screen name="Auth" component={AuthStackScreens} />
                    </>
                )
            }
        </AppStack.Navigator>
        
    )
}