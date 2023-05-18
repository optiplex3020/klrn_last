import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

export default function CategoryComponent() {
  return (
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop:40, marginBottom: 40, height: 105}}
                >
                <View style={{
                    alignItems:"center",
                    flexDirection:"row",
                    backgroundColor:"#fff",
                    marginHorizontal:5,
                    borderRadius:5,
                    paddingVertical:5,
                    paddingHorizontal:15,
                    height: 85,
                    shadowOpacity: 0.4,
                    shadowColor: "#000",
                    shadowOffset: {width: 5, height: 5},
                }}>
                    <Image
                    source={require('../assets/kebab.png')}
                    style={{height:40, width:40}}
                    />
                    <Text
                    style={{
                        fontWeight:"bold",
                        fontSize:8,
                        paddingLeft:10
                        }}>Africain</Text>
                    
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