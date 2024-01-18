import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppTextInput from '../AppTextInput'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const handleSaveChanges = async () => {

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }
      let body = { currentPassword: password, newPassword: newPassword }
      console.log(body);
      var result = await axios.post(`${process.env.SERVERURL}/api/auth/changePassword`, body, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })

      console.log(result.data);


    }
    catch (e) {
      console.log(e);
    }
  }

  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ marginBottom: 90, alignItems: 'center', flexDirection: 'row', height: 50, elevation: 5, backgroundColor: 'white', width: '100%' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <EvilIcons name='chevron-left' size={35} color={'black'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 5, marginLeft: 40 }}>Change Login Password</Text>
      </View>
      <View style={{ width: '95%', alignSelf: 'center' }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={require('../../assets/lock.png')} style={{ height: 25, width: 25 }} />
            <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Login Password</Text>
          </View>
          <AppTextInput value={password} onChangeText={(text) => setPassword(text)} placeholder='Please Enter Login Password' />
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 40 }}>
            <Image source={require('../../assets/lock.png')} style={{ height: 25, width: 25 }} />
            <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>New   Login Password</Text>
          </View>
          <AppTextInput value={newPassword} onChangeText={(text) => setNewPassword(text)} placeholder='Please Enter New Login Password' />
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 40 }}>
            <Image source={require('../../assets/lock.png')} style={{ height: 25, width: 25 }} />
            <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Confirm New Password</Text>
          </View>
          <AppTextInput value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} placeholder='Please Enter Confirm New Password' />
        </View>
        <View style={{ marginVertical: 30 }}>
          <Text style={{ textAlign: 'right' }}>Contact Customer Service  </Text>
        </View>
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
    alignSelf: 'center',
    width: responsiveWidth(100)
  }
})