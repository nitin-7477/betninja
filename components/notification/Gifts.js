import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AppTextInput from '../AppTextInput';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign"

const Gifts = () => {
  const navigation = useNavigation();
  const [giftCode, setGiftCode] = useState('')

  const handleGiftCode = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        navigation.navigate('Login')
        return;
      }
      body = { giftCode: giftCode }
      console.log(body);
      const response = await axios.post(
        `${process.env.SERVERURL}/api/gift/redeem-gift`,
        body,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        }
      );
      console.log(response.data);
      Alert.alert(response.data.message)
    } catch (e) {
      console.log(e);
      console.log("HI Errors for Betting Rebate", e.response.status);
      alert(e.response.status)
    }
  };

  const handleGiftHistory = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        navigation.navigate('Login')
        return;
      }
      alert('Hi I will send gift code')
      // const response = await axios.post(
      //   `${process.env.SERVERURL}/withdraw-history-gift-card`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: JSON.parse(token),
      //     },
      //   }
      // );

      // Alert.alert(response.data.message)
    } catch (e) {
      console.log("HI Errors for Betting Rebate", e.response.status);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* header */}

      <View style={{ width: responsiveWidth(100), backgroundColor: 'white', height: responsiveHeight(6), alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Gifts</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.normalText}>Hi Player</Text>
        <Text style={styles.normalText}>Our Team has a gift for you</Text>
        <Text style={styles.placeholderLine}>Please Enter your gift code below</Text>
        <AppTextInput value={giftCode} onChangeText={(text) => setGiftCode(text)} placeholder='Please Enter Gift Code' />
        <TouchableOpacity
          onPress={handleGiftCode}
          style={styles.signIn}>
          <Text style={{ color: 'white', textAlign: "center", fontSize: 18, fontWeight: 'bold' }} >
            Receive
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.history}>

        <Text style={{ fontSize: 16, fontWeight: '600' }}>History</Text>
        <Image source={require('../../assets/noData.png')} style={{ height: 200, width: 200 }} />
      </View>
    </ScrollView>
  )
}

export default Gifts

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignSelf: 'center'
  },
  header: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: Colors?.lightGray, justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  section: {
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH * 0.97,
    backgroundColor: Colors?.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 10
  },
  history: {
    height: SCREEN_HEIGHT * 0.6,
    width: SCREEN_WIDTH * 0.97,
    backgroundColor: Colors?.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'purple',
    marginVertical: 30,
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  }, normalText: {
    color: Colors?.fontGray,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  placeholderLine: {
    color: Colors?.purple,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15
  }

})