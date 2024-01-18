import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Constants/Screen'
import { Colors } from '../../Constants/Colors'
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from 'react-native-responsive-dimensions'



const AboutUs = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 1, alignSelf: 'center', backgroundColor: '#d6aa7f' }}>
        <View style={{ width: '100%', backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>About Us</Text>
        </View>

        <Image source={require('../../../assets/aboutus.png')} style={{ height: 203, width: 250, resizeMode: 'contain' }} />

      </View>


      <TouchableOpacity
        onPress={() => navigation.navigate('Confidential')}
        style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 1, backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../assets/agreement1.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
          <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '500', color: 'black' }}>Confidential Agreement</Text>
        </View>
        <Feather name='chevron-right' size={20} color={Colors.fontGray} />
      </TouchableOpacity >

      <TouchableOpacity
        onPress={() => navigation.navigate('RiskDisclosure')}
        style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 1, backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../assets/agreement2.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
          <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '500', color: 'black' }}>Risk Disclosure Agreement</Text>
        </View>
        <Feather name='chevron-right' size={20} color={Colors.fontGray} />
      </TouchableOpacity >
    </ScrollView>
  )
}

export default AboutUs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center', width: responsiveWidth(100)
  }
})