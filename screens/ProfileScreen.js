import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {UserContext} from '../Context/UserContext'
import {FirebaseContext} from '../Context/FirebaseContext'
import { getAuth, signOut } from "firebase/auth";


export default  ProfileScreen = ({navigation}) => {

    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const auth = getAuth();
   

    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
        
    };
 const loggedOut =  logOut();
        navigation.navigate('Auth')

        
        if (loggedOut) {
            setUser((state) => ({...state, isLoggenIn: false}));
        }
    return(

        <View style={styles.container}>
            <View style={{marginTop: 214, alignItems: "center" }}>
              <Text style={styles.name}>{user.username}</Text>
            </View>  
            <View style={styles.subContainer}>
                <View style={styles.stat}>
                    <Text style={styles.Amount}>21</Text>
                    <Text style={styles.Title}>Plats</Text>  
                </View>
                <View style={styles.stat}>
                    <Text style={styles.Amount}>242</Text>
                    <Text style={styles.Title}>Abonnés</Text>  
                </View>
                <View style={styles.stat}>
                    <Text style={styles.Amount}>242</Text>
                    <Text style={styles.Title}>Abonnements</Text>  
                </View>
            </View>   
            <View>
                <TouchableOpacity onPress={logOut}>
                    <Text>
                        Déconnexion
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
    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32,
    },
    
    stat: {
        alignItems:"center",
        flex: 1,
    },
    
    info: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    
    Title: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    },
    Amount: {
        color: "#000",
        fontSize: 18,
        fontWeight: "600"
    
    }
    
    });
    