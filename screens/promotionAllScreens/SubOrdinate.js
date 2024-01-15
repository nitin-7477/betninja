import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { Colors } from '../../components/Constants/Colors'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'

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


      var result = await axios.get(`${process.env.SERVERURL}/api/commission/commission`, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })
      setDownline(result.data.data.downline)



    } catch (e) {
      console.log("ERROR IN FETCHING for subordinate", e);
    }

  }

  useEffect(() => {
    fetchCommissionData()
  }, []);



  console.log("This is downline data", downline);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ width: responsiveWidth(100), backgroundColor: 'white', height: responsiveHeight(6), alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10 }}>
        <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Subordinate Data</Text>
      </View>

      <FlatList data={downline} renderItem={({ item }) => {
        return <View style={{ width: responsiveWidth(97), height: 'auto', backgroundColor: 'white', marginVertical: 2, alignSelf: 'center', borderRadius: 5, paddingHorizontal: 6, elevation: 1, paddingVertical: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>ID</Text>
            <Text style={{ color: 'grey' }}>{item._id}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Join Date</Text>
            <Text style={{ color: 'grey' }}>{new Date(item.joinDate).toLocaleString()}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>User ID</Text>
            <Text style={{ color: 'grey' }}>0</Text>
          </View>


        </View>
      }} />

      {/* <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.9, backgroundColor: '#b1835a', marginTop: 50, borderRadius: 10, alignSelf: 'center', padding: 15 }}>

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



      </View> */}

    </ScrollView>
  )
}

export default SubOrdinate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center', width: responsiveWidth(100)
  }
})