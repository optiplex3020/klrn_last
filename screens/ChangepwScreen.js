import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, StatusBar, LayoutAnimation  } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";
import firebase from "firebase/compat/app";
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';


export default ChangepwScreen = ({navigation}) => {

    const [email, setEmail] = useState(); 
    
    const Reset = async () => {      
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
        }        
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
                <View style={styles.greeting}>
                    <Text style={styles.title}>
                        {"Mot de passe oublié ?"}
                    </Text>
                    <Text style={styles.subtitle}>
                        Inscrivez votre email pour recevoir un mail de rénitialisation
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <TextInput 
                    style={styles.textinput}
                    placeholder="Votre email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={email => setEmail(email.trim())} 
                    value={email}
                    />
                    <View style={styles.button}>
                        <TouchableOpacity onPress={Reset}>
                            <LinearGradient colors={['#42e695','#3bb2b8']} style={styles.signIn}>
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    Changer le mot de passe
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#009387",
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
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
    greeting: {
        marginTop: -200
    },
    title: {
        color: "#fff",
        marginTop: 105,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center"
            },
    subtitle: {
        marginTop: 10,
        textAlign: "center",
        color: "black",
        fontWeight: "300",
    },
    footer: {
        flex: 1,
        backgroundColor:'#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        height:900
    },
    signIn: {
        width: 250,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row'
    },
    textinput: {
        borderBottomColor: "#000",
        marginTop: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        alignContent: "center",
        fontSize: 15,
        marginHorizontal: 5,
        color: "#000000"

    }, 
})