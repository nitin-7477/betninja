import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import { Colors } from '../Constants/Colors'
import AppTextInput from '../AppTextInput'
import Feather from "react-native-vector-icons/Feather";


const BindMail = () => {
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Bind MailBox</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Feather name='lock' size={20} color={Colors.fontGray} />
        <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Email Address</Text>
      </View>
      <AppTextInput placeholder="Please Input Email Address" />
      <View style={{ flexDirection: 'row' }}>
        <Feather name='lock' size={20} color={Colors.fontGray} />
        <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Referrel Code</Text>
      </View>
      <AppTextInput placeholder='Please Enter Referrel Code' />
      <View style={{ flexDirection: 'row' }}>
        <Feather name='lock' size={20} color={Colors.fontGray} />
        <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Verification Code</Text>
      </View>
      <AppTextInput placeholder="Please Enter Verification code" />
      <TouchableOpacity style={styles.otpBtn} >
        <Text style={{ color: 'white', textAlign: "center", fontSize: 16, }} >
          Check
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signIn}>
        <Text style={{ color: 'white', textAlign: "center", fontSize: 18, fontWeight: 'bold' }} >
          Bind
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BindMail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    padding: 20
  },
  header: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors.lightGray, justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 50
  },
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'purple',
    marginVertical: 30,
    bottom: 0,
    left: 20,
    position: 'absolute',
    borderRadius: 10,
    elevation: 5,
    width: '100%'
  },
  otpBtn: {
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 70,
    elevation: 5,
    paddingVertical: 3
  },
})