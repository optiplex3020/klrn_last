import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'

                    {/**shadowOpacity: 0.4,
                    shadowColor: "#000",
                    shadowOffset: {width: 5, height: 5}, */}
                    
export default function CategoryComponent() {
  return (
    <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:40, marginBottom: 40, height: 105}}>
            <View style={{ alignItems:"center" }}>
                <View style={styles.item}>
            <Image
            source={require('../assets/kebab.png')}
            style={{height:40, width:40}}
            />
            
        </View>
            <Text style={{fontWeight: "normal",fontSize:18, alignItems:"center", marginTop:15}}>
                Africain
            </Text>  
    </View>
        
        
        <View style={{
            alignItems:"center",
            flexDirection:"row",
            backgroundColor:"#fff",
            marginHorizontal:5,
            borderRadius:5,
            paddingVertical:5,
            paddingHorizontal:15,
        }}>
            <Image
            source={require('../assets/p9.png')}
            style={{height:40, width:40}}
            />
            <Text
                style={{
                fontWeight:"bold",
                fontSize:18,
                paddingLeft:10
                }}>Asiatique</Text>
            
        </View>
        
        <View style={{
            alignItems:"center",
            flexDirection:"row",
            backgroundColor:"#fff",
            marginHorizontal:5,
            borderRadius:5,
            paddingVertical:5,
            paddingHorizontal:15,
        }}>
            <Image
            source={require('../assets/p8.png')}
            style={{height:40, width:40}}
            />
            
        </View> 
        <View>
            <Text
                style={{
                fontWeight:"bold",
                fontSize:18,
                paddingLeft:10
                }}>Snack</Text>

        </View>
    </ScrollView>
    </View>
            
        )
    }

    const styles = StyleSheet.create({
        item: {
            alignItems:"center",
            backgroundColor:"#fff",
            marginHorizontal:25,
            borderRadius:95,
            paddingVertical:5,
            paddingHorizontal:15,
        }
            
    })
    