import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const GameStats = () => {

  const navigation = useNavigation();

  const [today, setToday] = useState([])
  const [Yesterday, setYesterday] = useState([])
  const [thisWeek, setThisWeek] = useState([])
  const [thisMonth, setThisMonth] = useState([])

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        alert('Token Expired')
        navigation.navigate('Login')
        return;
      }
    }

    catch (error) {
      console.error('Error fetching user data in Account Screen:', error);
    }

  };

  const fetchCommissionData = async () => {
    try {

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        navigation.navigate('Login')
        return;
      }



      var result = await axios.get(`${process.env.SERVERURL}/api/auth/user-bets`, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })


      console.log(result.data.responseData);
      setToday(result.data.responseData.today)
      setYesterday(result.data.responseData.yesterday)
      setThisWeek(result.data.responseData.thisWeek)
      setThisMonth(result.data.responseData.thisMonth)

    } catch (e) {
      console.log("ERROR IN FETCHING COMMISSION", e);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchToken();
        await fetchCommissionData();
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* header */}

      <View style={{ width: SCREEN_WIDTH * 1, backgroundColor: 'white', height: '7%', alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Game Chart</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity style={styles.otpBtn} >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otpBtn}    >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            Yesterday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otpBtn}    >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            This Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otpBtn}    >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            This Month
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>
          ₹ 0.00
        </Text>
        <Text>
          Total Bet
        </Text>

      </View>
      <View style={styles.history}>

        <Image source={require('../../assets/noData.png')} style={{ height: 200, width: 200 }} />
        <Text style={{ fontSize: 16, fontWeight: '600' }}>No Data</Text>

      </View>
    </ScrollView>
  )
}

export default GameStats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH * 1
  },
  header: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors?.lightGray, justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  section: {
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.88,
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
  history: {
    height: SCREEN_HEIGHT * 0.6,
    width: SCREEN_WIDTH * 0.88,
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
  },
  otpBtn: {
    backgroundColor: Colors?.fontGray,
    borderRadius: 10,
    width: '23%',
    elevation: 5,
    paddingVertical: 3,
    marginHorizontal: 2,
    paddingVertical: 5,
    marginVertical: 10, alignSelf: 'center'
  },

})