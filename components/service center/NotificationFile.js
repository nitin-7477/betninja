import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../Constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';


const NotificationFile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}><TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
        <Ionicons name='return-up-back' color={'white'} size={30} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Notification</Text></View>

      <View style={styles.notification}>
        <View style={{ height: '100%', width: '12%', }}>
          <AntDesign name='sound' size={20} color={'purple'} />
        </View>
        <View style={{ height: '100%', width: '88%' }}>
          <Text style={styles.heading}>Withdrawl recieved funds time</Text>
          <Text style={{ letterSpacing: 1, lineHeight: 20, marginBottom: 10 }}>Hello withdrawals typically take 1-2 hours to process. We appreciate your patience and request that you wait for the status success before attempting to access your bank or e-wallet. Happy Gaming</Text>
          <Text>2023-08-22  15:19:11</Text>
        </View>

      </View>

      <View style={styles.notification}>
        <View style={{ height: '100%', width: '12%', }}>
          <AntDesign name='sound' size={20} color={'purple'} />
        </View>
        <View style={{ height: '100%', width: '88%' }}>
          <Text style={styles.heading}>Minors are not allowed to participate in the game</Text>
          <Text style={{ letterSpacing: 1, lineHeight: 20, marginBottom: 10 }}>Minors are not allowed to participate in the game</Text>
          <Text>2023-08-22  15:19:11</Text>
        </View>

      </View>

      <View style={styles.notification}>
        <View style={{ height: '100%', width: '12%', }}>
          <AntDesign name='sound' size={20} color={'purple'} />
        </View>
        <View style={{ height: '100%', width: '88%' }}>
          <Text style={styles.heading}>Must tied the  correct bank/ewallet details</Text>
          <Text style={{ letterSpacing: 1, lineHeight: 20, marginBottom: 10 }}>Attention for all members, please make sure that you registered your bank details correctly to avoid wrong transfers in future! Please contact our official customer service if you registered it wrong, thank you!</Text>
          <Text>2023-08-22  15:19:11</Text>
        </View>

      </View>
      <Text style={{ width: SCREEN_WIDTH, textAlign: 'center',  }}>No More</Text>
    </View>
  )
}

export default NotificationFile

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10
  },
  notification: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    height: 'auto',
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 10

  },
  heading: { fontSize: 16, color: 'black', fontWeight: '500', marginBottom: 20 },
})