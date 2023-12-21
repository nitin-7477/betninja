import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import AppTextInput from "../components/AppTextInput";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/Constants/Screen";
import { useState } from "react";
import { postData } from "../config/ServerServices";

const Register = () => {
  const navigation = useNavigation();
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [invitationCode, setInvitationCode] = useState('')
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check if the user is already registered
    // Replace this logic with actual backend check
    if (emailAddress === 'inayatnitin@gmail.com') {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  }, [emailAddress]);

  const handleSignUp = async () => {

    if (isRegistered) {
      console.log('User is already registered');
      navigation.navigate('Login');
      return;
    }
    var body = { email: emailAddress, phone: phone, password: password, inviteCode: invitationCode }
    var result = await postData('api/auth/register', body)
    console.log(result);

  }
  const isResetButtonEnabled =
    emailAddress !== '' &&
    password !== '' &&
    phone !== '' &&
    invitationCode !== '';


  return (
    <SafeAreaView>
      <View style={{ padding: 20, }} >
        {/* #29fd53 */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, color: 'purple', fontWeight: 'bold', marginVertical: 10 }}>
            Create Account
          </Text>
          <View style={{ width: SCREEN_WIDTH * 0.8, alignSelf: 'center', borderBottomWidth: 0.3, marginBottom: 10, borderBottomColor: 'gray' }}></View>
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
          </View>
        </View>
        <View
          style={{
            marginVertical: 30,
          }}
        >
          <AppTextInput placeholder="Email"
            value={emailAddress} onChangeText={(text) => setEmailAddress(text)} />
          <AppTextInput placeholder="Phone" secureTextEntry value={phone} onChangeText={(text) => setPhone(text)} />
          <AppTextInput placeholder='Password' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
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
    marginVertical: 30,
    borderRadius: 10,
    elevation: 5
  },
  enabledButton: {
    backgroundColor: 'purple',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
})