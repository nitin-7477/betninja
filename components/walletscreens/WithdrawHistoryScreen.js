import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import { Ionicons, EvilIcons, AntDesign, Entypo } from '@expo/vector-icons'

const WithdrawHistoryScreen = () => {
  const [amount, setAmount] = useState('');

  const handleDepositWithdraw = (tab) => {
    setActiveTab(tab);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.depositSection}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Image source={require('../../assets/wallet/payment1.png')} style={{ height: 20, width: 20 }} />
          <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }} >Withdraw History</Text>
        </View>
        {/* *********************************Withdraw History****************************** */}

        <View style={{ height: SCREEN_HEIGHT * 0.28, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#e1edf0', marginBottom: 10, borderRadius: 10, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity style={{
              backgroundColor: '#FF6633',
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.25,
              paddingVertical: 5,
              borderRadius: 7

            }}>
              <Text style={{ fontWeight: 'bold', color: 'white', }}>WithDraw</Text>
            </TouchableOpacity>
            <Text style={{ marginLeft: 10, fontSize: 16, color: 'green' }} >Completed</Text>
          </View>
          {/* *********************************Deposit History Card ****************************** */}

          <View style={{ height: SCREEN_HEIGHT * 0.28, width: SCREEN_WIDTH * 0.85, borderTopWidth: 0.4, borderColor: 'grey', borderRadius: 10, padding: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Balance</Text><Text style={{ color: 'orange', fontSize: 18 }}>₹ 10000.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Type</Text><Text>TB- Bank</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Time</Text><Text>2023-12-15 16:23:00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Order No</Text><Text>P2023102110360707708791</Text>
            </View>

          </View>
        </View>
        {/* *********************************Deposit History****************************** */}
        <View style={{ height: SCREEN_HEIGHT * 0.28, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#e1edf0', marginBottom: 10, borderRadius: 10, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity style={{
              backgroundColor: '#FF6633',
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.25,
              paddingVertical: 5,
              borderRadius: 7

            }}>
              <Text style={{ fontWeight: 'bold', color: 'white', }}>₹ 10K</Text>
            </TouchableOpacity>
            <Text style={{ marginLeft: 10, fontSize: 16, color: 'green' }} >Withdraw</Text>
          </View>
          {/* *********************************Deposit History Card ****************************** */}

          <View style={{ height: SCREEN_HEIGHT * 0.28, width: SCREEN_WIDTH * 0.85, borderTopWidth: 0.4, borderColor: 'grey', borderRadius: 10, padding: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Balance</Text><Text style={{ color: 'orange', fontSize: 18 }}>₹ 10000.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Type</Text><Text>TB- Bank</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Time</Text><Text>2023-12-15 16:23:00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Order No</Text><Text>P2023102110360707708791</Text>
            </View>

          </View>
        </View>
        {/* *********************************Deposit History****************************** */}
        <View style={{ height: SCREEN_HEIGHT * 0.28, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#e1edf0', marginBottom: 10, borderRadius: 10, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity style={{
              backgroundColor: '#FF6633',
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.25,
              paddingVertical: 5,
              borderRadius: 7

            }}>
              <Text style={{ fontWeight: 'bold', color: 'white', }}>₹ 10K</Text>
            </TouchableOpacity>
            <Text style={{ marginLeft: 10, fontSize: 16, color: 'green' }} >Withdraw</Text>
          </View>
          {/* *********************************Deposit History Card ****************************** */}

          <View style={{ height: SCREEN_HEIGHT * 0.28, width: SCREEN_WIDTH * 0.85, borderTopWidth: 0.4, borderColor: 'grey', borderRadius: 10, padding: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Balance</Text><Text style={{ color: 'orange', fontSize: 18 }}>₹ 10000.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Type</Text><Text>TB- Bank</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Time</Text><Text>2023-12-15 16:23:00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ fontSize: 16 }}>Order No</Text><Text>P2023102110360707708791</Text>
            </View>

          </View>
        </View>
        {/* *********************************Deposit History****************************** */}


      </View>
    </ScrollView>
  )
}

export default WithdrawHistoryScreen


const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 30
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