import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import { Colors } from "../components/Constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import axios from "axios";

const Account = () => {
  const navigation = useNavigation();
  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const storedUserData = await AsyncStorage.getItem('token');
        const parsedUserData = JSON.parse(storedUserData);
        setUserToken(parsedUserData);

        // Use the retrieved token to fetch user information
        const token = `${parsedUserData.token}`;
        const response = await axios.get('https://9871-2401-4900-1c19-6daf-d33-85ae-dfd7-8e43.ngrok-free.app/api/auth/user', {
          headers: {
            "Authorization": token,
          },
        });
        setUserInformation(response.data);
      } catch (error) {
        console.error('Error fetching user data in Account Screen:', error);
      }
    };

    fetchData();
  }, []);

  console.log("This is user information for Account Screen", userInformation);

  const handleLogOut = async () => {
    try {

      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../image/1.jpg")}
          style={styles.profileImage}
        />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>User's Name</Text>
          <Text style={styles.userId}>User ID: {userInformation.uid}</Text>
        </View>
      </View>
      {/* *********Total Balance Card********************** */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.balance}>
          <Text style={{ color: 'black' }}>Total Balance:- Rs. {userInformation.wallet}</Text>
        </View>
        <Text style={styles.level}>Level: {userInformation.level}</Text>
      </View>

      {/* *********Navigating to different screens********************** */}

      <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'space-between', alignContent: 'center', marginBottom: 10 }}>

        <TouchableOpacity
          onPress={() => navigation.navigate("Wallet")}
          style={{ height: 80, width: 80, backgroundColor: '#d9ad82', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/wallet/deposit.png')} style={{ height: 50, width: 50 }} />
          <Text style={{ color: 'white', fontSize: 10 }}>Wallet</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate("DepositeScreen")}
          style={{ height: 80, width: 80, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/wallet/withdraw.png')} style={{ height: 40, width: 40 }} />
          <Text style={{ fontSize: 12, marginVertical: 3 }} >Deposite</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("WithdrawScreen")}
          style={{ height: 80, width: 80, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/wallet/withdrawHistory.png')} style={{ height: 40, width: 40 }} />
          <Text style={{ fontSize: 12, marginVertical: 3, textAlign: 'center' }} >Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DepositHistoryScreen")}
          style={{ height: 80, width: 80, backgroundColor: '#D3D3D3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/wallet/depositeHistory.png')} style={{ height: 40, width: 40 }} />
          <Text style={{ fontSize: 12, marginVertical: 3, textAlign: 'center' }}>Deposite History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.sectionItems}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            style={styles.sectionItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="notifications" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>Notifications</Text>
            </View>
            <AntDesign name="right" size={20} color="grey" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Gifts")}
            style={styles.sectionItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="gift" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>Gifts</Text>
            </View>
            <AntDesign name="right" size={20} color="grey" />

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("GameStats")} style={styles.sectionItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="stats-chart" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>Game Chart</Text>
            </View>
            <AntDesign name="right" size={20} color="grey" />

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Language")}
            style={styles.sectionItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="language" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>Languages</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 10 }}>English</Text>
              <AntDesign name="right" size={20} color="grey" /></View>

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
          <View style={styles.serviceIcons}>
            <Ionicons name="person-sharp" size={24} color="black" />
            <Text style={{ color: 'black' }}>Customer Service</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <View style={styles.serviceIcons}>
            <Ionicons name="notifications" size={24} color="black" />
            <Text style={{ color: 'black' }}>Notification</Text>
          </View>
          <View style={styles.serviceIcons}>

            <Ionicons name="book" size={24} color="black" />
            <Text style={{ color: 'black' }}>Beginner's Guide</Text>
          </View>
          <View style={styles.serviceIcons}>

            <Ionicons name="information-circle" size={24} color="black" />
            <Text style={{ color: 'black' }}>About Us</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => handleLogOut()}
        style={styles.logoutButton}>
        <Text style={{ color: 'white' }}>Logout</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: 'bold',
    color: 'black'
  },
  level: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',

  },
  balance: {
    marginVertical: 20,
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
    width: 200,
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
    height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.9, backgroundColor: Colors.lightGray, padding: 10, borderRadius: 7
  },
  serviceItems: {
    height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.9, backgroundColor: Colors.lightGray, padding: 10, borderRadius: 7
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
    justifyContent: 'space-between'
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
};

export default Account;
