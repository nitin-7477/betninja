import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, ActivityIndicator, Modal, RefreshControl } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import { useNavigation } from "@react-navigation/native";
import DepositeScreen from '../components/walletscreens/DepositeScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../components/Constants/Colors";
import Icons from "react-native-vector-icons/Ionicons"
import axios from "axios";
import Clipboard from '@react-native-clipboard/clipboard';
import Feather from "react-native-vector-icons/Feather";
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Entypo from "react-native-vector-icons/Entypo"


const Wallet = () => {
  const navigation = useNavigation();
  const [userBalance, setUserBalance] = useState(null);
  const [selectedButton, setSelectedButton] = useState('Deposite'); // Initialize with the first button
  const [userInformation, setUserInformation] = useState([]);

  const [commission, setCommission] = useState([])
  const [loading, setLoading] = useState(false);
  const [referalCode, setReferalCode] = useState('')
  const [copyUID, setCopyUID] = useState('')
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const copyToClipboardUID = () => {
    Clipboard.setString(copyUID);
    setShowCopyModal(true)
    setTimeout(() => {
      setShowCopyModal(false);
    }, 2000);

  };

  const copyToClipboard = () => {
    Clipboard.setString(referalCode);
    setShowCopyModal(true)
    setTimeout(() => {
      setShowCopyModal(false);
    }, 2000);

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
      console.log("xxxxxxxxxxxxxxxx", result.data.data);
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

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true)
      // Retrieve user data from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }
      console.log(process.env.SERVERURL);

      const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
        headers: {
          "Authorization": JSON.parse(token),
        },
      });
      setUserInformation(response.data);
      setCopyUID(response.data.uid)
    } catch (error) {
      console.error('Error fetching user data in Wallet Screenxxxxxxxxxxx:', error.response);
    }
    finally {
      setLoading(false)
    }
  };

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
        <Text style={{ color: isSelected ? 'white' : 'black', fontSize: 11, textAlign: 'center' }}>
          {buttonName === 'WithdrawHistory' ? 'Withdraw\nHistory' :
            buttonName === 'DepositHistory' ? 'Deposit\n History' :
              buttonName === 'Deposite' ? 'Deposite' :
                buttonName === 'Withdraw' ? 'Withdraw' : ''}
        </Text>
      </TouchableOpacity>
    );
  };
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // Call your data fetching function here (e.g., fetchCommissionData)
      await fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ position: 'relative' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ff0000', '#00ff00', '#0000ff']} // Set the colors of the refresh indicator
          />
        }
      >
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
            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>UID</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={copyToClipboardUID}>
                <Feather name='copy' size={20} color={Colors.fontGray} />
              </TouchableOpacity>
              <Text style={{ fontWeight: '400', color: 'black', fontSize: 16, }}>{userInformation?.uid}</Text>

            </View>
          </View>
          <View style={styles.cardSubTitle}>
            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Email Id</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation?.email}</Text>
          </View>
          <View style={styles.cardSubTitle}>
            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Contact</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>+91-{userInformation?.phone}</Text>

          </View>
          <View style={styles.cardSubTitle}>
            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Wallet Balance</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>Rs. {userInformation?.wallet?.toFixed(2)}</Text>

          </View>
          <View style={styles.cardSubTitle}>
            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Invite Code</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={copyToClipboard}>
                <Feather name='copy' size={20} color={Colors.fontGray} />
              </TouchableOpacity>
              <Text style={{ fontWeight: '400', color: 'black', fontSize: 16, marginRight: 10 }}>{userInformation?.inviteCode}</Text>

            </View>
          </View>
          <View style={styles.cardSubTitle}>
            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: 16 }}>Level :</Text>
            <Text style={{ fontWeight: '400', color: 'black', fontSize: 16 }}>{userInformation?.level}</Text>
          </View>

        </ImageBackground>
        <View style={{ height: responsiveHeight(35), width: responsiveWidth(95), alignSelf: 'center', marginTop: responsiveHeight(2), borderRadius: 5, elevation: 3, backgroundColor: 'white', padding: 6, marginBottom: responsiveHeight(5) }}>
          <View style={{ height: responsiveHeight(5), width: responsiveWidth(92), paddingHorizontal: 10, paddingVertical: 3 }}>
            <Text style={{ fontWeight: '700', fontSize: 16, color: 'black' }}>Promotion Data</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ width: responsiveWidth(46), height: responsiveHeight(10), justifyContent: 'center', borderRightColor: 'grey', borderRightWidth: 1 }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
              <Text style={{ textAlign: 'center', color: 'grey', fontSize: 16 }}>This Week</Text>

            </View>
            <View style={{ width: responsiveWidth(46), height: responsiveHeight(10), justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>{commission?.total_commission?.toFixed(2)}</Text>
              <Text style={{ textAlign: 'center', color: 'grey', fontSize: 16 }}>Total Commission</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ width: responsiveWidth(46), height: responsiveHeight(12), justifyContent: 'center', }}>
              <Text style={{ textAlign: 'center', color: 'green' }}> {commission?.direct?.number_of_register}</Text>
              <Text style={{ textAlign: 'center', color: 'grey', fontSize: 16 }}>Direct Subordinate</Text>
            </View>
            <View style={{ width: responsiveWidth(46), height: responsiveHeight(12), justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: 'grey' }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>{totalRegisterCount}</Text>
              <Text style={{ textAlign: 'center', color: 'grey', fontSize: 16 }}>Total number of Subordinate in the team</Text>
            </View>

          </View>

        </View>
        <View style={{ height: SCREEN_HEIGHT * 0.5, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.lightGray, marginVertical: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/dollar.png')} style={{ height: 200, width: 200 }} />
        </View>
        <Modal visible={showCopyModal} transparent={true}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              width: 150, // Set your desired width
              height: 150, // Set your desired height
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
              <Entypo name="check" size={30} color={'white'} />
              <Text style={{ color: 'white' }}>Copy Succesfull</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View style={styles.fixedBox}>
        {/* Your content for the fixed box goes here */}
        <TouchableOpacity onPress={() => navigation.navigate('CustomerServices')} style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }} >
          <Image source={require('../assets/customerCare.png')} style={{ height: 60, width: 60 }} />
        </TouchableOpacity>
      </View>
    </View>
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
  tile1: {
    height: responsiveHeight(7),
    width: responsiveWidth(95)
    , alignSelf: 'center',
    marginTop: responsiveHeight(2),
    borderRadius: 5, elevation: 3, backgroundColor: 'white'
  },
  tile2: {
    height: responsiveHeight(7),
    width: responsiveWidth(95),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(1),
    flexDirection: 'row',
  },
  fixedBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
  },
};

export default Wallet;
