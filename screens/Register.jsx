
import React, { useState } from "react";
import { jsx } from '@emotion/react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from "react-native";
import AppTextInput from "../components/AppTextInput";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import axios from "axios";
import { SCREEN_WIDTH, } from "../components/Constants/Screen";

const Register = () => {
  const navigation = useNavigation();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [otp, setOtp] = useState('');

  const [isResendEnabled, setResendEnabled] = useState(true);
  const [timer, setTimer] = useState(59);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendOTP = async () => {
    try {
      var body = { email: emailAddress }
      const result = await axios.post(`${process.env.SERVERURL}/api/auth/sendOtp`,
        body
      );
      console.log(result.data);


      setResendEnabled(false);
      startTimer();


      // console.log("API Response:", response);
    } catch (error) {
      // Handle errors during the API request
      console.error('Error sending OTP:', error);
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setResendEnabled(true);
          return 59;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };



  const toggleModal1 = () => {
    setModalVisible(!isModalVisible);
  };

  const openModal2 = () => {
    setModalVisible2(true);

  };
  const closeModal2 = () => {
    setModalVisible2(false)
    navigation.navigate('Login')
  }

  const handleResetData = () => {
    setEmailAddress('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setInvitationCode('');
  }

  const isSendButtonEnabled = emailAddress !== '' && password !== '' && confirmPassword !== '' && phone !== '';


  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        toggleModal1(); // Show the modal
        return;
      }

      const registrationData = {
        email: emailAddress,
        phone: phone,
        password: password,
        otp: otp
      };

      if (invitationCode.trim() !== '') {
        registrationData.inviteCode = invitationCode.trim();
      }

      console.log(registrationData);
      const result = await axios.post(`${process.env.SERVERURL}/api/auth/register`, registrationData);

      console.log("xxxxxxxxxxxxxxxxxxxx", result);
      console.log(registrationData);

      if (result) {
        openModal2()
        handleResetData();
        setRefresh(!refresh);
      }
      handleResetData();

    } catch (error) {
      console.error("Error during Registration:", error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
        setErrorModalVisible(true);
      } else {
        setErrorMessage("An unexpected error occurred");
        setErrorModalVisible(true);
      }
    }
    finally {
      setLoading(false);
    }
  };

  const isResetButtonEnabled = emailAddress !== '' && password !== '' && confirmPassword !== '' && phone !== '';

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, color: 'purple', fontWeight: 'bold', marginVertical: 3 }}>
            Create Account
          </Text>
          <View style={{ width: SCREEN_WIDTH * 0.8, alignSelf: 'center', borderBottomWidth: 0.3, marginBottom: 3, borderBottomColor: 'gray' }}></View>
          <View style={{ width: SCREEN_WIDTH * 0.8 }}>
            <Text style={{ fontFamily: "", fontSize: 18, maxWidth: "100%", fontWeight: '700', textAlign: "center", lineHeight: 30, color: 'black' }}>
              Create an account so you can explore all the existing games
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: 30 }}>
          <AppTextInput
            placeholder="Email"
            value={emailAddress}
            onChangeText={(text) => setEmailAddress(text.toLowerCase())}
            errorMessage={emailAddress === '' ? 'Email is required' : ''}
          />
          <AppTextInput
            maxLength={10}
            keyboardType="numeric"
            placeholder="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            errorMessage={phone === '' ? 'Phone is required' : ''}
          />
          <AppTextInput
            placeholder='Password'
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            errorMessage={password === '' ? 'Password is required' : ''}
          />
          <AppTextInput
            placeholder='Confirm Password'
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            errorMessage={confirmPassword === '' ? 'Confirm Password is required' : ''}
          />
          <AppTextInput
            placeholder='Enter Otp'
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.otpBtn, isSendButtonEnabled ? styles.enabledSendButton : styles.disabledSendButton]} onPress={handleSendOTP} disabled={!isSendButtonEnabled}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>{isResendEnabled ? 'Send otp' : 'Resend'}</Text>
            </TouchableOpacity>
            {!isResendEnabled && (
              <Text style={{ color: 'black', fontSize: 16, marginLeft: 200 }}>{`(${timer}s)`}</Text>
            )}
          </View>
          <AppTextInput placeholder="Invite Code" value={invitationCode} onChangeText={(text) => setInvitationCode(text.toUpperCase())} />
          {!isResetButtonEnabled ? <Text style={{ color: 'red' }}> * Please fill all Details</Text> : <></>}
        </View>
        <View>
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.signIn, isResetButtonEnabled ? styles.enabledButton : styles.disabledButton]}
          disabled={!isResetButtonEnabled}
        >
          <Text style={{ color: 'white', textAlign: "center", fontSize: 20 }}>
            Sign Up
          </Text>
        </TouchableOpacity>

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
        <Modal isVisible={isModalVisible2} onRequestClose={closeModal2}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: 'black' }}>
              Registered Successfully
            </Text>
            <Text style={{ color: 'black', fontSize: 12, fontWeight: '500' }}>Proceed to login</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal2}
            >
              <Text style={{ color: "white" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ padding: 10 }}>
          <Text style={{ color: 'black', textAlign: "center", fontSize: 14 }}>
            Already have an account?
          </Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 30 }}>
          <Text style={{ color: 'blue', textAlign: "center", fontSize: 14 }}>
            Or continue with
          </Text>
          <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#D3D3D3', borderRadius: 5, marginHorizontal: 10 }}>
              <AntDesign name="google" color="black" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#D3D3D3', borderRadius: 5, marginHorizontal: 10 }}>
              <AntDesign name="apple1" color={'black'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#D3D3D3', borderRadius: 5, marginHorizontal: 10 }}>
              <AntDesign name="facebook-square" color={'black'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal isVisible={loading} backdropOpacity={0.5} animationIn="fadeIn" animationOut="fadeOut">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={100} color="gold" />
        </View>
      </Modal>

      <Modal
        visible={errorModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalContainer2}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, marginBottom: 10, color: 'black', fontWeight: 'bold' }}>Error</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}>{errorMessage}</Text>
            <TouchableOpacity

              onPress={() => setErrorModalVisible(false)}>
              <Text style={{ color: "blue", marginTop: 20 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default Register;

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
  otpBtn: {
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 70,
    elevation: 5,
    paddingVertical: 3,
    marginBottom: 10
  },
  enabledSendButton: {
    backgroundColor: 'orange',
  },
  disabledSendButton: {
    backgroundColor: 'lightgray',
  },
  modalContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.8,
  },
});
