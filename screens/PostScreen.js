import React, { useState } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import { storage } from '../firebase/config';
import { uploadBytes } from 'firebase/storage';

export default PostScreen = ({navigation}) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });
        if (!result.canceled) {
          const source = {uri: result.assets[0].uri};
        console.log(source)
        setImage(source)
        }
        
    };

    const uploadImage = async (uri) => {
        setUploading(true);
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
          });

          try {
            const storageRef = ref(storage, `${firebase.storage().ref().child(image.uri.substring(image.uri.lastIndexOf('/')+1)).put(blob)})`);
            const result = await uploadBytes(storageRef, blob);  
          } catch (error) {
            alert(`error: ${error}`)
          }
      };
    
      return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.photo} onPress={pickImage}>
            <Ionicons name="md-camera" size={32} color="#000" />
          </TouchableOpacity>
          <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
            {image && <Image source={image} style={{ width: '100%', height: '100%' }} />}
          </View>
          <TouchableOpacity onPress={uploadImage}>
            <Text>Post</Text>
          </TouchableOpacity>
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
