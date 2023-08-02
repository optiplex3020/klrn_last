import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'

                    {/**shadowOpacity: 0.4,
                    shadowColor: "#000",
                    shadowOffset: {width: 5, height: 5}, */}
                    
export default function CategoryComponent() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:10, marginBottom: -10, height: 105}}>
      <View style={{ alignItems:"center" }}>
        <View style={styles.item}>
          <Image source={require('../assets/p8.png')} style={{height:40, width:40}}/>
          <Text style={{fontWeight: "normal",fontSize:15, alignItems:"center"}}>
              Américain
          </Text>  
        </View>
        </View>
        <View style={{ alignItems:"center" }}>
        <View style={styles.item}>
          <Image source={require('../assets/ind.jpg')} style={{height:40, width:40}}/>
          <Text style={{fontWeight: "normal",fontSize:15, alignItems:"center"}}>
              Indien
          </Text>  
        </View>
        </View>
        <View style={{ alignItems:"center" }}>
        <View style={styles.item}>
          <Image source={require('../assets/spag.png')} style={{height:40, width:40}}/>
          <Text style={{fontWeight: "normal",fontSize:15, alignItems:"center"}}>
              Européen
          </Text>  
        </View>
        </View>
        <View style={{ alignItems:"center" }}>
        <View style={styles.item}>
          <Image source={require('../assets/mex.png')} style={{height:40, width:40}}/>
          <Text style={{fontWeight: "normal",fontSize:15, alignItems:"center"}}>
              Mexicain
          </Text>  
        </View>
        </View>
    </ScrollView>
        )
    }

    const styles = StyleSheet.create({
        item: {
            alignItems:"center",
            flexDirection: "row",
            backgroundColor:"#fff",
            marginHorizontal:25,
            borderRadius:95,
            paddingVertical:5,
            paddingHorizontal:5,
        }
            
    })
    