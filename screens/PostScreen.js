import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import * as ImagePicker from "expo-image-picker";


export default HomeScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [lieu, setLieu] = useState("");
  const [categorie, setCategorie] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addPost = async () => {
    const remoteUri = await uploadPhotoAsync(image, `photos/${Date.now()}.jpg`);
    const db = firebase.firestore();
    const newPostRef = db.collection("post").doc();

    firebase.firestore()
      .collection("post")
      .add({
        title,
        id: newPostRef.id,
        text,
        lieu,
        prix,
        categorie,
        likes: [],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        image: remoteUri
      })
      .then(ref => {
        console.log("Post ajouté avec succès:");
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout du post :", error);
      });

    // Remarque : Je ne suis pas sûr de ce que vous essayez de faire avec cette ligne de code suivante,
    // elle semble inutile ici
  };

  const uploadPhotoAsync = async (uri, filename) => {
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
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={24} color="#D8D9DB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={addPost}>
          <Text style={{ fontWeight: "500" }}>Post</Text>
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

      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color="#000" />
      </TouchableOpacity>

      {image && (
        <View style={{ marginHorizontal: 32, marginTop: 32, height: 250 }}>
          <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
        </View>
      )}
    </SafeAreaView>
  );
}

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
        margin: -5,
        marginTop: 40,
        flexDirection: "row",
        marginLeft: 35,
        marginRight: 40,
        borderColor: "grey",
        borderWidth: 0.5

    },
    inputContainer2: {
        marginLeft: 93,
        flexDirection: "row"
    },
    inputContainer3: {
        marginLeft: 93,
        marginBottom: 56,
        height: 160,
        flexDirection: "row"
    },
    inputContainer4: {
        margin: 2,
        marginLeft: 93,
        marginBottom: 76,
        height: 222,
        flexDirection: "row"
    },
    TextInputContainer: {
        width: '100%'
    },
    description: {
        fontWeight: 'bold'
    },
    predefinedPlacesDescription: {
        color: '#1faadb'
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
