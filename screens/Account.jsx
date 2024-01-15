import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import { Colors } from "../components/Constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import axios from "axios";
import Clipboard from "@react-native-clipboard/clipboard";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

const Account = () => {
  const navigation = useNavigation();
  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});
  const [loading, setLoading] = useState(false)
  const [selectedButton, setSelectedButton] = useState('Deposite');
  const [copyUID, setCopyUID] = useState('')



  // const copyToClipboard = () => {
  //   Clipboard.setString(copyUID);

  // };


  const [showCopyModal, setShowCopyModal] = useState(false)

  const copyToClipboard = () => {
    Clipboard.setString(copyUID);
    setShowCopyModal(true)
    setTimeout(() => {
      setShowCopyModal(false);
    }, 2000);

  };

  useEffect(() => {
    const fetchData = async () => {
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
        console.log(response.data);
        setUserInformation(response.data);
        setCopyUID(response.data.uid)
      } catch (error) {
        console.error('Error fetching user data in Account Screen:', error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  console.log("This is user information for Account Screen", userInformation);

  const handleLogOut = async () => {
    try {

      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout:', error);
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


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

      <View style={styles.header}>
        <Image
          source={require("../image/1.jpg")}
          style={styles.profileImage}
        />

        <View style={styles.userInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4C2C2', padding: 5, marginTop: 10, borderRadius: 10, borderWidth: 0.5 }}>
            <Image source={require('../assets/crown.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
            <Text style={styles.userName}>{userInformation.username}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginRight: 7 }} onPress={copyToClipboard}>
              <Feather name='copy' size={20} color={'grey'} />
            </TouchableOpacity>
            <Text style={styles.userId}>{userInformation.uid}</Text>
          </View>

        </View>
      </View>
      {/* *********Total Balance Card********************** */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.balance}>
          <Text style={{ color: 'black', width: 'auto' }}>Total Balance:- ₹ {userInformation?.wallet?.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={{ width: 80, height: 35, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 10 }}
          onPress={() => navigation.navigate('LevelScreen')}>
          <Text style={styles.level}>Level: {userInformation?.level}</Text>
        </TouchableOpacity>
      </View>

      {/* *********Navigating to different screens********************** */}
      <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 10, marginTop: -40, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.95, justifyContent: 'space-evenly', alignItems: 'center' }}>
          {renderButton('Deposite', require('../assets/wallet/deposit.png'))}
          {renderButton('Withdraw', require('../assets/wallet/withdraw.png'))}
          {renderButton('WithdrawHistory', require('../assets/wallet/withdrawHistory.png'))}
          {renderButton('DepositHistory', require('../assets/wallet/depositeHistory.png'))}
        </View>
      </View>

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.sectionItems}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            style={{
              justifyContent: 'space-between', flexDirection: 'row', width: '100%', alignItems: 'center', height: '25%', borderBottomWidth: 0.2,
              borderColor: Colors.fontGray,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="notifications" size={24} color="black" />
              <Text style={{ color: 'black' }}>Notifications</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Gifts")}
            style={{
              justifyContent: 'space-between', flexDirection: 'row', width: '100%', alignItems: 'center', height: '25%', borderBottomWidth: 0.2,
              borderColor: Colors.fontGray,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="gift" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: 'black' }}>Gifts</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("GameStats")} style={{
              justifyContent: 'space-between', flexDirection: 'row', width: '100%', alignItems: 'center', height: '25%', borderBottomWidth: 0.2,
              borderColor: Colors.fontGray,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="stats-chart" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: 'black' }}>Game Chart</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Language")}
            style={{
              justifyContent: 'space-between', flexDirection: 'row', width: '100%', alignItems: 'center', height: '25%', borderBottomWidth: 0.2,
              borderColor: Colors.fontGray,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="language" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15, color: 'black' }}>Languages</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 10 }}>English</Text>
              <AntDesign name="right" size={16} color="grey" /></View>

          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.serviceItems}>
        <Text style={styles.serviceTitle}>Service Center</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Setting")}
            style={styles.serviceIcons}>
            <Ionicons name="settings" size={24} color="black" />
            <Text style={{ color: 'black' }}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FeedbackForm')}
            style={styles.serviceIcons}>
            <Ionicons name="chatbubble" size={24} color="black" />
            <Text style={{ color: 'black' }}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CustomerServices')}
            style={styles.serviceIcons}>
            <Ionicons name="person-sharp" size={24} color="black" />
            <Text style={{ color: 'black' }}>Customer Service</Text>
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationFile')}
            style={styles.serviceIcons}>
            <AntDesign name='sound' size={20} color={'black'} />
            <Text style={{ color: 'black' }}>Announcemet</Text>
          </TouchableOpacity>
          <View style={styles.serviceIcons}>

            <Ionicons name="book" size={24} color="black" />
            <Text style={{ color: 'black' }}>Beginner's Guide</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AboutUs')}
            style={styles.serviceIcons}>

            <Ionicons name="information-circle" size={24} color="black" />
            <Text style={{ color: 'black' }}>About Us</Text>
          </TouchableOpacity >
        </View>
      </View>

      <TouchableOpacity
        onPress={() => handleLogOut()}
        style={styles.logoutButton}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={100} color="gold" />
        </View>
      )}

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
  );
};

const styles = {
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white'

  },
  header: {
    flexDirection: "row",

    justifyContent: 'space-between'
  },
  profileImage: {
    width: 90,
    height: 60,
    borderRadius: 50,
    resizeMode: 'contain'
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  userId: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginVertical: 10,
    textAlign: 'right'
  },
  level: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',

  },
  balance: {
    marginVertical: 20,
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
    width: 'auto',
    marginLeft: 5,
    borderRadius: 50

  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconItem: {
    alignItems: "center",
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: 'black'
  },
  sectionItems: {
    flex: 1, height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.9, backgroundColor: Colors.lightGray, padding: 10, borderRadius: 7, alignSelf: 'center', justifyContent: 'center'
  },
  serviceItems: {
    height: 'auto', width: SCREEN_WIDTH * 0.9, backgroundColor: Colors.lightGray, padding: 10, borderRadius: 7, alignSelf: 'center'
  },
  serviceIcons: {
    alignItems: 'center',
    width: 100,
    height: 70,
    // backgroundColor: 'red',
    justifyContent: 'center'
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderColor: Colors.fontGray,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  logoutButton: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginVertical: 30,
    marginBottom: 50
  },
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

export default Account;
