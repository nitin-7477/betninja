
import React, { useState } from "react";
import { jsx } from '@emotion/react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert, TextInput } from "react-native";
import AppTextInput from "../components/AppTextInput";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import axios from "axios";
import { SCREEN_WIDTH, } from "../components/Constants/Screen";
import Feather from "react-native-vector-icons/Feather";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


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
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showTC, setShowTC] = useState(false)



  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSendOTP = async () => {
    try {

      var body = { email: emailAddress }
      const result = await axios.post(`${process.env.SERVERURL}/api/auth/sendOtp`,
        body
      );

      console.log(result.data);

      setResendEnabled(false);
      startTimer();


    } catch (error) {

      console.error('Error sending OTP:', error);


      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
        setErrorModalVisible(true);
      } else {
        setErrorMessage("An unexpected error occurred");
        setErrorModalVisible(true);
      }

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

  const isSendButtonEnabled = (
    emailAddress !== '' &&
    phone !== '' &&
    password !== '' &&
    confirmPassword !== ''
  );


  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        toggleModal1(); // Show the modal
        return;
      }
      if (phone.length !== 10) {
        Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
        return;
      }

      // Validate password length
      if (password.length < 6 || password.length > 12) {
        Alert.alert('Invalid Password', 'Password must be between 6 and 12 characters.');
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

  const [isChecked, setChecked] = useState(true);

  const handleToggle = () => {
    setChecked(!isChecked);
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, color: 'blue', fontWeight: 'bold', marginVertical: 3 }}>
            Create Account
          </Text>
          {/* <View style={{ width: SCREEN_WIDTH * 0.8, alignSelf: 'center', borderBottomWidth: 0.3, marginBottom: 3, borderBottomColor: 'gray' }}></View> */}
          <View style={{ width: SCREEN_WIDTH * 0.8, marginTop: 10 }}>
            <Text style={{ fontFamily: "", fontSize: 18, maxWidth: "100%", fontWeight: '700', textAlign: "center", lineHeight: 30, color: 'black' }}>
              Create an account so you can explore all the existing games
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 30, marginBottom: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(173,216,230,0.3)",

              borderRadius: 10,
              justifyContent: "space-between",
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
                width: '100%',
              }}
              value={emailAddress}
              onChangeText={(text) => setEmailAddress(text.toLowerCase())}
              placeholder="Email Address"
            />

          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(173,216,230,0.3)",

              borderRadius: 10,
              justifyContent: "space-between", marginVertical: 10
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
                width: '100%',
              }}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Phone"
              keyboardType="numeric"
              maxLength={10}

            />

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
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "rgba(173,216,230,0.3)",

              borderRadius: 10,
              justifyContent: "space-between",
              marginVertical: 10, alignItems: 'center'
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
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder="Confirm Password"
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


          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(173,216,230,0.3)",
              borderRadius: 10,
              width: '100%',
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
                width: '70%',

              }}
              value={otp}
              onChangeText={(text) => setOtp(text)}
              placeholder="Enter Otp"
              keyboardType="numeric"
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[
                  styles.otpBtn,
                  isSendButtonEnabled ? styles.enabledSendButton : styles.disabledSendButton
                ]}
                onPress={handleSendOTP}
                disabled={!isSendButtonEnabled || !isResendEnabled}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
                  {isResendEnabled ? 'Send OTP' : `${timer} s`}
                </Text>
              </TouchableOpacity>

            </View>
          </View>
          {/* {!isResendEnabled && (
            <Text style={{ color: 'black', fontSize: 16, marginLeft: 10 }}>{`(${timer}s)`}</Text>
          )} */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(173,216,230,0.3)",

              borderRadius: 10,
              justifyContent: "space-between", marginVertical: 10
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
                width: '100%',
              }}
              value={invitationCode}
              onChangeText={(text) => setInvitationCode(text.toUpperCase())}
              placeholder="Invitation Code"
            />

          </View>
          {(!isResetButtonEnabled && (
            <Text style={{ color: 'red', }}> * Please fill all Details</Text>
          ))}
        </View>
        <View>
        </View>
        <TouchableOpacity style={{ width: '100%', height: '4%', flexDirection: 'row', alignItems: 'center', marginVertical: 5 }} onPress={handleToggle} activeOpacity={0.8}>
          <View style={[styles.checkbox, isChecked && styles.checked]}>
            {isChecked && <Text style={{ color: 'white' }}>✓</Text>}
          </View>
          <TouchableOpacity onPress={() => setShowTC(true)}>
            <Text style={{ marginLeft: 10, color: 'black' }}>I agree(terms and condition)</Text>
          </TouchableOpacity>
        </TouchableOpacity>
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
      <Modal visible={false} transparent={true} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ backgroundColor: 'white', height: responsiveHeight(70), width: responsiveWidth(90), padding: 10, borderRadius: 10 }}>
          <Text style={{ textAlign: 'center' }}>Terms and Condition</Text>
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
    backgroundColor: 'blue',
  },
  disabledButton: {
    backgroundColor: '#ADD8E6',
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
    width: 90,
    elevation: 5,
    paddingVertical: 3,

  },
  enabledSendButton: {
    backgroundColor: 'orange',
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 90,
    elevation: 5,
    paddingVertical: 3,
  },
  disabledSendButton: {
    backgroundColor: 'lightgray',
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 90,
    elevation: 5,
    paddingVertical: 3,
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
  }, checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center', marginLeft: 10
  },
  checked: {
    backgroundColor: 'green', // Change this color as needed
    borderColor: 'green',
  },
});
