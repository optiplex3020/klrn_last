import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { View } from 'react-native';

import DetailScreen from '../screens/DetailScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SearchScreen from '../screens/SearchScreen'
import RecipeScreen from '../screens/RecipeScreen'
import { FontAwesome5 } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack';
import PostScreen from '../screens/PostScreen';

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
                    borderRadius: 55,
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
                                name="shopping-cart"
                                size={20}
                                color={focused ? '#009387' : 'grey'} />
                        </View>
                    
                    )
                }}
            />
        </Tab.Navigator>
    );
};


const Stack = createStackNavigator();
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
    }

const MainStackScreens = () => {
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Acceuil" component={BottomTabNavigator}/>
            <Stack.Screen name="Detail" component={DetailScreen} sharedElements={(route) => {
                return [route.params.post.uid];
                }}/> 
        </Stack.Navigator>
    )
}

export default MainStackScreens;