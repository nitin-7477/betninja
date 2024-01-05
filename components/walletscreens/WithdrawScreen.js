import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../Constants/Colors'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WithdrawScreen = () => {
  const navigation = useNavigation();

  const [amount, setAmount] = useState('');
  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
          headers: {
            "Authorization": JSON.parse(token),
          },
        });
        setUserInformation(response.data);
      } catch (error) {
        console.error('Error fetching user data in Wallet Screen:', error);
      }
    };

    fetchData();
  }, []);

  console.log("This is user information for Withdraw Screen", userInformation);

  const handleDepositWithdraw = async (tab) => {
    try {
      // var body = { userId: userInformation.uid, amount: amount }
      // console.log(body);
      // var result = await axios.post('https://9871-2401-4900-1c19-6daf-d33-85ae-dfd7-8e43.ngrok-free.app/api/withdraw', body)
      // console.log(result);
      // setActiveTab(tab);
    }
    catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.depositSection}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}><TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Withdraw Screen</Text></View>
        {/* *********************balance card******************* */}
        <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#d9ad82', marginVertical: 10, borderRadius: 10, padding: 10 }}>

          <Text style={{ color: 'black', fontSize: 16 }}>Balance</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 26, fontWeight: 'bold', marginTop: 5 }}>₹0.69</Text>
            <Image source={require('../../assets/wallet/arrow.png')} style={{ height: 15, width: 15, marginHorizontal: 5 }} /></View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/chip.png')} style={{ height: 20, width: 30, marginTop: 10 }} />
            <Text style={{ color: 'black', fontSize: 18, marginTop: 10, fontWeight: 'bold' }}>***  ***</Text>
          </View>

        </View>
        {/* *********************balance card******************* */}

        {/* *********************Select the Bank******************* */}
        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, alignContent: 'center', marginBottom: 10 }}>
          <View style={{ height: 100, width: 100, backgroundColor: '#d9ad82', borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ color: 'black' }}>Bank Transfer</Text>
          </View>
          <View style={{ height: 100, width: 100, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
            <Image source={require('../../assets/wallet/payment5.png')} style={{ height: 40, width: 40 }} />
            <Text >USDT</Text>
          </View>

        </View>

        <TouchableOpacity style={{ height: SCREEN_HEIGHT * 0.1, marginBottom: 10, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: Colors.lightGray, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/plus.png')} style={{ height: 40, width: 40 }} />
          <Text>Add your bank</Text>
        </TouchableOpacity>



        <TouchableOpacity style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#D3D3D3', marginBottom: 10, borderRadius: 10, padding: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginBottom: 10, alignItems: 'center', width: '30%', }}>
            <Image source={require('../../assets/wallet/bank-logo.png')} style={{ height: 40, width: 40 }} />

            <Text style={{ fontSize: 14, color: 'black' }} >Jupiter Federal</Text>
          </View>
          <View style={{ borderLeftWidth: 0.4, flexDirection: 'row', justifyContent: 'space-between', width: '65%' }}>
            <Text style={{ color: 'grey', marginLeft: 10 }}>7477*****45</Text>
            <Entypo name='chevron-small-right' size={25} />
          </View>
        </TouchableOpacity>
        {/* *********************Select the Channel******************* */}
        {/* *********************Withdraw Amount******************* */}
        <View style={{ height: SCREEN_HEIGHT * 0.5, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#D3D3D3', marginBottom: 10, borderRadius: 10, padding: 10, }}>

          <View style={styles.amountInputContainer}>
            <Text style={{ fontSize: 26, color: '#d9ad82', paddingLeft: 10 }}>₹</Text>
            <Text style={{ fontSize: 26, color: 'grey', paddingLeft: 10 }}>|</Text>

            <TextInput
              style={styles.amountInput}
              placeholder="Enter Amount"
              value={amount}
              onChangeText={(text) => setAmount(text)}

            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <View><Text style={{ color: 'black' }}>Withdrown Balance <Text style={{ color: 'red' }}>0.00</Text></Text></View>
            <TouchableOpacity style={{ backgroundColor: '#d9ad82', height: 20, width: 80, borderWidth: 0.3, alignItems: 'center', borderRadius: 10 }}><Text style={{ color: 'white' }}>Add</Text></TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <View><Text style={{ color: 'black' }}>Withdrown Amount Received </Text></View>
            <View><Text style={{ color: 'red' }}>0.00</Text></View>
          </View>
          <TouchableOpacity
            style={styles.withDrawButton}

            onPress={handleDepositWithdraw}
          >
            <Text style={styles.depositButtonText}>Withdraw</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginVertical: 2 }}>
            <Entypo name='star' size={20} style={{ marginRight: 10, color: '#d9ad82' }} />
            <Text style={{ width: SCREEN_WIDTH * 0.75, color: 'black' }}>The Transfer amount must match the order you created, ohterwise the money can not be credited successfully</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 2 }}>
            <Entypo name='star' size={20} style={{ marginRight: 10, color: '#d9ad82' }} />
            <Text style={{ width: SCREEN_WIDTH * 0.7, color: 'black' }}>If you transfer the wrong amount, our company will not be responsible for this lost account</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 2 }}>
            <Entypo name='star' size={20} style={{ marginRight: 10, color: '#d9ad82' }} />
            <Text style={{ width: SCREEN_WIDTH * 0.75, color: 'black' }}>NOTE: Do not cancel the deposite order after the money has been tranferred</Text>
          </View>

        </View>
        {/* *********************Deposite Amount******************* */}

      </View>
    </ScrollView>
  )
}

export default WithdrawScreen


const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',

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
    color: 'black',
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
    color: 'black'
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
    color: 'black'
  },
};