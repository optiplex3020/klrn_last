import React, { useState } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";

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
    const source = {uri: result.assets[0].uri}
    console.log(source)
    setImage(source)
};

const uploadImage = async () => {
  setUploading(true)
  const response = await fetch(image.uri)
  const blob = response.blob()
  const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
  var ref = firebase.storage().ref().child(filename).put(blob)
  try {
      await ref;
  } catch (e){
      console.log(e)
  }
  setUploading(false)
  Alert.alert(
      'Photo uploaded!'
  );
  setImage(null);
};

    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.photo} onPress={pickImage}>
              <Ionicons name="md-camera" size={32} color="#000" />
          </TouchableOpacity>
          <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }} >
              <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
          </View>
          <TouchableOpacity onPress={uploadImage}>
            <Text>Post</Text>
          </TouchableOpacity>
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
