import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Promotion from "./Promotion";
import Activity from "./Activity";
import Wallet from "./Wallet";
import Account from "./Account";
import Main from "./Main";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/Constants/Screen";
import { Colors } from "../components/Constants/Colors";
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { responsiveHeight } from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";


const Tab = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  // const [amount, setAmount] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(
    "Welcome to Bet Ninja"
  );

  const handleDeposit = (amount, extraAmount) => {
    setModalVisible(false);
    navigation.navigate('DepositeScreen', { depositAmount: amount, extraAmount: extraAmount });

  }
  console.log(process.env.SERVERURL);

  const closeModal = () => {
    setModalVisible(false);
  };



  const hideNotification = () => {
    setNotificationVisible(false);
  };

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {

      position: 'relative',
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 5,
      height: SCREEN_HEIGHT * 0.1,
      backgroundColor: '#FFF',
      borderRadius: 20,
      width: SCREEN_WIDTH * 1,
      alignSelf: 'center'

    }
  }


  return (
    <>



      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Tab.Screen name="Promotion" component={Promotion} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', width: '250%' }}>
                <FontAwesome name="line-chart" size={20} color={focused ? 'red' : '#16247d'} />
                <Text style={{ color: focused ? 'red' : '#16247d' }}>Promotion</Text>
              </View>
            )
          }
        }} />
        <Tab.Screen name="Activity" component={Activity} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', width: '250%' }}>
                <Feather name="activity" size={15} color={focused ? 'red' : '#16247d'} />
                <Text style={{ color: focused ? 'red' : '#16247d' }}>Activity</Text>
              </View>
            )
          }
        }} />
        <Tab.Screen name="Home" component={Main} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -70, height: 60, width: 60, backgroundColor: 'red', borderRadius: 50, elevation: 10 }}>
                <Entypo name="home" size={20} color={focused ? 'white' : 'white'} />
                <Text style={{ color: focused ? 'white' : 'white' }}>Home</Text>
              </View>
            )
          }
        }}
        />
        <Tab.Screen name="Wallet" component={Wallet} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', width: '250%' }}>
                <Entypo name="wallet" size={20} color={focused ? 'red' : '#16247d'} />
                <Text style={{ color: focused ? 'red' : '#16247d' }}>Wallet</Text>
              </View>
            )
          }
        }} />
        <Tab.Screen name="Account" component={Account} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', width: '250%' }}>
                <MaterialCommunityIcons name="account" size={20} color={focused ? 'red' : '#16247d'} />
                <Text style={{ color: focused ? 'red' : '#16247d' }}>Account</Text>
              </View>
            )
          }
        }} />

      </Tab.Navigator>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Handle modal close (e.g., Android back button press)
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>


          <View style={{ height: 'auto', width: SCREEN_WIDTH * 0.8, alignSelf: 'center', backgroundColor: 'white', borderRadius: 10, borderRadius: 10, paddingBottom: 10 }}>
            <View style={{ height: responsiveHeight(10), width: '100%', backgroundColor: '#f95959', borderTopStartRadius: 10, borderTopEndRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Extra First Deposit Bonus</Text>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Each account can only receive rewards once</Text>
            </View>
            <View style={{ height: 'auto', width: '95%', backgroundColor: 'white', elevation: 5, alignSelf: 'center', marginTop: 5, borderRadius: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3, padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'black' }}>first deposit</Text>
                  <Text style={{ color: 'red', marginLeft: 5, fontWeight: 'bold' }}>2000</Text>
                </View>
                <Text style={{ color: 'orange', fontWeight: 'bold' }}>+₹ 200.00</Text>
              </View>
              <Text style={{ color: 'black', padding: 5 }}>Deposit 2000 for the first time in your account and you can receive 200</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 5 }}>
                <View style={{ width: '50%', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                  <Text style={{ color: 'white' }}>0/2000</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeposit(2000, "+₹ 200.00")}
                  style={{ height: 30, width: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 5 }}><Text style={{ color: 'white' }}     >Deposit</Text></TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 'auto', width: '95%', backgroundColor: 'white', elevation: 5, alignSelf: 'center', marginTop: 5, borderRadius: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3, padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'black' }}>second deposit</Text>
                  <Text style={{ color: 'red', marginLeft: 5, fontWeight: 'bold' }}>1000</Text>
                </View>
                <Text style={{ color: 'orange', fontWeight: 'bold' }}>+₹ 118.00</Text>
              </View>
              <Text style={{ color: 'black', padding: 5 }}>Deposit 1000 for the first time in your account and you can receive 118</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 5 }}>
                <View style={{ width: '50%', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                  <Text style={{ color: 'white' }}>0/1000</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeposit(1000, "+₹ 118.00")} style={{ height: 30, width: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 5 }}><Text style={{ color: 'white' }}     >Deposit</Text></TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 'auto', width: '95%', backgroundColor: 'white', elevation: 5, alignSelf: 'center', marginTop: 5, borderRadius: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3, padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'black' }}>third deposit</Text>
                  <Text style={{ color: 'red', marginLeft: 5, fontWeight: 'bold' }}>400</Text>
                </View>
                <Text style={{ color: 'orange', fontWeight: 'bold' }}>+₹ 50.00</Text>
              </View>
              <Text style={{ color: 'black', padding: 5 }}>Deposit 400 for the first time in your account and you can receive 50</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 5 }}>
                <View style={{ width: '50%', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                  <Text style={{ color: 'white' }}>0/400</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeposit(400, "+₹ 50.00")}
                  style={{ height: 30, width: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 5 }}><Text style={{ color: 'white' }}     >Deposit</Text></TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 'auto', width: '95%', backgroundColor: 'white', elevation: 5, alignSelf: 'center', marginTop: 5, borderRadius: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3, padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'black' }}>fourth deposit</Text>
                  <Text style={{ color: 'red', marginLeft: 5, fontWeight: 'bold' }}>200</Text>
                </View>
                <Text style={{ color: 'orange', fontWeight: 'bold' }}>+₹ 30.00</Text>
              </View>
              <Text style={{ color: 'black', padding: 5 }}>Deposit 200 for the first time in your account and you can receive 30</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 5 }}>
                <View style={{ width: '50%', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                  <Text style={{ color: 'white' }}>0/2000</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeposit(200, "+₹ 30.00")}
                  style={{ height: 30, width: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 5 }}><Text style={{ color: 'white' }}     >Deposit</Text></TouchableOpacity>
              </View>
            </View>


            {/* <TouchableOpacity
              style={styles.signIn}
              onPress={closeModal}
            >
              <Text style={{
                color: 'white',
                textAlign: "center",
                fontSize: 20,
              }}
              >
                Close
              </Text>
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity onPress={closeModal} style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', elevation: 5, alignSelf: 'center', borderRadius: 50, marginVertical: 1 }}>
            <Text style={{ textAlign: 'center', color: 'black' }}>X</Text>
          </TouchableOpacity>
        </View>

      </Modal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'purple',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10
  },
  // modalContent: {
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderRadius: 10,
  //   alignItems: 'center',
  // },
})
