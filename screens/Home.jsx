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

const Tab = createBottomTabNavigator();

const Home = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(
    "Your notification message goes here"
  );

  const hideNotification = () => {
    setNotificationVisible(false);
  };

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: 'absoulte',
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 5,
      height: 80,
      backgroundColor: '#FFF',
      borderRadius: 20

    }
  }

  return (
    // <View style={{ flex: 1 }}>
    //   <Tab.Navigator
    //   //  tabBar={props => <CustomButtomTab {...props} />} 
    //    initialRouteName="Home">
    //     <Tab.Screen
    //       options={{ tabBarLabel: "Promotion", headerShown: false }}
    //       name="Promotion"
    //       component={Promotion}
    //     />
    //     <Tab.Screen
    //       options={{ tabBarLabel: "Activity", headerShown: false }}
    //       name="Activity"
    //       component={Activity}
    //     />
    //     <Tab.Screen
    //       options={{ tabBarLabel: "Home", headerShown: false }}
    //       name="Home"
    //       component={Main}
    //     />
    //     <Tab.Screen
    //       options={{ tabBarLabel: "Wallet", headerShown: false }}
    //       name="Wallet"
    //       component={Wallet}
    //     />
    //     <Tab.Screen
    //       options={{ tabBarLabel: "Account", headerShown: false }}
    //       name="Account"
    //       component={Account}
    //     />
    //   </Tab.Navigator>


    //   {/* <Modal isVisible={isNotificationVisible}>
    //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //       <Text>{notificationMessage}</Text>
    //       <View style={{ height: SCREEN_HEIGHT * 0.8, width: SCREEN_WIDTH * 0.8, alignSelf: 'center', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
    //         <View style={{ width: 230, height: 40, backgroundColor: Colors.purple, marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
    //           <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Highlights</Text>
    //         </View>
    //         <Image source={require('../assets/cat2.jpg')} style={{ borderRadius: 10, height: 400, width: 250, resizeMode: 'contain' }} />
    //         <TouchableOpacity
    //           style={styles.signIn}
    //           onPress={hideNotification}
    //         >
    //           <Text style={{
    //             // fontFamily: Font("poppins-bold"),
    //             color: 'white',
    //             textAlign: "center",
    //             fontSize: 20,
    //           }}
    //           >
    //             Confirm
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </Modal> */}

    // </View>
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Promotion" component={Promotion} options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome name="line-chart" size={20} color={focused ? 'red' : '#16247d'} />
              <Text style={{ color: focused ? 'red' : '#16247d' }}>Promotion</Text>
            </View>
          )
        }
      }} />
      <Tab.Screen name="Activity" component={Activity} options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="activity" size={20} color={focused ? 'red' : '#16247d'} />
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
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="wallet" size={20} color={focused ? 'red' : '#16247d'} />
              <Text style={{ color: focused ? 'red' : '#16247d' }}>Wallet</Text>
            </View>
          )
        }
      }} />
      <Tab.Screen name="Account" component={Account} options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="account" size={20} color={focused ? 'red' : '#16247d'} />
              <Text style={{ color: focused ? 'red' : '#16247d' }}>Account</Text>
            </View>
          )
        }
      }} />

    </Tab.Navigator>
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
})
