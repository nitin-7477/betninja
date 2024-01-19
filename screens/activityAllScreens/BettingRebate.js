import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Alert, Image, Button, Modal } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"

import { Colors } from '../../components/Constants/Colors'
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Entypo from "react-native-vector-icons/Entypo"

const BettingRebate = () => {
  const [userInformation, setUserInformation] = useState([])
  const [checkToken, setCheckToken] = useState('')
  const [rebateInfo, setRebateInfo] = useState([])
  const [startIndex, setStartIndex] = useState(0);
  const [message, setMessage] = useState('')
  const [showCopyModal, setShowCopyModal] = useState(false)

  const itemsPerPage = 10;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = await AsyncStorage.getItem('token');

        if (!token) {
          navigation.navigate('Login')
          return;
        }

        const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
          headers: {
            "Authorization": JSON.parse(token),
          },
        });

        setUserInformation(response.data.user_level.rebate_amount);
      } catch (error) {
        console.error('Error fetching user data in  betting Rebate:', error);
      }

    };

    fetchData();

  }, []);

  const handleOneClickRebate = async () => {
    try {
      console.log("hi");
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await axios.post(
        `${process.env.SERVERURL}/api/deposit/deposit_rebate`,
        {},
        {
          headers: {
            Authorization: token ? JSON.parse(token) : null,
          },
        }
      );

      if (response.data) {
        const result = response.data; // Assuming the result is part of the response

        setMessage(result.message);
        setShowCopyModal(true);

        setTimeout(() => {
          setShowCopyModal(false);
        }, 2000);
      }

      console.log(response);
    } catch (error) {
      console.error('Error in handleOneClickRebate:', error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    handleOneClickRebateGetRequest()
  }, [])


  const handleOneClickRebateGetRequest = async () => {
    try {

      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${process.env.SERVERURL}/api/deposit/deposit_rebate`,

        {
          headers: {
            Authorization: token ? JSON.parse(token) : null,
          },
        }
      );

      console.log("This is data of history of rebate", response.data);
      setRebateInfo(response.data)
    } catch (e) {
      console.log("HI Errors for Betting Rebate", e);
    }
  };

  const totalPages = Math.ceil(rebateInfo.length / itemsPerPage);

  const onNextPress = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, (totalPages - 1) * itemsPerPage));
  };

  const onPrevPress = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };


  return (
    <ScrollView style={styles.container1}>
      <View style={{ width: '100%', backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Betting Rebate</Text>
      </View>
      <View style={{ height: SCREEN_HEIGHT * 0.45, width: '95%', alignSelf: 'center', backgroundColor: '#DCDCDC', marginTop: 10, borderRadius: 10, padding: 10, }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>All-Total Betting Rebate</Text>
        <View style={{ flexDirection: 'row', marginTop: 10, width: 130, height: 25, borderColor: 'purple', borderWidth: 0.2, justifyContent: 'space-around', alignItems: 'center' }}>
          <Ionicons name="shield-checkmark" size={20} color={'purple'} />
          <Text style={{ color: 'black' }}>Real-Time Count</Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, color: 'black' }}>
          ₹ {typeof userInformation === 'number' ? userInformation?.toFixed(2) : userInformation}
        </Text>
        <View style={{ height: '12%', width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'left', borderRadius: 5, paddingHorizontal: 4 }}>
          <Text style={{ color: 'black' }}>Upgrade VIP level to increase the rebate rate</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '20%', alignItems: 'center' }}>
          <View style={{ height: '80%', width: '45%', backgroundColor: 'white', justifyContent: 'center', borderRadius: 2, marginVertical: 10, paddingHorizontal: 10 }}>
            <Text style={{ color: 'black' }}>Today Rebate</Text>
            <Text style={{ color: 'red' }}>
              {typeof userInformation === 'number' ? userInformation.toFixed(2) : 'N/A'}
            </Text>
          </View>
          <View style={{ height: '80%', width: '45%', backgroundColor: 'white', justifyContent: 'center', borderRadius: 2, marginVertical: 10, paddingHorizontal: 10 }}>
            <Text style={{ color: 'black' }}>Total Rebate</Text>
            <Text style={{ color: 'red' }}>
              {rebateInfo?.totalAmount !== undefined && rebateInfo?.totalAmount !== null
                ? rebateInfo?.totalAmount?.toFixed(2)
                : '0.00'}
            </Text>
          </View>
        </View>
        <Text style={{ color: 'black', width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center' }}>Automatic code washing at 1:00:00 every morning</Text>
        <TouchableOpacity
          onPress={() => handleOneClickRebate()}
          style={{ width: '100%', height: '12%', backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>One Click Rebate</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, color: 'black', width: '95%', alignSelf: 'center', height: 35 }}>Rebate History</Text>

      {rebateInfo.length !== 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={rebateInfo.data}

          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.cardContainer}>
                <View style={styles.header}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{item.type}</Text>
                  </TouchableOpacity>
                  <Text style={{ color: 'black' }}>{new Date(item.updatedAt).toLocaleString()}</Text>
                  <Text style={styles.statusCompleted}>{item.status}</Text>
                </View>

                {/* Deposit History Card */}
                <View style={styles.depositHistoryCard}>
                  <View style={styles.historyRow}>
                    <Text style={styles.historyText}>Order No.</Text>
                    <Text style={styles.historyAmount}>{item.orderNumber}</Text>
                  </View>

                  <View style={styles.historyRow}>
                    <Text style={styles.historyText}>Status</Text>
                    <Text style={styles.historyAmount}>{item.status}</Text>
                  </View>

                  <View style={styles.historyRow}>
                    <Text style={styles.historyText}>Rebate Amount</Text>
                    <Text style={styles.historyAmount}> ₹ {item.amount.toFixed(2)}</Text>
                  </View>

                  <View style={styles.historyRow}>
                    <Text style={styles.historyText}>Transaction id</Text>
                    <Text style={styles.historyAmount}>{item.transactionId}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{ width: responsiveWidth(100), height: responsiveHeight(50), justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/noData.png')} style={{ height: 200, width: 200 }} />
        </View>
      )}

      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        width: '90%', marginVertical: 20, alignSelf: 'center'
      }}>
        <Button title="Prev" onPress={onPrevPress} disabled={startIndex === 0} />
        <Button title="Next" onPress={onNextPress} disabled={startIndex + itemsPerPage >= rebateInfo.length} />
      </View>
      <Modal visible={showCopyModal} transparent={true}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            width: '70%', // Set your desired width
            height: 150, // Set your desired height
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
            <Entypo name="check" size={30} color={'white'} />
            <Text style={{ color: 'white' }}>{message}</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>

  )
}

export default BettingRebate

const styles = StyleSheet.create({
  container1: {
    flex: 1,

    alignSelf: 'center', width: '100%',
  },
  container: {
    height: SCREEN_HEIGHT * 0.24,
    width: SCREEN_WIDTH * 0.95,
    alignSelf: 'center',
    backgroundColor: '#e1edf0',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  cardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#50C878',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: 5,
    borderRadius: 7,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  statusCompleted: {
    marginLeft: 10,
    fontSize: 16,
    color: 'green',
  },
  depositHistoryCard: {
    height: SCREEN_HEIGHT * 0.28,
    width: SCREEN_WIDTH * 0.94,
    borderTopWidth: 0.4,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  historyText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold'
  },
  historyAmount: {
    color: 'black',
    fontSize: 14,
  },

})