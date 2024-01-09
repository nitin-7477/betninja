import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { Colors } from '../../components/Constants/Colors'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native";

const SubOrdinate = () => {
  const navigation = useNavigation();
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}><TouchableOpacity
        onPress={() => navigation.navigate('Promotion')}
        style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: Colors?.lightGray, marginHorizontal: 10 }}>
        <Ionicons name='return-up-back' color={'black'} size={24} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 1, fontSize: 20, color: Colors.fontGray, marginLeft: 80 }}>Subordinate </Text></View>
      <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.9, backgroundColor: '#b1835a', marginTop: 50, borderRadius: 10, alignSelf: 'center', padding: 15 }}>

        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold' }}>Deposite Number</Text>

          </View>
          <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold' }}>Deposite Amount</Text>

          </View>

        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold' }}>Number of betters</Text>

          </View>
          <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold' }}>Total bet</Text>
          </View>

        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold' }}>Number of people making  first deposite</Text>

          </View>
          <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold' }}>
              0
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: 'bold' }}>First Deposite Amount</Text>

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