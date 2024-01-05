import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import { Colors } from '../components/Constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordComponent = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');

  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(otp);
    return otp;
  };

  // const handleVerifyCode = () => {
  //   const enteredOTP = verificationCode.trim();

  //   if (enteredOTP === generatedOTP) {
  //     alert('Verification Successful', 'Code verified successfully.');
  //   } else {
  //     alert('Verification Failed', 'Invalid verification code. Please try again.');
  //   }
  // };



  const handleResetPassword = () => {
    const enteredOTP = verificationCode.trim();

    if (enteredOTP === generatedOTP) {
      // Passwords match, proceed with the password reset logic
      alert('Password Reset', 'Password reset successfully.');
    } else {
      alert('Verification Failed', 'Invalid verification code. Please try again.');
    }
  };

  const handleSendOTP = () => {
    const otp = generateOTP();
    // For demonstration purposes, you can log the generated OTP to the console
    console.log('Generated OTP:', otp);
    alert('OTP Sent', 'OTP sent successfully.');
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
        <Text style={{ fontSize: 16, color: Colors.fontGray }}>Your Email Address</Text>
        <AppTextInput placeholder='Enter Email' value={email} onChangeText={(text) => setEmail(text)} />

        <Text style={{ fontSize: 16, color: Colors.fontGray }}>Set New password</Text>
        <AppTextInput placeholder='Enter New Password' value={newPassword} secureTextEntry onChangeText={(text) => setNewPassword(text)} />

        <Text style={{ fontSize: 16, color: Colors.fontGray }}>Confirm New Password</Text>
        <AppTextInput placeholder='Confirm New Password' value={confirmNewPassword} secureTextEntry onChangeText={(text) => setConfirmNewPassword(text)} />
        <TouchableOpacity style={[styles.otpBtn, isSendButtonEnabled ? styles.enabledSendButton : styles.disabledSendButton]} onPress={handleSendOTP} disabled={!isSendButtonEnabled}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Send</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: Colors.fontGray }}>Verify Otp Code</Text>
        <AppTextInput placeholder='Enter Verification code' value={verificationCode} onChangeText={(text) => setVerificationCode(text)} />


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
  },
  disabledSendButton: {
    backgroundColor: 'lightgray',
  },
});

export default ForgotPasswordComponent;
