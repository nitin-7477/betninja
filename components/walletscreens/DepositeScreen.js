import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Entypo from 'react-native-vector-icons/Entypo'
import RNUpiPayment from 'react-native-upi-payment'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../Constants/Colors'
import { useNavigation } from "@react-navigation/native";



const DepositeScreen = () => {
  const navigation = useNavigation();

  const [amount, setAmount] = useState('');

  const handleDepositWithdraw = (tab) => {
    setActiveTab(tab);
  };

  const PaymentGateWay = () => {

    RNUpiPayment.initializePayment(
      {
        vpa: '7477235745@paytm', // or can be john@ybl or mobileNo@upi
        payeeName: 'Nitin Gautam',
        amount: '1',
        transactionRef: 'aasf-332-aoei-fn',
      },
      successCallback,
      failureCallback
    );
  }


  function successCallback(data) {
    console.log(data)
  }

  function failureCallback(data) {
    console.log(data)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.depositSection}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}><TouchableOpacity
          onPress={() => navigation.navigate('Wallet')}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Deposit Screen</Text></View>
        {/* *********************balance card******************* */}
        <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#d9ad82', marginVertical: 10, borderRadius: 10, padding: 10 }}>

          <Text style={{ color: 'white', fontSize: 16 }}>Balance</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', marginTop: 5 }}>₹0.69</Text>
            <Image source={require('../../assets/wallet/arrow.png')} style={{ height: 15, width: 15, marginHorizontal: 5 }} /></View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/chip.png')} style={{ height: 20, width: 30, marginTop: 10 }} />
            <Text style={{ color: 'white', fontSize: 18, marginTop: 10, fontWeight: 'bold' }}>***  ***</Text>
          </View>

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
          <View style={{ height: 100, width: 100, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/wallet/payment3.png')} style={{ height: 40, width: 50 }} />
            <Text >UPI-QR</Text>
          </View>

        </View>
        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'space-between', alignContent: 'center', marginBottom: 10 }}>

        </View>



        {/* *********************Select the Bank******************* */}

        {/* *********************Select the Channel******************* */}
        <View style={{ height: SCREEN_HEIGHT * 0.17, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#D3D3D3', marginBottom: 10, borderRadius: 10, padding: 10, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 20, width: 20 }} />

            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: 'black' }} >Select Channel</Text>
          </View>
          <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.8, alignSelf: 'center', backgroundColor: '#d9ad82', borderRadius: 10, padding: 10 }}>

            <Text style={{ color: 'white', fontSize: 16 }}>TB Bank</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>Balance 100-100K</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>2% Bonus</Text>

          </View>
        </View>
        {/* *********************Select the Channel******************* */}
        {/* *********************Deposite Amount******************* */}
        <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#D3D3D3', marginBottom: 10, borderRadius: 10, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 20, width: 20 }} />

            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: 'black' }} >Deposite Amount</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.redBtn} onPress={() => setAmount(500)}>
              <Text style={{ fontWeight: 'bold', color: 'grey', }}>₹ 500</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redBtn} onPress={() => setAmount(1000)}>
              <Text style={{ fontWeight: 'bold', color: 'grey' }}>₹ 1K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redBtn} onPress={() => setAmount(5000)}>
              <Text style={{ fontWeight: 'bold', color: 'grey', }}>₹ 5K</Text>
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
            <TouchableOpacity style={styles.redBtn} onPress={() => setAmount(10000)}>
              <Text style={{ fontWeight: 'bold', color: 'grey', }}>₹ 10K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redBtn} onPress={() => setAmount(20000)}>
              <Text style={{ fontWeight: 'bold', color: 'grey', }}>₹ 20K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redBtn} onPress={() => setAmount(50000)}>
              <Text style={{ fontWeight: 'bold', color: 'grey', }}>₹ 50K</Text>
            </TouchableOpacity>

          </View>

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

        </View>
        {/* *********************Deposite Amount******************* */}


        <TouchableOpacity
          style={styles.depositButton}
          onPress={handleDepositWithdraw}
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
  },
};