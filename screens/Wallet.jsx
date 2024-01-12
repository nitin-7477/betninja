import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import { useNavigation } from "@react-navigation/native";
import DepositeScreen from '../components/walletscreens/DepositeScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../components/Constants/Colors";
import Icons from "react-native-vector-icons/Ionicons"
import axios from "axios";
import Clipboard from '@react-native-clipboard/clipboard';
import Feather from "react-native-vector-icons/Feather";

const Wallet = () => {
  const navigation = useNavigation();
  const [userBalance, setUserBalance] = useState(null);
  const [selectedButton, setSelectedButton] = useState('Deposite'); // Initialize with the first button
  const [userInformation, setUserInformation] = useState([]);

  const [commission, setCommission] = useState([])
  const [loading, setLoading] = useState(false);
  const [referalCode, setReferalCode] = useState('')

  const copyToClipboard = () => {
    Clipboard.setString(referalCode);

  };



  const fetchCommissionData = async () => {
    try {

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }
      console.log("This is the main token", JSON.parse(token));


      var result = await axios.get(`${process.env.SERVERURL}/api/commission/commission`, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })
      console.log(result.data.data);
      setCommission(result.data.data)
      setReferalCode(result.data.data.referalCode)


    } catch (e) {
      console.log("ERROR IN FETCHING COMMISSION", e);
    }

  }

  useEffect(() => {
    fetchCommissionData()
  }, []);

  console.log("This is commission details for wallet screen------", commission);

  const directRegisterCount = commission?.direct?.number_of_register || 0;
  const teamRegisterCount = commission?.team?.number_of_register || 0;
  const totalRegisterCount = directRegisterCount + teamRegisterCount;


  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true)
        // Retrieve user data from AsyncStorage
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
        console.error('Error fetching user data in Wallet Screenxxxxxxxxxxx:', error);
      }
      finally {
        setLoading(false)
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
      height: '100%',
      width: '24%',
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
        <Image source={require('../assets/wallet/wallet.png')} style={{ height: 40, width: 40 }} />
        <Text style={styles.balanceText}>
          {userInformation?.wallet ? `₹ ${userInformation?.wallet?.toFixed(2)}` : 'Loading...'}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Total Balance</Text>

      </View>

      <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 10, marginTop: -40, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.95, justifyContent: 'space-evenly', alignItems: 'center' }}>
          {renderButton('Deposite', require('../assets/wallet/deposit.png'))}
          {renderButton('Withdraw', require('../assets/wallet/withdraw.png'))}
          {renderButton('WithdrawHistory', require('../assets/wallet/withdrawHistory.png'))}
          {renderButton('DepositHistory', require('../assets/wallet/depositeHistory.png'))}
        </View>
      </View>

      <ImageBackground
        source={require('../assets/gradiant2.jpg')}
        style={{ height: SCREEN_HEIGHT * 0.45, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', marginVertical: 20, elevation: 5, padding: 10, borderRadius: 20 }}>
        {loading && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size={100} color="gold" />
          </View>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icons name="person" size={20} color={'red'} />
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginVertical: 5, marginHorizontal: 10 }}>User Details : {userInformation?.username}</Text>
        </View>
        <View style={{ borderBottomWidth: 0.5, borderColor: Colors.fontGray, marginVertical: 10 }}></View>
        <View style={styles.cardSubTitle}>
          <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>UId</Text>
          <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation?.uid}</Text>

        </View>
        <View style={styles.cardSubTitle}>
          <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Email Id</Text>
          <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation?.email}</Text>
        </View>
        <View style={styles.cardSubTitle}>
          <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Contact</Text>
          <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation?.phone}</Text>

        </View>
        <View style={styles.cardSubTitle}>
          <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Wallet Balance</Text>
          <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>Rs. {userInformation?.wallet?.toFixed(2)}</Text>

        </View>
        <View style={styles.cardSubTitle}>
          <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Invite Code</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16, marginRight: 10 }}>{userInformation?.inviteCode}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Feather name='copy' size={20} color={Colors.fontGray} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardSubTitle}>
          <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Level :</Text>
          <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation?.level}</Text>
        </View>

      </ImageBackground>
      <View style={{ height: 220, width: 320, alignSelf: 'center', marginTop: 10, borderRadius: 5, elevation: 3, backgroundColor: '#FBF7F3', padding: 6 }}>
        <View style={{ height: 30, width: 320, paddingHorizontal: 10, paddingVertical: 3 }}>
          <Text style={{ fontWeight: '700', fontSize: 16, color: 'black' }}>Promotion Data</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', borderRightColor: 'grey', borderRightWidth: 1 }}>
            <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
            <Text style={{ textAlign: 'center', color: 'grey' }}>This Week</Text>

          </View>
          <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'green' }}>{commission?.total_commission}</Text>
            <Text style={{ textAlign: 'center', color: 'grey' }}>Total Commission</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'green' }}> {commission?.direct?.number_of_register}</Text>
            <Text style={{ textAlign: 'center', color: 'grey' }}>Direct Subordinate</Text>
          </View>
          <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: 'grey', }}>
            <Text style={{ textAlign: 'center', color: 'green' }}>{totalRegisterCount}</Text>
            <Text style={{ textAlign: 'center', color: 'grey' }}>Total number of Subordinate in the team</Text>
          </View>

        </View>

      </View>
      <View style={{ height: SCREEN_HEIGHT * 0.5, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.lightGray, marginVertical: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/dollar.png')} style={{ height: 200, width: 200 }} />
      </View>

    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    // marginBottom: 80
  },
  header: {
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH * 1,
    alignSelf: 'center',
    backgroundColor: '#cfa67f'
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold', marginTop: 5

  },
  balanceText: {
    fontSize: 26,
    color: 'white',
    marginBottom: 10,
  },
  cardSubTitle: { width: '100%', height: '15%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', borderRadius: 6 },
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

export default Wallet;
