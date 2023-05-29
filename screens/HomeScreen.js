import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, RefreshControl, TouchableOpacity, FlatList, ScrollView, Image, TextInput, AnimatableTouchableOpacity, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import SearchComponent from '../components/SearchComponent';
import {UserContext} from '../Context/UserContext'
import { SharedElement } from 'react-native-shared-element';
import CategoryComponent from '../components/CategoryComponent';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import "firebase/compat/firestore";
require('firebase/compat/firestore')

export default HomeScreen = ({navigation}) => {
    const CategoryList = () => {
        return (
            <View style={styles.containerCategory}>
                {categories.map((item, index)=> (
                    <TouchableOpacity 
                        key={index}
                        activeOpacity={0.8} 
                        onPress={() => setCategoryIndex(index)}>
                        <Text style={[styles.categorytext, categoryIndex == index && styles.categoryTextSelected]}>{item}</Text> 
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
    const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(Pressable)
    const [snapshot, setSnapshot] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [post, setPost ] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [lastDoc, setLastDoc ] = useState(null);
    const [loading, setLoading ] = useState(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const [user, setUser] = useContext(UserContext);
    const [username, setUsername] = useState('');
    const refPosts = firebase.firestore().collection('post');
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
    });
    const getPosts = async () => {
        setLoading(true);
        const snapshot = await refPosts.orderBy('timestamp', 'desc').limit('10').get();
        if (!snapshot.empty) {
            let newPosts = [];
            setLastDoc(snapshot.docs[snapshot.docs.length -1]);
            for ( let i = 0; i < snapshot.docs.length; i++) {
                newPosts.push(snapshot.docs[i].data());
            }
            setPost(newPosts);
        } else {
            setLastDoc(null);
        }

        setLoading(false);
      {/*ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setPost(items); 
            setLoading(false)
        });*/}  
    }
    

    useEffect(() => {
        getPosts();
    }, []);

    const onRefresh = () => {
        //set isRefreshing to true
        setIsRefreshing(true)
        getPosts()
        setIsRefreshing(false)
        // and set isRefreshing to false at the end of your callApiMethod()
    } 
    const animation = {
        from: {
            opacity: 0,
            translateY: 90
        },
        to: {
            opacity: 1,
            translateY: 0
        },
    }
    useEffect(() => {
        // récupérer l'uid de l'utilisateur actuel
        const uid = firebase.auth().currentUser.uid;
    
        // accéder à la collection Firestore contenant l'username de l'utilisateur
        const userRef = firebase.firestore().collection('users').doc(uid);
    
        // récupérer les données de l'utilisateur correspondant à l'uid
        userRef.get().then((doc) => {
          if (doc.exists) {
            setUsername(doc.data().username);
          } else {
            console.log('No such document!');
          }
        });
      }, []);
    return ( 
        <View style={styles.container}>
              <View style={styles.subheader}>
                <Text style={styles.hi}>Bonjour, {username}</Text>
                <SearchComponent/>
            </View>
            <View style={styles.main}>
                <CategoryComponent/>
                <Text style={styles.recommand}>
                    Nos Recommandations
                </Text>
            </View>
            <FlatList
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={post}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 50,
                    paddingBottom: 50,
                    marginBottom: 55,
                }}
                keyExtractor={(item) => item.id} 
                numColumns={2}
                refreshControl = {
                    <RefreshControl 
                        refreshing={isRefreshing} 
                        onRefresh={onRefresh}
                        tintColor="#F8852D"/> }
                extraData={selectedId}
                renderItem={({ item }) => (
                    <View>
                        <AnimatableTouchableOpacity style={styles.item} animation={animation}
                            onPress={() => {
                                navigation.navigate("Detail", {
                                    item: item,
                                });
                            }}>
                            <SharedElement id={`${item.id}.image`}>
                                <Image source={{uri:item.image}} style={{width: 150, height: 150, borderRadius: 15}}/>
                            </SharedElement>
                                
                            <SharedElement id={`${item.id}.title`}>
                                <Text style={styles.title}>{item.title}</Text>
                                <SharedElement id={`${item.text}.text`}>
                                    <Text style={styles.text}>{item.categorie}</Text>
                                    <Text style={styles.text}>{item.prix}€</Text>
                                </SharedElement>
                            </SharedElement>
                        </AnimatableTouchableOpacity>
                    </View>
                )}
            />  
            
            
        </View>
        );
    }
    const width = Dimensions.get('screen').width/2
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height:"100%",
            backgroundColor: "#f7f7f7"
            //backgroundColor: "#linear-gradient(to bottom, #00ff00 0%, #000f66 100%);"
        },
        text: {
            fontSize:10,
            paddingHorizontal:1,
            color:"#848385"
        },
        title: {
            fontSize:18,
            fontWeight:"bold",
        },
        item: {
            height: 190,
            width: width,
            fontSize: 12,
            fontWeight: 'bold',
            elevation: 10,
            marginHorizontal: 2,
            borderRadius: 10,
            marginBottom: 20,
            padding: 15,
            shadowColor: '#000',
            
            
        },
        containerCategory: {
            flexDirection: "row",
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 30,
            marginRight: 30,
            justifyContent: 'space-between'
        },
        categorytext: {
            fontSize: 16,
            color: 'grey',
            fontWeight: 'bold',
        },
        categoryTextSelected: {
            color: "#00a46c",
            paddingBottom: 5,
            borderBottomWidth: 2,
            borderColor: "#00a46c",
        },
        header: {
            backgroundColor: "#f7f7f7",
            height:"25%",
            paddingHorizontal:20,
        },
        menu: {
            height:10,
            width:20,
            marginTop:50,
        },
        subheader: {
            marginTop:35,
            paddingHorizontal: 20,
            paddingVertical: 20,

        },
        hi: {
            fontSize:28,
            color:"#000",
            fontWeight:"bold",
            marginBottom: 30,
        },
        main: {
            width: "100%",
            marginTop: 55,
            paddingHorizontal:20,
        },
        recommand: {
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
        },
        grad: {
            left:0,
            right:0,
            height:90,
            marginTop:-45
        },
        searchview: {
            backgroundColor:"#fff",
            paddingVertical:8,
            paddingHorizontal:20,
            marginHorizontal:20,
            borderRadius:15,
            marginTop:-25,
            flexDirection:"row",
        },
        searchtext: {
            fontWeight:"bold",
            fontSize:18,
            width:260
        },
        feedItem: {
            backgroundColor: "#FFF",
            borderRadius: 5,
            padding: 8,
            flexDirection: "row",
            marginVertical: 8 
        },
        avatar: {
            width: 36,
            height: 36,
            borderRadius: 18,
            marginRight: 16
        },
        name: {
            fontSize: 15,
            fontWeight: "500",
            color: "#454D65",
        },
        timestamp: {
            fontSize: 11,
            color: "#C4C6CE",
            marginTop: 4
        },
        post: {
            marginTop: 16,
            fontSize: 14,
            color: "#838899"
        },
        postImage: {
            width: undefined,
            height: 150,
            borderRadius: 5,
            marginVertical: 16
        }, 
        places: {
            marginTop: 25,
            marginLeft: 25,
            marginRight: 25
        },
        placestext: {
            fontWeight: "bold",
            fontSize: 15
        },
        inputcontainer: {
            marginTop: -25
        },
    });