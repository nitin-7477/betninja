import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Constants/Screen'
import { Colors } from '../../Constants/Colors'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native";



const AboutUs = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 1, alignSelf: 'center', backgroundColor: '#d6aa7f', paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}><TouchableOpacity
          onPress={() => navigation.navigate('Account')}
          style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: Colors.gray }}>
          <Ionicons name='return-up-back' color={'black'} size={24} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 1, fontSize: 20, color: Colors.purple, marginLeft: 110 }}>About us</Text></View>

        <Image source={require('../../../assets/aboutus.png')} style={{ height: 203, width: 250, resizeMode: 'contain' }} />

      </View>


      <TouchableOpacity
        onPress={() => navigation.navigate('Confidential')}
        style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 1, backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../assets/agreement1.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
          <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '500' }}>Confidential Agreement</Text>
        </View>
        <Feather name='chevron-right' size={20} color={Colors.fontGray} />
      </TouchableOpacity >

      <TouchableOpacity style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 1, backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../assets/agreement2.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
          <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '500' }}>Risk Disclosure Agreement</Text>
        </View>
        <Feather name='chevron-right' size={20} color={Colors.fontGray} />
      </TouchableOpacity >
    </View >
  )
}

export default AboutUs

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})