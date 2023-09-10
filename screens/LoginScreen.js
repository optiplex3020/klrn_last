import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, Button, TextInput, TouchableOpacity } from 'react-native'
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import styled from 'styled-components';
import {Ionicons} from '@expo/vector-icons';
import {UserContext} from '../Context/UserContext'
import {FirebaseContext} from '../Context/FirebaseContext'


export default LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const signIn = async () => {
        setLoading(true)
        try {
            await firebase.signIn(email, password)

            const uid = firebase.getCurrentUser().uid;

            const userInfo = await firebase.getUserInfo(uid);

            setUser({
                email: userInfo.email,
                profilePhotoUrl: userInfo.profilePhotoUrl,
                isAuthenticated: true,
            });
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    };
        
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.back} 
                    onPress={()=>navigation.goBack()}>
                    <Ionicons 
                        name="arrow-back" 
                        size={30} 
                        color="#fff" />
                </TouchableOpacity> 
                <Text style={styles.text_header}>Bienvenue !</Text>
            </View>
            <View style={styles.footer}>
                <View style={{marginTop: 100}}>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome5 name="envelope" color="#05375a" size={20}/>
                        <TextInput style={styles.textInput} placeholder="Email" autoCapitalize="none" onChangeText={email => setEmail(email.trim())} value={email} />
                        {data.check_textInputChange ?
                        <Animatable.View animation="bounceIn">
                                                <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View> 
                        : null}
                    </View> 
                    <Text style={[styles.text_footer, {marginTop: 35}]}>Mot de passe</Text>
                    <View style={styles.action}>
                        <FontAwesome5 name="lock" color="#05375a" size={20}/>
                        <TextInput style={styles.textInput} placeholder="Mot de passe" autoCapitalize="none" secureTextEntry={data.secureTextEntry ? true : false} onChangeText={password => setPassword(password.trim())} value={password} />
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ? 
                            <Feather name="eye-off" color="grey" size={20} />
                                :
                            <Feather name="eye" color="grey" size={20} />
                            }
                            
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={signIn} style={styles.button_o} disabled={loading}>
                        <LinearGradient colors={['#42e695','#3bb2b8']} style={styles.signIn}>
                        {loading ? (
                                <Loading />
                            ) : ( 
                                <Text style={styles.textSign}>Se connecter</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <TouchableOpacity style={{marginTop: 55}} onPress={()=>navigation.navigate('Register')}>
                            <Text style={{color:'#000'}}>Pas encore de compte ?
                                <Text style={{color:'#009387'}}> Inscrivez-vous</Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop: 20, fontWeight:"bold"}} onPress={()=>navigation.navigate('Changepw')}>
                            <Text style={{color:'#000'}}>Mot de passe oublié ?
                                <Text style={{color:'#009387'}}> Réinitialisez-le</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const Loading = styled.ActivityIndicator.attrs(props => ({
        color: "fff",
        size: "small"
    }))``;
    

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#009387'
        },
        header: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingVertical: 50,
        },
        back: {
            position: "absolute",
            top: 50,
            left: 25,
            width: 50,
            height: 50,
            borderRadius: 16,
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center"
        },
        footer: {
            flex: 3,
            backgroundColor:'#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 20,
            paddingHorizontal: 30,
        
        },
        text_header: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 30
        },
        text_footer: {
            color: '#05375a',
            fontSize: 18
        },
        action: {
            flexDirection: 'row',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5
        },
        textInput: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: "#05375a"
        },
        button: {
            alignItems: 'center',
            marginTop: 50,
            
        },
        signIn: {
            width: "100%",
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        textSign: {
            fontSize: 18,
            fontWeight: 'bold',
            color: "#fff"
        },
        button_o: {
            marginHorizontal: 5,
            marginTop: 30,
            borderRadius: 242,
            alignItems: "center",
            height: 52,
            justifyContent: "center",
        },
    })