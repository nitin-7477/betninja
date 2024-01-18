import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from 'react-native-responsive-dimensions';
const Language = () => {
  const navigation = useNavigation();

  const [isChecked, setChecked] = useState(true);

  const handleToggle = () => {
    setChecked(true);
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* header */}

      <View style={{ width: '100%', backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15  }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Deposit</Text>
      </View>

      <View style={styles.top10}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../assets/britishFlag.png')} style={{ height: 20, width: 20, borderRadius: 5 }} />
          <Text style={{ color: Colors.fontGray, fontWeight: '800', fontSize: 18, marginLeft: 10 }}>English</Text>
        </View>
        <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
          <View style={[styles.checkbox, isChecked && styles.checked]}>
            {isChecked && <Text style={{ color: 'white' }}>✓</Text>}
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView >
  )
}

export default Language

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 1,
    alignSelf: 'center', backgroundColor: 'white', width: responsiveWidth(100)
  },
  header: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors.lightGray, justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  top10:
  {
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH * 0.95,
    borderRadius: 15,
    height: SCREEN_HEIGHT * 0.07,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2, alignSelf: 'center'

  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: Colors.purple, // Change this color as needed
    borderColor: '#4CAF50',
  },



})