import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from "react-native";
import React from "react";
import AppTextInput from "../components/AppTextInput";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/Constants/Screen";
import { useState, useEffect } from "react";
import { postData, ServerURL } from "../config/ServerServices";
import Modal from "react-native-modal";
import { Colors } from "../components/Constants/Colors";
import axios from "axios";

const Register = () => {
  const navigation = useNavigation();
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [invitationCode, setInvitationCode] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);


  const toggleModal1 = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };


  const handleSignUp = async () => {
    try {

      if (password !== confirmPassword) {
        toggleModal1(); // Show the modal
        return;
      }

      const registrationData = {
        email: emailAddress,
        phone: phone,
        password: password,
      };

      if (invitationCode.trim() !== '') {
        registrationData.inviteCode = invitationCode.trim();
      }
      console.log('Hi');

      const result = await axios.post('https://9871-2401-4900-1c19-6daf-d33-85ae-dfd7-8e43.ngrok-free.app/api/auth/register', registrationData);

      console.log("xxxxxxxxxxxxxxxxxxxx", result);
      console.log(registrationData);

      if (result) {
        toggleModal2();
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error during registration:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with an error status:', error.response.status);
        console.error('Server response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const isResetButtonEnabled =
    emailAddress !== '' &&
    password !== '' &&
    confirmPassword !== '' &&
    phone !== '';


  return (
    <SafeAreaView>
      <View style={{ padding: 20, }} >
        {/* #29fd53 */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, color: 'purple', fontWeight: 'bold', marginVertical: 3 }}>
            Create Account
          </Text>
          <View style={{ width: SCREEN_WIDTH * 0.8, alignSelf: 'center', borderBottomWidth: 0.3, marginBottom: 3, borderBottomColor: 'gray' }}></View>
          <View style={{
            width: SCREEN_WIDTH * 0.8,
          }}>
            <Text
              style={{
                fontFamily: "",
                fontSize: 18,
                maxWidth: "100%",
                fontWeight: '700',
                textAlign: "center",
                lineHeight: 30,
                color: 'black'
              }}
            >
              Create an account so you can explore all the exisiting games
            </Text>
            {/* <Text style={{ color: 'red' }}>{ServerURL}</Text> */}
          </View>
        </View>
        <View
          style={{
            marginVertical: 30,
          }}
        >
          <AppTextInput placeholder="Email"
            value={emailAddress} onChangeText={(text) => setEmailAddress(text)} />
          <AppTextInput placeholder="Phone" value={phone} onChangeText={(text) => setPhone(text)} />
          <AppTextInput placeholder='Password' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
          <AppTextInput placeholder='Confirm Password' secureTextEntry value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} />
          <AppTextInput placeholder="Invite Code" value={invitationCode} onChangeText={(text) => setInvitationCode(text)} />

          {!isResetButtonEnabled ? <Text style={{ color: 'red' }}> * Please fill all Details</Text> : <></>}
        </View>
        <View>
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.signIn, isResetButtonEnabled ? styles.enabledButton : styles.disabledButton]}
          disabled={!isResetButtonEnabled}
        >
          <Text style={{ color: 'white', textAlign: "center", fontSize: 20, }}>
            Sign Up
          </Text>
        </TouchableOpacity>



        {/* Modal */}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal1}>
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
        {/* Modal2 to navigate to login page */}
        <Modal isVisible={isModalVisible2} onBackdropPress={toggleModal2}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: 'black' }}>
              Registered Succesfully
            </Text>
            <Text style={{ color: 'black', fontSize: 12, fontWeight: '500' }}>Process to login</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleModal2}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>



        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ padding: 10, }} >
          <Text style={{ color: 'black', textAlign: "center", fontSize: 14, }}>
            Already have an account?
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginVertical: 30,
          }}
        >
          <Text
            style={{
              // fontFamily: "poppins-semiBold",
              color: 'blue',
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#D3D3D3',
                borderRadius: 5,
                marginHorizontal: 10,
              }}
            >
              <AntDesign
                name="google"
                color="black"
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#D3D3D3',
                borderRadius: 5,
                marginHorizontal: 10,
              }}
            >
              <AntDesign
                name="apple1"
                color={'black'}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#D3D3D3',
                borderRadius: 5,
                marginHorizontal: 10,
              }}
            >
              <AntDesign
                name="facebook-square"
                color={'black'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Register


const styles = StyleSheet.create({
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'purple',
    borderRadius: 10,
    elevation: 5
  },
  enabledButton: {
    backgroundColor: 'purple',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "50%",
    alignItems: "center",
  },
})