import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Entypo from 'react-native-vector-icons/Entypo'
import RNUpiPayment from 'react-native-upi-payment'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../Constants/Colors'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'



const DepositeScreen = () => {
  const navigation = useNavigation();

  const [amount, setAmount] = useState('');
  const [userInformation, setUserInformation] = useState('')
  const [selectedBtn, setSelectedBtn] = useState(0)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    fetchUserData()
  }, [])


  const fetchUserData = async () => {
    try {
      setLoading(true)
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
      setUserInformation(response.data);

    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    }
    finally {
      setLoading(false)
    }

  };

  const handleDeposite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }
      var body = { amount: amount }
      const response = await axios.post(`${process.env.SERVERURL}/api/deposit/deposits`, body, {
        headers: {
          "Authorization": JSON.parse(token),
        },
      });

      console.log("This is response of hitting deposite api", response);
    }
    catch (error) {
      console.log(error);

    }

  }

  const handleDepositeMoney = (value, btn) => {
    setAmount(value.toString())
    setSelectedBtn(btn)
  }

  const handleAmountChange = (text) => {

    let enteredAmount = parseFloat(text);

    if (isNaN(enteredAmount) || enteredAmount < 100) {

      setAmount('100');
      // Alert.alert('Minimum 100 is required')
    } else {

      setAmount(enteredAmount.toString());
    }
  };

  const PaymentGateWay = () => {


  }



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.depositSection}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}><TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Deposit Screen</Text></View>
        {/* *********************balance card******************* */}
        <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#d9ad82', marginVertical: 10, borderRadius: 10, padding: 10 }}>

          <Text style={{ color: 'white', fontSize: 16 }}>Balance</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', marginTop: 5 }}>₹{userInformation?.wallet?.toFixed(2)}</Text>
            <Image source={require('../../assets/wallet/arrow.png')} style={{ height: 15, width: 15, marginHorizontal: 5 }} /></View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/chip.png')} style={{ height: 20, width: 30, marginTop: 10 }} />
            <Text style={{ color: 'white', fontSize: 18, marginTop: 10, fontWeight: 'bold' }}>***  ***</Text>
          </View>
          {loading && (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size={50} color="gold" />
            </View>
          )}
        </View>
        {/* *********************balance card******************* */}

        {/* *********************Select the Bank******************* */}
        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.88, justifyContent: 'space-between', alignContent: 'center', marginBottom: 10 }}>
          <View style={{ height: 100, width: 100, backgroundColor: '#d9ad82', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ color: 'white' }}>Bank Transfer</Text>
          </View>

          <TouchableOpacity
            onPress={PaymentGateWay}
            style={{ height: 100, width: 100, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/payment2.png')} style={{ height: 40, width: 50 }} />
            <Text >UPI-APP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('QrScanner')} style={{ height: 100, width: 100, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/payment3.png')} style={{ height: 40, width: 50 }} />
            <Text >UPI-QR</Text>
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'space-between', alignContent: 'center', marginBottom: 10 }}>

        </View>




        <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#D3D3D3', marginBottom: 10, borderRadius: 10, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 20, width: 20 }} />

            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: 'black' }} >Deposite Amount</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 1 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(500, 1)}>

              <Text style={{ fontWeight: 'bold', color: selectedBtn == 1 ? 'white' : 'grey' }}>₹ 500</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 2 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(1000, 2)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 2 ? 'white' : 'grey' }}>₹ 1K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 3 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(5000, 3)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 3 ? 'white' : 'grey' }}>₹ 5K</Text>
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 4 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(10000, 4)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 4 ? 'white' : 'grey' }}>₹ 10K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 5 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(20000, 5)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 5 ? 'white' : 'grey' }}>₹ 20K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.redBtn, { backgroundColor: selectedBtn == 6 ? 'red' : '#D3D3D3', }]} onPress={() => handleDepositeMoney(50000, 6)}>
              <Text style={{ fontWeight: 'bold', color: selectedBtn == 6 ? 'white' : 'grey' }}>₹ 50K</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.amountInputContainer}>
            <Text style={{ fontSize: 26, color: '#d9ad82', paddingLeft: 10 }}>₹</Text>
            <Text style={{ fontSize: 26, color: 'grey', paddingLeft: 10 }}>|</Text>

            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              placeholder="Enter Amount"
              value={amount}
              onChangeText={handleAmountChange}
            />
          </View>

        </View>
        {/* *********************Deposite Amount******************* */}


        <TouchableOpacity
          style={styles.depositButton}
          onPress={handleDeposite}
        >
          <Text style={styles.depositButtonText}>Deposit</Text>
        </TouchableOpacity>


        <View style={{ height: SCREEN_HEIGHT * 0.35, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#eeeeee', marginBottom: 10, borderRadius: 10, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 20, width: 20 }} />
            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: 'black' }} >Recharge Instruction</Text>
          </View>

          <View style={{ height: SCREEN_HEIGHT * 0.28, width: SCREEN_WIDTH * 0.85, borderWidth: 0.4, borderColor: 'grey', borderRadius: 10, padding: 10 }}>
            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
              <Entypo name='star' size={20} style={{ marginRight: 10, color: '#d9ad82' }} />
              <Text style={{ width: SCREEN_WIDTH * 0.77, color: 'black' }}>If the transfer time is up, please fill out the deposite form again</Text>
            </View>
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
        </View>


      </View>
    </ScrollView>
  )
}

export default DepositeScreen


const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center'

  },
  redBtn: {

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
    color: "black",
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
  }, activityIndicatorContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
};