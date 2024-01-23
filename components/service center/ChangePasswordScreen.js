import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, ActivityIndicator, Alert, TextInput } from 'react-native'
import React from 'react'
import AppTextInput from '../AppTextInput'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo"

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible2, setIsConfirmPasswordVisible2] = useState(true);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCopyModal, setShowCopyModal] = useState(false)


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  const toggleConfirmPasswordVisibility2 = () => {
    setIsConfirmPasswordVisible2(!isConfirmPasswordVisible2);
  };

  const toggleModal1 = () => {
    setModalVisible(!isModalVisible);
  };


  const handleSaveChanges = async () => {

    try {
      setLoading(true)
      if (newPassword !== confirmPassword) {
        toggleModal1(); // Show the modal
        return;
      }
      if (newPassword.length < 6 || newPassword.length > 12) {
        Alert.alert('Invalid Password', 'Password must be between 6 and 12 characters.');
        return;
      }
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
      if (result.data) {
        setMessage(result.data.message)
        setShowCopyModal(true)
        await AsyncStorage.removeItem('token');
        setTimeout(() => {
          setShowCopyModal(false);

          navigation.navigate('Login')
        }, 2000);
      }


    }
    catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ marginBottom: 20, alignItems: 'center', flexDirection: 'row', height: 50, elevation: 5, backgroundColor: 'white', width: '100%' }}>
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(173,216,230,0.3)",

              borderRadius: 10,
              justifyContent: "space-between",
              marginVertical: 10
            }}
          >

            <TextInput
              placeholderTextColor={"black"}
              style={{
                fontSize: 14,
                paddingHorizontal: 20,
                paddingVertical: 5,

                borderRadius: 10,
                marginVertical: 5,
                fontWeight: "500",
                color: "black",
                width: '90%',
              }}

              secureTextEntry={isPasswordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              maxLength={12}

            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather
                name={isPasswordVisible ? "eye" : "eye-off"}
                color="black"
                size={20}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 40 }}>
            <Image source={require('../../assets/lock.png')} style={{ height: 25, width: 25 }} />
            <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>New   Login Password</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(173,216,230,0.3)",

              borderRadius: 10,
              justifyContent: "space-between",
              marginVertical: 10
            }}
          >

            <TextInput
              placeholderTextColor={"black"}
              style={{
                fontSize: 14,
                paddingHorizontal: 20,
                paddingVertical: 5,

                borderRadius: 10,
                marginVertical: 5,
                fontWeight: "500",
                color: "black",
                width: '90%',
              }}

              secureTextEntry={isConfirmPasswordVisible}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              placeholder="New Password"
              maxLength={12}

            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Feather
                name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                color="black"
                size={20}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 40 }}>
            <Image source={require('../../assets/lock.png')} style={{ height: 25, width: 25 }} />
            <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Confirm New Password</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(173,216,230,0.3)",

              borderRadius: 10,
              justifyContent: "space-between",
              marginVertical: 10
            }}
          >

            <TextInput
              placeholderTextColor={"black"}
              style={{
                fontSize: 14,
                paddingHorizontal: 20,
                paddingVertical: 5,

                borderRadius: 10,
                marginVertical: 5,
                fontWeight: "500",
                color: "black",
                width: '90%',
              }}

              secureTextEntry={isConfirmPasswordVisible2}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder="Confirm Password"
              maxLength={12}

            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility2}>
              <Feather
                name={isConfirmPasswordVisible2 ? "eye" : "eye-off"}
                color="black"
                size={20}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CustomerServices')}
          style={{ marginVertical: 30 }}>
          <Text style={{ textAlign: 'right' }}>Contact Customer Service  </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleSaveChanges} style={{ height: SCREEN_HEIGHT * 0.06, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: 'red', marginTop: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save Changes</Text>
      </TouchableOpacity>
      <Modal visible={showCopyModal} transparent={true}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            width: '70%', // Set your desired width
            height: 150, // Set your desired height
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
            <Entypo name="check" size={30} color={'white'} />
            <Text style={{ color: 'white' }}>{message}</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={loading} backdropOpacity={0.5} animationIn="fadeIn" animationOut="fadeOut">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={100} color="gold" />
        </View>
      </Modal>
      <Modal visible={isModalVisible} onBackdropPress={toggleModal1}>
        <View style={styles.modalContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: 'black' }}>
            Passwords Do Not Match
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleModal1}
          >
            <Text style={{ color: "white" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={showCopyModal} transparent={true}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            width: '70%', // Set your desired width
            height: 150, // Set your desired height
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
            <Entypo name="check" size={30} color={'white'} />
            <Text style={{ color: 'white' }}>{message}</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: responsiveWidth(100)
  }, modalContainer: {
    backgroundColor: "white",
    padding: 50,
    borderRadius: 10,
    alignItems: "center",
  }, closeButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "50%",
    alignItems: "center",
  },
})