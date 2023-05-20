import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import { storage } from '../firebase/config';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';

export default PostScreen = ({navigation}) => {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [lieu, setLieu] = useState("");
  const [categorie, setCategorie] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri); // utiliser setImage plutôt que setImages pour stocker l'URI de l'image sélectionnée
    }
  };

  uploadPhotoAsync = async (uri, filename) => {
        
    return new Promise(async (res, rej) => {
       const response = await fetch(uri);
       const file = await response.blob();

       let upload = firebase
           .storage()
           .ref(filename)
           .put(file);

       upload.on(
           "state_changed",
           snapshot => {},
           err => { 
               rej(err);
           },
           async () => {
               const url = await upload.snapshot.ref.getDownloadURL();
               res(url);
           }
        );
      }
    );
  };

  const addPost = async ({title, text, lieu, prix, categorie, image, localUri}) => {
    // Vérifier que toutes les données sont remplies avant d'ajouter le post
    if (title && text && lieu && prix && categorie) {
      const { uri } = image;
      const response = await fetch(uri);
      const blob = await response.blob();
  
      // Stocker l'image sur Firebase Storage
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${new Date().getTime()}`);
      await imageRef.put(blob);
  
      // Récupérer l'URL de l'image pour la stocker dans Firestore
      const imageUrl = await imageRef.getDownloadURL();
  
      // Ajouter le post à Firestore avec l'URL de l'image
      const db = firebase.firestore();
      const newPostRef = db.collection("post").doc();
  
      newPostRef.set({
        title: title,
        text: text,
        lieu: lieu,
        prix: prix,
        categorie: categorie,
        id: newPostRef.id,
        likes: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        image: imageUrl
      })
      .then(() => {
        console.log("Nouveau post ajouté avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du nouveau post :", error);
      });
    } else {
      console.log("Tous les champs sont obligatoires !");
    }
  };      
    
      return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="md-arrow-back"  size={24} color="#D8D9DB"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={addPost}>
                    <Text style={{ fontWeight: "500"}}>
                      Post
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    autoFocus={true} 
                    multiline={false} 
                    numberOfLines={1} 
                    placeholder="Titre"
                    onChangeText={setTitle}
                    value={title}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    autoFocus={true} 
                    multiline={true} 
                    numberOfLines={1} 
                    placeholder="Texte"
                    onChangeText={setText}
                    value={text}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    autoFocus={true} 
                    multiline={false} 
                    numberOfLines={1} 
                    placeholder="prix"
                    onChangeText={prix => setPrix(prix.trim())} 
                    value={prix}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    autoFocus={true} 
                    multiline={false} 
                    numberOfLines={1} 
                    placeholder="lieu"
                    onChangeText={lieu => setLieu(lieu.trim())} 
                    value={lieu}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    autoFocus={true} 
                    multiline={false} 
                    numberOfLines={1} 
                    placeholder="Categorie"
                    onChangeText={categorie => setCategorie(categorie.trim())} 
                    value={categorie}/>
            </View>
            <TouchableOpacity style={styles.photo} onPress={pickImages}>
                <Ionicons name="md-camera" size={32} color="#000" />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }} >
                <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
            </View>
        </SafeAreaView>

      );
    };   

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        marginBottom: 12
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        margin: 32,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
        
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32   
    },
});
