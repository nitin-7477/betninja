import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import { Colors } from '../Constants/Colors'
import AppTextInput from '../AppTextInput'
import Feather from "react-native-vector-icons/Feather";


const SettingLogin = () => {
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Change Login Password</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Feather name='lock' size={20} color={Colors.fontGray} />
        <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Login password</Text>
      </View>
      <AppTextInput placeholder="Please Enter Login Password" />
      <View style={{ flexDirection: 'row' }}>
        <Feather name='lock' size={20} color={Colors.fontGray} />
        <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>New Login password</Text>
      </View>
      <AppTextInput placeholder='Please Enter New Login Password' />
      <View style={{ flexDirection: 'row' }}>
        <Feather name='lock' size={20} color={Colors.fontGray} />
        <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Confirm New password</Text>
      </View>
      <AppTextInput placeholder="Please Enter Confirm Password" />
      <TouchableOpacity style={styles.signIn}>
        <Text style={{ color: 'white', textAlign: "center", fontSize: 18, fontWeight: 'bold' }} >
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingLogin

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
    borderRadius: 10,
    elevation: 5
  },
})