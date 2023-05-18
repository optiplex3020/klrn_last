import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, Button, TextInput, TouchableOpacity } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import {UserContext} from '../Context/UserContext'
import {FirebaseContext} from '../Context/FirebaseContext'
//import firebase from "firebase/compat/app";

export default SignupScreen = ({navigation}) => { 


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState();
    const firebase = useContext(FirebaseContext)
    const [_, setUser] = useContext(UserContext)
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
,
    });

    const signUp = async () => {
        setLoading(true);

        const user = {username, email, password};

        try {
            const createdUser = await firebase.createUser(user)

            setUser({ ...createdUser, isLoggedIn: true});
        } catch (error) {
            console.log("Error @signUp: ", error)
        } finally {
            setLoading(false)
        }
    };

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
                <Text style={styles.text_header}>Inscrivez-vous pour commencer</Text>
            </View>
            <View style={styles.footer}>
                <View style={{marginTop: 100}}>
                    <Text style={styles.text_footer}>Nom d'utilisateur</Text>
                    <View style={styles.action}>
                        <FontAwesome5 name="user" color="#05375a" size={20}/>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Pseudo" 
                            autoCapitalize="none" 
                            //onChangeText={(val) => textInputChange(val)}
                            keyboardType="default"
                            autoCorrect={false}
                            autoFocus={true}
                            autoCompleteType="username"
                            onChangeText={(username) => setUsername(username.trim())} 
                            value={username} />
                     </View>
                    <Text style={[styles.text_footer, {marginTop: 35}]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome5 name="envelope" color="#05375a" size={20}/>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Email" 
                        autoCapitalize="none" 
                        //onChangeText={(val) => textInputChange(val)}
                        autoFocus={true}
                        autoCorrect={false}
                        onChangeText={email => setEmail(email.trim())} 
                        value={email}
                        keyboardType="email-address" 
                    />
                    {data.check_textInputChange ?
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View> 
                    : null}
                </View> 
                <Text style={[styles.text_footer, {marginTop: 35}]}>
                    Mot de passe
                </Text>
                <View style={styles.action}>
                    <FontAwesome5 name="lock" color="#05375a" size={20}/>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Mot de passe" 
                        autoCapitalize="none" 
                        secureTextEntry={data.secureTextEntry ? true : false} 
                        //onChangeText={(val) => handlePasswordChange(val)}
                        autoCompleteType="password"
                        autoCorrect={false}
                        autoFocus={true}
                        onChangeText={password => setPassword(password.trim())}
                        value={password}/>
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? 
                        <Feather name="eye-off" color="grey" size={20} />
                            :
                        <Feather name="eye" color="grey" size={20} />
                        }
                        
                    </TouchableOpacity>
                        
                    
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={{marginTop: 55}} onPress={signUp} disabled={loading}>
                        <LinearGradient colors={['#42e695','#3bb2b8']} style={styles.signIn}>
                            <Text style={styles.textSign}>Inscription</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signin')} >
                        <Text style={{color:'#009387'}}>Déja inscrit ? Connectez-vous ici</Text>
                    </TouchableOpacity>
                    {/* 
                            {loading ? (
                        <ActivityIndicator />
                    ) : ()}
                        
                    </TouchableOpacity>*/} 
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
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
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
        width: 350,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    },
})
