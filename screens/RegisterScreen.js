import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar,  } from 'react-native';
import {UserContext} from '../Context/UserContext'
import {FirebaseContext} from '../Context/FirebaseContext'
import {LinearGradient} from 'expo-linear-gradient';
import styled from 'styled-components'
import { ActivityIndicator } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import db from '../firebase/db';
import firebase from "firebase/compat/app";

export default  RegisterScreen = ({navigation}) => { 
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false);
    const [_, setUser] = useContext(UserContext)   

    const signUp = async () => {
        setLoading(true);

        try {
            const auth = getAuth();
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await db.collection('users').doc(user.uid).set({
              username,
              email,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),

            });
            setUser({
              uid: user.uid,
              email: user.email,
              username,
              isLoggedIn: true
            });
            console.log('compte crée avec succès !');
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false)
        }
    };   
            
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
                    <Ionicons 
                        name="arrow-back" 
                        size={30} 
                        color="#fff" />
                </TouchableOpacity> 
                <View style={{width:"100%", marginLeft:15}} >
                    <Text style={styles.greeting}>{'Bienvenue\nIncrivez-vous\npour commencer'}</Text>
                </View>
            </View> 
            <View style={styles.footer}>
                <View style={styles.form}>
                    <View style={{marginTop: -50}}>
                        <Text style={styles.inputTitle}>
                            Pseudo
                        </Text>
                        <TextInput
                            keyboardType="default"
                            style={styles.input}
                            autoCapitalize="none"
                            autoFocus={true}
                            autoCorrect={false}
                            onChangeText={username => setUsername(username.trim())}
                            value={username}
                        />
                    </View>
                    <View style={{marginTop: 25}}>
                        <Text style={styles.inputTitle}>
                            Email
                        </Text>
                        <TextInput
                            keyboardType="email-address"
                            style={styles.input}
                            autoCapitalize="none"
                            autoCompleteType="email"
                            autoFocus={true}
                            autoCorrect={false}
                            onChangeText={email => setEmail(email.trim())} 
                            value={email}
                        />
                    </View>
                    <View style={{marginTop: 24}}>
                        
                        <Text style={styles.inputTitle}>
                            Mot de passe
                        </Text>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCompleteType="password"
                            autoCorrect={false}
                            autoFocus={true}
                            onChangeText={password => setPassword(password.trim())}
                            value={password}
                        />
                    </View>
                    <TouchableOpacity onPress={signUp} disabled={loading} style={styles.button}>
                        <LinearGradient colors={['#42e695','#3bb2b8']} style={styles.signIn}>
                            {loading ? (
                                <ActivityIndicator />
                            ) : (
                            <Text style={{ color: "#FFF", fontWeight: "500" }}>
                                S'inscrire
                            </Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.button_o}>
                        <TouchableOpacity  style={{fontWeight:"bold", marginTop: 0 }} onPress={() => navigation.navigate("Login")}>
                            <Text style={{color: "#000"}}> Déjà sur MeetFood ?
                                <Text style={{color: "#009387"}}>Se connecter</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
        
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#009387"
        },
        header: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingVertical: 50,
        },
        greeting: {
            color: "#fff",
            marginTop: 105,
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "left"
        },
        button_o: {
            alignItems: 'center',
            marginTop: 50,
            
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
        errorMessage: {
            height: 72,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 30,
            color: "#000",
            marginBottom: 17
        },
        error:
         {
            color: "#E9446A",
            fontSize: 13,
            fontWeight: "600",
            textAlign: "center"
        },
        inputTitle: {
                    color: "#000",
                    fontSize: 10,
                    textTransform: "uppercase"
        },
        
        form: {
            marginTop: 120,
            
            marginHorizontal: 5,
            borderRadius: 242,
        },
        footer: {
            flex: 3,
            backgroundColor:'#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 20,
            paddingHorizontal: 30,
        
        },
        input: {
          borderBottomColor: "#000",
          borderBottomWidth: StyleSheet.hairlineWidth,
          height: 40,
          fontSize: 15,
          color: "#000"

        },
        button: {
            marginHorizontal: 30,
            marginTop: 90,
            borderRadius: 242,
            alignItems: "center",
            height: 52,
            justifyContent: "center",
        },
        signIn: {
            width: "100%",
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        add: {
            fontSize: 42,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center"
        },
        avatar: {
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: 50,
            
        },
        avatarPlaceHolder: {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#E1E2E6",
            marginTop: 60,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 139
        }
    });