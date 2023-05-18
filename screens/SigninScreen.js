import React from 'react'
import { View, Text, StyleSheet, Platform, Dimensions, Button, TextInput, TouchableOpacity } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'


export default SigninScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
,
    });

    const textInputChange = (val) => {
        if( val.length != 0 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }
    const handlePasswordChange = (val) => {
       
            setData({
                ...data,
                password: val,
            });
        }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
        

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Bienvenue !</Text>
            </View>
            <View style={styles.footer}>
                <View style={{marginTop: 100}}>
                    <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome5 name="envelope" color="#05375a" size={20}/>
                    <TextInput style={styles.textInput} placeholder="Email" autoCapitalize="none" onChangeText={(val) => textInputChange(val)} />
                    {data.check_textInputChange ?
                    <Animatable.View animation="bounceIn">
                                            <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View> 
                    : null}
                </View> 
                <Text style={[styles.text_footer, {marginTop: 35}]}>Mot de passe</Text>
                <View style={styles.action}>
                    <FontAwesome5 name="lock" color="#05375a" size={20}/>
                    <TextInput style={styles.textInput} placeholder="Mot de passe" autoCapitalize="none" secureTextEntry={data.secureTextEntry ? true : false} onChangeText={(val) => handlePasswordChange(val)} />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? 
                        <Feather name="eye-off" color="grey" size={20} />
                            :
                        <Feather name="eye" color="grey" size={20} />
                        }
                        
                    </TouchableOpacity>
                        
                    
                </View>
                <View style={styles.button}>
                    <LinearGradient colors={['#42e695','#3bb2b8']} style={styles.signIn}>
                        <Text style={styles.textSign}>Connexion</Text>
                    </LinearGradient>

                    <TouchableOpacity style={{marginTop: 55}} onPress={()=>navigation.navigate('SignupScreen')} >
                        <Text style={{color:'#009387'}}>Pas encore de compte ? Inscrivez-vous ici</Text>
                    </TouchableOpacity>
                </View>
            </View>
                </View>
                
        </View>
    )
}

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
})
