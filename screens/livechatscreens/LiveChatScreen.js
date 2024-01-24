import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useNavigation } from "@react-navigation/native";

const LiveChatScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (btn) => {

    navigation.navigate(`LiveChat${btn}`)


  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: responsiveHeight(10), width: responsiveWidth(100), backgroundColor: 'skyblue', alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <EvilIcons name='chevron-left' size={40} color={'white'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 5 }}>Customer Service Center</Text>
      </View>
      <TouchableOpacity onPress={() => handleNavigation(1)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image1.png')} style={{ width: '100%', height: 100, borderRadius: 20 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation(2)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image2.png')} style={{ width: '100%', height: 100, borderRadius: 20 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation(3)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image3.png')} style={{ width: '100%', height: 100, borderRadius: 20 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation(4)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image4.png')} style={{ width: '100%', height: 100, borderRadius: 20 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation(5)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image5.png')} style={{ width: '100%', height: 100, borderRadius: 20 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation(6)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image6.png')} style={{ width: '100%', height: 100, borderRadius: 20 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation(7)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image7.png')} style={{ width: '100%', height: 100, borderRadius: 20 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation(8)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image8.png')} style={{ width: '100%', height: 100, borderRadius: 20 }} />
      </TouchableOpacity>
    </ScrollView>
  )
}

export default LiveChatScreen

const styles = StyleSheet.create({
  view1: { height: responsiveHeight(14), width: responsiveWidth(98), alignSelf: 'center', resizeMode: 'contain', marginTop: 10, borderRadius: 10 }
})