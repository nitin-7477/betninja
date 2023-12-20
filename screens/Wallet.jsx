import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
// import { Ionicons, EvilIcons, AntDesign, Entypo } from '@expo/vector-icons'

// ₹

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('deposit');

  const [history, setHistory] = useState([]);
  const isDeposit = activeTab === 'deposit';
  const isWithDraw = activeTab === 'withdraw';
  const isDepositHistory = activeTab === 'deposit_history';
  const isWithDrawHistory = activeTab === 'withdraw_history';



  const handleDepositWithdraw = (tab) => {
    setActiveTab(tab);
  };
  // alert(amount)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Wallet</Text>
        <Text style={styles.balanceText}>₹1,000.00</Text>

        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'space-between', alignContent: 'center', marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => handleDepositWithdraw('deposit')}
            style={{ height: 80, width: 80, backgroundColor: '#d9ad82', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/wallet/deposit.png')} style={{ height: 50, width: 50 }} />
            <Text style={{ color: 'white', fontSize: 10 }}>Deposite</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDepositWithdraw('withdraw')}
            style={{ height: 80, width: 80, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/wallet/withdraw.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontSize: 12, marginVertical: 3 }} >Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDepositWithdraw('withdraw_history')}
            style={{ height: 80, width: 80, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/wallet/withdrawHistory.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontSize: 12, marginVertical: 3, textAlign: 'center' }} >Withdraw History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDepositWithdraw('deposit_history')}
            style={{ height: 80, width: 80, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/wallet/depositeHistory.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontSize: 12, marginVertical: 3, textAlign: 'center' }}>Deposite History</Text>
          </TouchableOpacity>
        </View>


      </View>


      {/* Add similar sections for other tabs: withdraw_history and deposit_history */}
    </ScrollView>
  );
};

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
    marginVertical: 20
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 20,
    color: 'green',
    marginBottom: 20,
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

export default Wallet;
