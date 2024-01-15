import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CommissionDetails = () => {
  const [selectedBtn, setSelectedBtn] = useState(1)
  const [commissionHistoy, setCommissionHistoy] = useState([])
  const [withDrawlHistory, setWithDrawlHistory] = useState([])

  const handleHistory = (num) => {
    setSelectedBtn(num)
  }

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
      console.log(token);
      if (!token) {
        navigation.navigate('Login')
        return;
      }



      var result = await axios.get(`${process.env.SERVERURL}/api/commission/commission`, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })

      setCommissionHistoy(result.data.data.results)
      setWithDrawlHistory(result.data.data.withdraw_history)



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

  console.log(withDrawlHistory);

  const renderHistoryItem = ({ item, i }) => {
    return (
      <View style={{ width: '95%', height: responsiveHeight(21), backgroundColor: '#e9ffdb', marginVertical: 4, alignSelf: 'center', borderRadius: 5, padding: 5, elevation: 5, }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>ID</Text>
          <Text style={{ color: 'black' }}>{item._id}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Amount</Text>
          <Text style={{ color: 'black' }}>{item.amount}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Date</Text>
          <Text style={{ color: 'black' }}>{new Date(item.date).toLocaleString()}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Rate</Text>
          <Text style={{ color: 'black' }}>{item.rate}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Type</Text>
          <Text style={{ color: 'black' }}>{item.type}</Text>
        </View>
      </View>
    );
  }
  const renderWithdrawHistoryItem = ({ item, i }) => {
    return (
      <View style={{ width: '95%', height: responsiveHeight(21), backgroundColor: '#e9ffdb', marginVertical: 4, alignSelf: 'center', borderRadius: 5, padding: 5, elevation: 5 }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Order Id</Text>
          <Text style={{ color: 'black' }}>{item.orderId}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>amount</Text>
          <Text style={{ color: 'black' }}>{item.amount}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Transaction Id</Text>
          <Text style={{ color: 'black' }}>{item.transactionId}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Status</Text>
          <Text style={{ color: 'black' }}>{item.status}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Success Time</Text>
          <Text style={{ color: 'black' }}>{item.successTime}</Text>
        </View>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <View style={{ width: responsiveWidth(100), backgroundColor: 'white', height: responsiveHeight(6), alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black' }}>
        <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>CommissionDetails</Text>
      </View>

      {/* This is the screen for buttons  */}
      <View style={styles.buttonSection}>
        <TouchableOpacity onPress={() => handleHistory(1)} style={{ width: responsiveWidth(45), height: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 20 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Result</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleHistory(2)} style={{ width: responsiveWidth(45), height: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 20 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Withdrawl History</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: responsiveWidth(95) }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>{selectedBtn === 1 ? "History" : "Withdrawl History"}</Text></View>

      <View style={{ flex: 1, width: responsiveWidth(100), height: 'auto', }}>
        {selectedBtn === 1 ? <FlatList data={commissionHistoy} renderItem={renderHistoryItem} /> : <FlatList data={withDrawlHistory} renderItem={renderWithdrawHistoryItem} />}

      </View>
    </View >
  )
}

export default CommissionDetails

const styles = StyleSheet.create({
  container: {
    flex: 1, width: responsiveWidth(100), alignItems: 'center', backgroundColor: 'white'
  }, buttonSection: { marginVertical: 10, width: responsiveWidth(100), height: responsiveHeight(8), backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' },
})