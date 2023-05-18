import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Dimensions, Animated, FlatList } from 'react-native'
import CarouselItem from './CarouselItem'


const { width, height } = Dimensions.get('window')
/*let flatList 

function infiniteScroll(dataList){
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    setInterval(function() {
        scrolled ++
        if(scrolled < numberOfData)
        scrolled = scrollValue + width

        else {
            scrollValue = 0
            scrolled = 0
        }

        this.flatList.scrollToOffset({ animated: true, offset: scrollValue })
    }, 3000)
}*/

const Carousel = ({data}) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    //const [dataList, setDataList] = useState(data)

    /*useEffect(() => {
        setDataList(data)
        infiniteScroll(dataList)
    })*/


    if (data && data.length){
        return(
            <View>
                <FlatList data={data}
                    keyExtractor = {(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment = 'center'
                    scrollEventThrottle = {16}
                    decelerationRate = {"fast"}
                    showsHorizontalScrollIndicator ={false}
                    renderItem ={({item}) => {
                        return <CarouselItem item = {item} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX} } }]
                    )}
                />

                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View 
                                key={i}
                                style={{opacity, height: 10, width: 10, background: '#000', margin: 8, borderRadius: 5}}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    console.log('Trouvez les Images')
    return null
}

const styles = StyleSheet.create({
    dotView: { 
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default Carousel