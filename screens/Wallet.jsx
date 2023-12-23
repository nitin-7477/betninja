import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import { useNavigation } from "@react-navigation/native";
import DepositeScreen from '../components/walletscreens/DepositeScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../components/Constants/Colors";

const Wallet = () => {
  const navigation = useNavigation();
  const [userBalance, setUserBalance] = useState(null);
  const [selectedButton, setSelectedButton] = useState('Deposite'); // Initialize with the first button

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        const parsedUserData = JSON.parse(storedUserData);
        setUserBalance(parsedUserData);
      }

      catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    retrieveUserData();
  }, []);

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderButton = (buttonName, iconSource) => {
    const isSelected = selectedButton === buttonName;
    const buttonStyle = {
      height: 80,
      width: 80,
      backgroundColor: isSelected ? '#d9ad82' : '#D3D3D3',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <TouchableOpacity
        onPress={() => {
          handleButtonPress(buttonName);
          navigation.navigate(`${buttonName}Screen`);
        }}
        style={buttonStyle}
      >
        <Image source={iconSource} style={{ height: 50, width: 50 }} />
        <Text style={{ color: isSelected ? 'white' : 'black', fontSize: 10 }}>{buttonName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Wallet</Text>
        <Text style={styles.balanceText}>
          {userBalance ? `Balance: ${userBalance.user.wallet}` : 'Loading...'}
        </Text>
        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'space-between', alignContent: 'center', marginBottom: 10 }}>
          {renderButton('Deposite', require('../assets/wallet/deposit.png'))}
          {renderButton('Withdraw', require('../assets/wallet/withdraw.png'))}
          {renderButton('WithdrawHistory', require('../assets/wallet/withdrawHistory.png'))}
          {renderButton('DepositHistory', require('../assets/wallet/depositeHistory.png'))}
        </View>
        <View style={{ height: SCREEN_HEIGHT * 0.5, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.lightGray, marginVertical: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/dollar.png')} style={{ height: 200, width: 200 }} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
    color: 'black'
  },
  balanceText: {
    fontSize: 20,
    color: 'green',
    marginBottom: 20,
  },
};

export default Wallet;
