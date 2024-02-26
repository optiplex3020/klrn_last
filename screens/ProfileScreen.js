import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {UserContext} from '../Context/UserContext'
import {FirebaseContext} from '../Context/FirebaseContext'
import { ThemeContext } from '../Context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
export default  ProfileScreen = ({navigation}) => {

    const [user, setUser] = useContext(UserContext);
    const { auth } = useContext(FirebaseContext); 
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const firebase = useContext(FirebaseContext); 


    console.log(auth); // Add this to debug

    const logOut = async () => {
        try {
            await firebase.logOut(); // Appel de la méthode logOut de FirebaseContext
            setUser({ ...user, isAuthenticated: false }); // Mise à jour de l'état d'authentification dans UserContext
            navigation.navigate('SplashStack'); // Redirection vers SplashStack après la déconnexion
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    return(

        <View style={styles.container}>
            <View style={{marginTop: 214, alignItems: "center" }}>
                <TouchableOpacity onPress={logOut}>
                    <Text>
                        Déconnexion
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuItem, isDarkMode && styles.menuItemDark]} onPress={toggleDarkMode}>
                    <Ionicons
                      name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
                      size={24}
                      color={isDarkMode ? 'white' : 'black'} // Changez la couleur en fonction du mode sombre
                    />
                    <Text style={[styles.menuText, isDarkMode && styles.menuTextDark]}>
                      Mode {isDarkMode ? 'clair' : 'sombre'}
                    </Text>
                  </TouchableOpacity>
            </View>     
        </View>
    
        );
    
    }
    
    
    const styles = StyleSheet.create({
    
    container:{
        flex: 1,
    },
    
    avatarContainer:{
        shadowColor: "#151734",
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    
    name: {  
        marginTop: 24,
        fontSize: 16,
        fontWeight: "bold",
        alignContent: "center"
    },
    menuItem: {
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      menuItemDark: {
        backgroundColor: '#000', 
      },
    
    });
    