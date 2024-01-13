import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../Constants/Colors'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const WithdrawScreen = () => {
  const navigation = useNavigation();

  const [amount, setAmount] = useState('');
  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});
  const isButtonDisabled = parseInt(amount) >= 200;

  const handleAmountChange = (value) => {
    setAmount(value);
  };

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


  const handleDepositWithdraw = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }
      var body = { amount: amount }
      const response = await axios.post(`${process.env.SERVERURL}/api/withdraw/withdraw`, body, {
        headers: {
          "Authorization": JSON.parse(token),
        },
      });
      if (response.data) {
        Alert.alert(response.data.message)
      }

    }
    catch (e) {
      console.log(e);
    }
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.depositSection}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}><TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Withdraw Screen</Text></View>
        {/* *********************balance card******************* */}
        <View style={{ height: SCREEN_HEIGHT * 0.15, width: responsiveWidth(97), alignSelf: 'center', backgroundColor: '#d9ad82', marginVertical: 10, borderRadius: 10, padding: 10 }}>

          <Text style={{ color: 'white', fontSize: responsiveFontSize(2.5), fontWeight: 'bold' }}>Balance</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', marginTop: 5 }}>₹ {userInformation?.wallet?.toFixed(2)}</Text>
            <Image source={require('../../assets/wallet/arrow.png')} style={{ height: 15, width: 15, marginHorizontal: 5 }} /></View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/chip.png')} style={{ height: 20, width: 30, marginTop: 10 }} />
            <Text style={{ color: 'white', fontSize: 18, marginTop: 10, fontWeight: 'bold' }}>***  ***</Text>
          </View>

        </View>
        {/* *********************balance card******************* */}

        {/* *********************Select the Bank******************* */}
        <View style={{ flexDirection: 'row', width: responsiveWidth(97), alignContent: 'center', marginBottom: 10 }}>
          <View style={{ height: responsiveHeight(13), width: responsiveWidth(29), backgroundColor: '#d9ad82', borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: responsiveHeight(6), width: responsiveWidth(12) }} />
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Bank Transfer</Text>
          </View>
          {/* <View style={{ height: 100, width: 100, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
            <Image source={require('../../assets/wallet/payment5.png')} style={{ height: 40, width: 40 }} />
            <Text >USDT</Text>
          </View> */}

        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddBank')}
          style={{ height: responsiveHeight(11), marginBottom: 10, width: responsiveWidth(97), alignSelf: 'center', backgroundColor: Colors.lightGray, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <Image source={require('../../assets/plus.png')} style={{ height: 40, width: 40 }} />
          <Text>Add your bank</Text>
        </TouchableOpacity>



        <TouchableOpacity style={{ height: responsiveHeight(11), marginBottom: 10, width: responsiveWidth(97), alignSelf: 'center', backgroundColor: '#D3D3D3', marginBottom: 10, borderRadius: 10, padding: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
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
        <View style={{ height: responsiveHeight(50), marginBottom: 10, width: responsiveWidth(97), alignSelf: 'center', backgroundColor: '#D3D3D3', marginBottom: 10, borderRadius: 10, padding: 10, }}>

          <View style={styles.amountInputContainer}>
            <Text style={{ fontSize: responsiveFontSize(3), color: '#d9ad82', paddingLeft: 10 }}>₹</Text>
            <Text style={{ fontSize: 26, color: 'grey', paddingLeft: 10 }}>|</Text>

            <TextInput
              style={styles.amountInput}
              keyboardType='numeric'
              placeholder="Enter Amount"
              value={amount}
              onChangeText={handleAmountChange}
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
            style={[styles.withDrawButton, { backgroundColor: isButtonDisabled ? '#d9ad82' : 'grey' }]}
            disabled={!isButtonDisabled}
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
    padding: 1,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center'

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
    marginTop: 10,
    marginBottom: 10,
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
    width: responsiveWidth(90),
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

    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    width: responsiveWidth(95),
    alignSelf: 'center'
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