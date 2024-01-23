import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { SliderBox } from "react-native-image-slider-box";


const sliderImages = [

  require('../../assets/poster/poster6.png'),
  require('../../assets/poster/poster7.png'),
  require('../../assets/poster/poster8.png'),
  require('../../assets/poster/poster9.png'),
  require('../../assets/poster/poster10.png')

]
const customImageComponent = (props) => (
  <View style={styles.customImageContainer}>
    <Image {...props} style={styles.customImage} />
  </View>
);

const MainSlider = () => {
  return (
    <View style={{ flex: 1, width: '100%', alignSelf: 'center', borderRadius: 10 }}>
      <SliderBox
        images={sliderImages}
        dotColor="black"
        dotStyle={{ height: 8, width: 8 }}
        imageLoadingColor="black"
        autoplay={true}
        circleLoop={true}
        ImageComponent={customImageComponent}
      />
    </View>
    
    // <FlatList pagingEnabled data={sliderImages} horizontal
    //   renderItem={({ item }) => {
    //     return <View style={styles.slider}>
    //       <Image source={item.image} style={{ height: 170, width: '95%', borderRadius: 10, marginHorizontal: 1 }} /></View>
    //   }} />

  )
}

export default MainSlider

const styles = StyleSheet.create({
  slider: {
    justifyContent: 'center', alignItems: 'center', flex: 1, width: responsiveWidth(100), alignSelf: 'center'

  },

  customImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customImage: {
    height: 170,
    width: '95%',
    borderRadius: 10,
    marginHorizontal: 1,
  },
})