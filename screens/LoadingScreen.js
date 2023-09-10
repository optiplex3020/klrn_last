import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import {LinearGradient} from 'expo-linear-gradient';
import {UserContext} from '../Context/UserContext'

import {FirebaseContext} from '../Context/FirebaseContext'

export default LoadingScreen = () => {
   const [_, setUser] = useContext(UserContext);
   const firebase = useContext(FirebaseContext);
       useEffect(() => {

            setTimeout(async () => {
                const user = firebase.getCurrentUser()



                if (user) {
                    const userInfo = await firebase.getUserInfo(user.uid)


                    setUser({
                        isAuthenticated: true,
                        email: userInfo.email,
                        uid: userInfo.uid,
                        username: userInfo.username,
                    })
                } else {
                    setUser((state) => ({...state, isAuthenticated: false}));
                }
                
            }, 500);
       }, [])
            return (
                    <LinearGradient colors={[ '#FF57B9','#c53364',]} >
                        <Container>
                                <Text>
                                KoLia
                            </Text>

                            <LottieView
                                source={require("../assets/loading.json")} 
                                autoPlay
                                loop
                                style={{ width: "50%"}}/>
                            
                        </Container>
                    </LinearGradient>
            );
        
    };

const Container = styled.View`

    flex: 1;
    align-items: center;
    justify-content: center; 
    
    `