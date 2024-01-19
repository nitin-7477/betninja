import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../Constants/Colors'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const DepositHistoryScreen = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([])

  useEffect(() => {
    handleDepositWithdraw();
  }, []);

  const handleDepositWithdraw = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }

      const response = await axios.get(`${process.env.SERVERURL}/api/deposit/deposits`, {
        headers: {
          Authorization: JSON.parse(token),
        },
      });
      const sortedHistory = response.data.data.sort((a, b) => {
        return new Date(b.orderTime) - new Date(a.orderTime);
      });

      setHistory(sortedHistory);

      console.log(response.data.data[0].createdAt);

    } catch (error) {
      console.error('Error fetching withdraw history:', error);

    }
  };

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchToken();

      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    fetchData();
  }, []);

  console.log("Result of withdrow  History In History Screen", history);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.depositSection}>

        <View style={{ width: responsiveWidth(100), backgroundColor: 'white', height: responsiveHeight(6), alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Deposit History</Text>
        </View>
        {/* *********************************Withdraw History****************************** */}
        <FlatList data={history} renderItem={({ item }) => {
          return <View style={{ height: 'auto', width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: '#e1edf0', marginBottom: 10, borderRadius: 10, padding: 10, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
              <TouchableOpacity style={{
                backgroundColor: '#FF6633',
                alignItems: 'center',
                width: SCREEN_WIDTH * 0.25,
                paddingVertical: 5,
                borderRadius: 7

              }}>

                <Text style={{ fontWeight: 'bold', color: 'white', }}>Deposit</Text>
              </TouchableOpacity>
              <Text style={{ marginLeft: 10, fontSize: 16, color: 'green' }} >{item.status}</Text>
            </View>
            {/* *********************************Deposit History Card ****************************** */}

            <View style={{ height: 'auto', width: SCREEN_WIDTH * 0.91, borderTopWidth: 0.4, borderColor: 'grey', borderRadius: 10, padding: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ fontSize: 16, color: "black" }}>Balance</Text>
                <Text style={{ color: 'orange', fontSize: 18 }}>
                  ₹{item.amount.toFixed(2)}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ fontSize: 16, color: "black" }}>Type</Text><Text style={{ color: "black" }}>{item.type}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ fontSize: 16, color: "black" }}>Time</Text><Text style={{ color: "black" }}>{new Date(item.orderTime).toLocaleString()}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ fontSize: 16, color: "black" }}>Transaction Id</Text><Text style={{ color: "black" }}>{item.transactionId}</Text>
              </View>

            </View>
          </View>
        }} />

      </View>
    </ScrollView>
  )
}

export default DepositHistoryScreen


const styles = {
  container: {
    flex: 1,
    width: responsiveWidth(100),
    backgroundColor: '#f5f5f5', alignSelf: 'center'

  },
  redBtn: {
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: 10,
    borderWidth: 0.7,
    borderRadius: 3,
    borderColor: 'grey'



  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 20,
    color: 'green',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  icon: {
    alignItems: 'center',
  },
  tabButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButtonsContainer: {
    paddingHorizontal: 20,
  },
  depositSection: {
    marginBottom: 30,
  },
  sectionTitle: {

    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold'

  },
  amountInputContainer: {
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    width: SCREEN_WIDTH * 0.8,
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row', alignItems: 'center', marginTop: 10
  },
  amountInput: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  depositButton: {
    backgroundColor: '#d9ad82',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  withDrawButton: {
    backgroundColor: '#d9ad82',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10
  },
  depositButtonText: {
    fontSize: 16,
    color: 'white',
  },
  rechargeInstructionsTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  rechargeInstructionItem: {
    fontSize: 16,
    marginBottom: 5,
  },
};