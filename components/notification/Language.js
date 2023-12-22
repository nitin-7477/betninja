import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
const Language = () => {
  const navigation = useNavigation();

  const [isChecked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!isChecked);
  };


  return (
    <ScrollView style={styles.container}>
      {/* header */}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}><TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={{ height: 30, width: 30, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
        <Ionicons name='return-up-back' color={'white'} size={25} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Language</Text></View>
      <View style={styles.top10}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../assets/indianFlag.png')} style={{ height: 20, width: 20, borderRadius: 5 }} />
          <Text style={{ color: Colors.fontGray, fontWeight: '800', fontSize: 18, marginLeft: 10 }}>Hindi</Text>
        </View>
        <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
          <View style={[styles.checkbox, isChecked && styles.checked]}>
            {isChecked && <Text style={{ color: 'white' }}>✓</Text>}
          </View>
        </TouchableOpacity>

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
    marginVertical: 20,
    padding: 20
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
    width: SCREEN_WIDTH * 0.88,
    borderRadius: 15,
    height: SCREEN_HEIGHT * 0.07,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2

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