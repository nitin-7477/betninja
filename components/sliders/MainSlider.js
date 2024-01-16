import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'



const sliderImages = [

  { id: 1, image: require('../../assets/poster/poster1.png'), },
  { id: 2, image: require('../../assets/poster/poster2.png'), },
  { id: 3, image: require('../../assets/poster/poster3.png'), },
  { id: 4, image: require('../../assets/poster/poster4.png'), },
  { id: 5, image: require('../../assets/poster/poster5.png'), },

]

const MainSlider = () => {
  return (

    <FlatList pagingEnabled data={sliderImages} horizontal
      renderItem={({ item }) => {
        return <View style={styles.slider}>
          <Image source={item.image} style={{ height: 170, width: '95%', borderRadius: 10, marginHorizontal: 1 }} /></View>
      }} />

  )
}

export default MainSlider

const styles = StyleSheet.create({
  slider: {
    justifyContent: 'center', alignItems: 'center', flex: 1, width: responsiveWidth(100), alignSelf: 'center'

  }
})