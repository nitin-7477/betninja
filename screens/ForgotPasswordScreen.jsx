import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import { Colors } from '../components/Constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from "react-native-vector-icons/Feather";

const ForgotPasswordComponent = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [otp, setOtp] = useState('');
  const [isResendEnabled, setResendEnabled] = useState(true);
  const [timer, setTimer] = useState(59);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(otp);
    return otp;
  };

  const handleSendOTP = async () => {
    try {

      var body = { email: email }
      const result = await axios.post(`${process.env.SERVERURL}/api/auth/forgot-password`,
        body
      );

      console.log(result.data);

      setResendEnabled(false);
      startTimer();


    } catch (error) {

      console.error('Error sending OTP:', error);


      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        // setErrorMessage(errorMessage);
        // setErrorModalVisible(true);
      } else {
        // setErrorMessage("An unexpected error occurred");
        console.log(error);
        // setErrorModalVisible(true);
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

  const handleResetPassword = () => {
    const enteredOTP = verificationCode.trim();

    if (enteredOTP === generatedOTP) {
      // Passwords match, proceed with the password reset logic
      alert('Password Reset', 'Password reset successfully.');
    } else {
      alert('Verification Failed', 'Invalid verification code. Please try again.');
    }
  };


  const isResetButtonEnabled =
    email !== '' &&
    newPassword !== '' &&
    confirmNewPassword !== '' &&
    verificationCode !== '';

  const isSendButtonEnabled =
    email !== '' &&
    newPassword !== '' &&
    confirmNewPassword !== '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: SCREEN_HEIGHT * 0.115, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.lightGray, padding: 10, borderRadius: 10, elevation: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}><TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Forgot password</Text></View>
        <Text style={{ color: 'black' }}>Enter Your Email and verificationCode to set a new Password</Text>
      </View>
      <View style={{ marginVertical: 15 }}>
        <Image source={require('../assets/forgotPassword.png')} style={{ height: 90, width: 90 }} />
      </View>
      <View style={styles.formContainer}>
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
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            placeholder="Email Address"
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
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
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
            value={confirmNewPassword}
            onChangeText={(text) => setConfirmNewPassword(text)}
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

        <TouchableOpacity style={[styles.signIn, isResetButtonEnabled ? styles.enabledButton : styles.disabledButton]} onPress={handleResetPassword} disabled={!isResetButtonEnabled}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    padding: 16,
  },
  formContainer: {
    width: '100%',
  },
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'purple',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  otpBtn: {
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 70,
    elevation: 5,
    paddingVertical: 3,
    marginBottom: 10
  },
  enabledButton: {
    backgroundColor: 'purple',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
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
});

export default ForgotPasswordComponent;
