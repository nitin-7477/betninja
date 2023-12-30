import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import { useNavigation } from "@react-navigation/native";
import DepositeScreen from '../components/walletscreens/DepositeScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../components/Constants/Colors";
import Icons from "react-native-vector-icons/Ionicons"
import axios from "axios";

const Wallet = () => {
  const navigation = useNavigation();
  const [userBalance, setUserBalance] = useState(null);
  const [selectedButton, setSelectedButton] = useState('Deposite'); // Initialize with the first button

  const [userInformation, setUserInformation] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
          headers: {
            "Authorization": JSON.parse(token),
          },
        });
        setUserInformation(response.data);
      } catch (error) {
        console.error('Error fetching user data in Wallet Screenxxxxxxxxxxx:', error);
      }
    };

    fetchData();
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
          {userInformation ? `Balance: ${userInformation.wallet}` : 'Loading...'}
        </Text>
        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'space-between', alignContent: 'center', marginBottom: 10 }}>
          {renderButton('Deposite', require('../assets/wallet/deposit.png'))}
          {renderButton('Withdraw', require('../assets/wallet/withdraw.png'))}
          {renderButton('WithdrawHistory', require('../assets/wallet/withdrawHistory.png'))}
          {renderButton('DepositHistory', require('../assets/wallet/depositeHistory.png'))}
        </View>
        <View style={{ height: SCREEN_HEIGHT * 0.45, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.white, marginVertical: 30, borderRadius: 10, padding: 10, elevation: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icons name="person" size={20} color={'red'} />
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginVertical: 5, marginHorizontal: 10 }}>User Details</Text>
          </View>
          <View style={{ borderBottomWidth: 0.5, borderColor: Colors.fontGray, marginVertical: 10 }}></View>
          <View style={{ width: '100%', height: '15%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', borderRadius: 6 }}>
            <Text style={{ fontWeight: 'bold', color: Colors.fontGray, fontSize: 16 }}>UId</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation.uid}</Text>

          </View>
          <View style={{ width: '100%', height: '15%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', borderRadius: 6, }}>
            <Text style={{ fontWeight: 'bold', color: Colors.fontGray, fontSize: 16 }}>Email Id</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation.email}</Text>
          </View>
          <View style={{ width: '100%', height: '15%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', borderRadius: 6 }}>
            <Text style={{ fontWeight: 'bold', color: Colors.fontGray, fontSize: 16 }}>Contact</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation.phone}</Text>

          </View>
          <View style={{ width: '100%', height: '15%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', borderRadius: 6, }}>
            <Text style={{ fontWeight: 'bold', color: Colors.fontGray, fontSize: 16 }}>Wallet Balance</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>Rs. {userInformation.wallet}</Text>

          </View>
          <View style={{ width: '100%', height: '15%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', borderRadius: 6, }}>
            <Text style={{ fontWeight: 'bold', color: Colors.fontGray, fontSize: 16 }}>Invite Code</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation.inviteCode}</Text>

          </View>
          <View style={{ width: '100%', height: '15%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', borderRadius: 6, }}>
            <Text style={{ fontWeight: 'bold', color: Colors.fontGray, fontSize: 16 }}>Level :</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation.level}</Text>

          </View>
          {/* <Text style={{ textAlign: 'center', color: 'red', fontSize: 18, fontWeight: '700', letterSpacing: 1, marginTop: 5 }}>Happy Gaming...</Text> */}
        </View>
        <View style={{ height: 220, width: 320, alignSelf: 'center', marginTop: 10, borderRadius: 5, elevation: 3, backgroundColor: 'white', padding: 6 }}>
          <View style={{ height: 30, width: 320, paddingHorizontal: 10, paddingVertical: 3 }}>
            <Text style={{ fontWeight: '700', fontSize: 16, color: 'black' }}>Promotion Data</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', borderRightColor: 'grey', borderRightWidth: 1 }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
              <Text style={{ textAlign: 'center', color: 'grey' }}>This Week</Text>

            </View>
            <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
              <Text style={{ textAlign: 'center', color: 'grey' }}>Total Commission</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
              <Text style={{ textAlign: 'center', color: 'grey' }}>Direct Subordinate</Text>
            </View>
            <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: 'grey', }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
              <Text style={{ textAlign: 'center', color: 'grey' }}>Total number of Subordinate in the team</Text>
            </View>

          </View>

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
