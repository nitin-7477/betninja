import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import { Colors } from '../Constants/Colors'
import AppTextInput from '../AppTextInput'
import Feather from "react-native-vector-icons/Feather";


const BindMail = () => {
  const handleBind = () => {
    Alert.alert('This feature is availbale in New update')
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>Bind MailBox</Text>
      </View>
      <View style={{ flexDirection: 'row', height: 40 }}>
        <Feather name='lock' size={20} color={Colors.fontGray} />
        <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Email Address</Text>
      </View>
      <AppTextInput placeholder="Please Input Email Address" />

      <View style={{ height: 70 }}>
        <AppTextInput placeholder="Please Enter Verification code" />
      </View>
      <TouchableOpacity style={styles.otpBtn} >
        <Text style={{ color: 'white', textAlign: "center", fontSize: 16, }} >
          Check
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleBind}
        style={styles.signIn}>
        <Text style={{ color: 'white', textAlign: "center", fontSize: 18, fontWeight: 'bold' }} >
          Bind
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default BindMail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    padding: 20, alignSelf: 'center', height: SCREEN_HEIGHT * 1
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
    paddingHorizontal: 2,
    paddingVertical: 10,
    backgroundColor: 'purple',
    borderRadius: 10,
    elevation: 5,
    width: '100%', marginBottom: 30

  },
  otpBtn: {
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 70,
    elevation: 5,
    paddingVertical: 3, marginVertical: 30
  },
})