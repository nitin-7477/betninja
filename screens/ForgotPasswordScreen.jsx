import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import { Colors } from '../components/Constants/Colors';
import AppTextInput from '../components/AppTextInput';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerifyCode = () => {

    alert('Verification Successful', 'Code verified successfully.');
  };

  const handleResetPassword = () => {


    alert('Password Reset', 'Password reset successfully.');
  };

  const isResetButtonEnabled =
    email !== '' &&
    newPassword !== '' &&
    confirmNewPassword !== '' &&
    verificationCode !== '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: SCREEN_HEIGHT * 0.12, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.lightGray, padding: 10, borderRadius: 10 }}>
        <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple }}>Forgot password</Text>
        <Text>Enter Your Email and verificationCode to set a new Password</Text>
      </View>
      <View style={{ marginVertical: 30 }}>
        <Image source={require('../assets/forgotPassword.png')} style={{ height: 100, width: 100 }} />

      </View>
      <View style={styles.formContainer}>
        <Text style={{ fontSize: 16, color: Colors.fontGray }}>Your Email Address</Text>
        <AppTextInput placeholder='Enter Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={{ fontSize: 16, color: Colors.fontGray }}>Set New password</Text>
        <AppTextInput placeholder='Enter New Password'
          value={newPassword} secureTextEntry
          onChangeText={(text) => setNewPassword(text)}
        />

        <Text style={{ fontSize: 16, color: Colors.fontGray }}>Confirm New Password</Text>
        <AppTextInput placeholder='Confirm New Password'
          value={confirmNewPassword} secureTextEntry
          onChangeText={(text) => setConfirmNewPassword(text)}
        />

        <Text style={{ fontSize: 16, color: Colors.fontGray }}>Verify Otp Code</Text>
        <AppTextInput placeholder='Enter Verification code'
          value={verificationCode}
          onChangeText={(text) => setVerificationCode(text)}
        />
        {/* <Button title="Verify Code" /> */}
        <TouchableOpacity
          style={styles.otpBtn}
          onPress={handleVerifyCode}
          disabled={!isResetButtonEnabled}
        >
          <Text
            style={{
              // fontFamily: Font("poppins-bold"),
              color: 'white',
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.signIn, isResetButtonEnabled ? styles.enabledButton : styles.disabledButton]}
          onPress={handleResetPassword}
          disabled={!isResetButtonEnabled}
        >
          <Text style={{
            // fontFamily: Font("poppins-bold"),
            color: 'white',
            textAlign: "center",
            fontSize: 20,
          }}
          >
            Reset Password
          </Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'purple',
    marginVertical: 30,
    borderRadius: 10,
    elevation: 5
  },
  otpBtn: {
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 70,
    elevation: 5,
    paddingVertical: 3
  },
  enabledButton: {
    backgroundColor: 'purple',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
});

export default ForgotPasswordComponent;
