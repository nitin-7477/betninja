import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppTextInput from '../AppTextInput'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react'

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const handleSaveChanges = () => {

    alert('Changes saved')
  }

  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ marginBottom: 90, alignItems: 'center', flexDirection: 'row', height: 30, }}>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <EvilIcons name='chevron-left' size={35} color={'black'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 5, marginLeft: 40 }}>Change Login Password</Text>
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Image source={require('../../assets/lock.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Login Password</Text>
        </View>
        <AppTextInput placeholder='Please Enter Login Password' />
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 40 }}>
          <Image source={require('../../assets/lock.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>New   Login Password</Text>
        </View>
        <AppTextInput placeholder='Please Enter New Login Password' />
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 40 }}>
          <Image source={require('../../assets/lock.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Confirm New Password</Text>
        </View>
        <AppTextInput placeholder='Please Enter Confirm New Password' />
      </View>
      <View style={{ marginVertical: 30 }}>
        <Text style={{ textAlign: 'right' }}>Contact Customer Service  </Text>
      </View>

      <TouchableOpacity
        onPress={handleSaveChanges} style={{ height: SCREEN_HEIGHT * 0.06, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: 'red', marginTop: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10, alignSelf: 'center'
  }
})