import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'



const sliderImages = [

  { id: 1, image: require('../../assets/poster/poster1.png'), },
  { id: 2, image: require('../../assets/poster/poster2.png'), },
  { id: 3, image: require('../../assets/poster/poster3.png'), },
  { id: 4, image: require('../../assets/poster/poster4.png'), },
  { id: 5, image: require('../../assets/poster/poster5.png'), },

]

const MainSlider = () => {
  return (
    <View>
      <FlatList data={sliderImages} horizontal contentContainerStyle={{paddingHorizontal:5}}
        renderItem={({ item }) => {
          return <View style={styles.slider}>
            <Image source={item.image} style={{ height: 170, width: 330, borderRadius: 10, marginHorizontal: 10 }} /></View>
        }} />
    </View>
  )
}

export default MainSlider

const styles = StyleSheet.create({
  slider: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 6,

  }
})