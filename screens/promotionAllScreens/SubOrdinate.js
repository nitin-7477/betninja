import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { Colors } from '../../components/Constants/Colors'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const SubOrdinate = () => {
  const [downline, setDownline] = useState([])

  const fetchCommissionData = async () => {
    try {
      // setLoading(true)
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }
      console.log("This is the main token", JSON.parse(token));


      var result = await axios.get(`${process.env.SERVERURL}/api/commission/commission`, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })
      // console.log(result.data.data);
      setDownline(result.data.data.downline)



    } catch (e) {
      console.log("ERROR IN FETCHING for subordinate", e);
    }

  }

  useEffect(() => {
    fetchCommissionData()
  }, []);



  console.log(downline);

  return (
    <View style={styles.container}>
      <View style={{ width: SCREEN_WIDTH * 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'black', fontSize: 22, color: Colors.fontGray, fontWeight: '600', marginVertical: 10 }}>Subordinate Data</Text></View>
      <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.9, backgroundColor: '#b1835a', marginTop: 50, borderRadius: 10, alignSelf: 'center', padding: 15 }}>

        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold ' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold ' }}>Deposite Number</Text>

          </View>
          <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold ' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold ' }}>Deposite Amount</Text>

          </View>

        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold ' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold ' }}>Number of betters</Text>

          </View>
          <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold ' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold ' }}>Total bet</Text>
          </View>

        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold ' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold ' }}>Number of people making  first deposite</Text>

          </View>
          <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold ' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold ' }}>First Deposite Amount</Text>

          </View>

        </View>



      </View>
    </View>
  )
}

export default SubOrdinate

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
})