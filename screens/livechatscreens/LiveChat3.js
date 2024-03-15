import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useNavigation } from "@react-navigation/native";
import DocumentPicker from 'react-native-document-picker';
import { useState } from 'react';
const LiveChat3 = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={{ height: responsiveHeight(7), width: responsiveWidth(100), backgroundColor: 'white', alignItems: 'center', flexDirection: 'row', borderBottomStartRadius: 15, borderBottomEndRadius: 15, elevation: 5 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <EvilIcons name='chevron-left' size={40} color={'black'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 5 }}>IFSC modification</Text>
      </View>
      <TouchableOpacity onPress={() => handleNavigation(1)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image3.png')} style={{ width: '100%', height: 100, borderRadius: 10 }} />
      </TouchableOpacity>
      <View style={{ width: '97%', alignSelf: 'center', marginTop: 10, marginBottom: 5 }}>
        <Text style={{ color: 'black' }}>ID Account</Text>
      </View>
      <View style={{ width: '97%', alignSelf: 'center', borderWidth: 1, borderColor: 'black', height: 40, borderRadius: 8 }}>
        <TextInput placeholder='Enter ID Account' placeholderTextColor={'black'} />
      </View>


      <View style={{ width: '97%', alignSelf: 'center', marginTop: 10, marginBottom: 5 }}>
        <Text style={{ color: 'black' }}>Correct IFSC</Text>
      </View>
      <View style={{ width: '97%', alignSelf: 'center', borderWidth: 1, borderColor: 'black', height: 40, borderRadius: 8 }}>
        <TextInput placeholder='Enter Correct IFSC' placeholderTextColor={'black'} />
      </View>


      <View style={{ width: '95%', alignSelf: 'center' }}>
        <TouchableOpacity style={{ width: 100, height: 30, backgroundColor: 'orange', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>

          <Text style={{ color: 'white' }}>Click Submit</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default LiveChat3

const styles = StyleSheet.create({
  container: {
    flex: 1, width: responsiveWidth(100), backgroundColor: 'white'
  }, view1: { height: responsiveHeight(14), width: responsiveWidth(98), alignSelf: 'center', resizeMode: 'contain', marginTop: 10, borderRadius: 5 }
})