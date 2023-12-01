import React, {useContext} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { View } from 'react-native';
import DetailScreen from '../screens/DetailScreen'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import RecipeScreen from '../screens/RecipeScreen'
import { FontAwesome5 } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from '../Context/ThemeContext'; 
import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    const { isDarkMode } = useContext(ThemeContext);

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
                    backgroundColor: isDarkMode ? '#000' : '#f7f7f7', 
                    borderRadius: 55,
                    height: 90
                }
            }}
            screenOptions={{
                style:{
                    height:65,
                    justifyContent:"center",
                    paddingVertical:15,
                    backgroundColor: isDarkMode ? '#000' : '#eff4f0', 
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
                                top: '50%',
                                
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
                            top: '50%',
                            
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
const customTransition = {
    gestureDirection: 'vertical',
    transitionPreset: 'slow',
    cardStyleInterpolator: ({ current, layouts }) => {
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
  };
  

const Stack = createStackNavigator();
const MainStackScreens = () => {
    return(
        <Stack.Navigator screenOptions={{
            tabBarLabel:"",
            header: () => null,
            cardStyleInterpolator: customTransition.cardStyleInterpolator,
            headerStyleInterpolator: HeaderStyleInterpolators.forFade,}}>
            <Stack.Screen name="Accueil" component={BottomTabNavigator}/>
            <Stack.Screen name="Detail" component={DetailScreen} sharedElements={(route) => {
                return [route.params.post.uid];
                }}/> 
        </Stack.Navigator>
    )
}

export default MainStackScreens;