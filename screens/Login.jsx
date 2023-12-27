import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Image, Alert } from "react-native";
import React from "react";
import { useState } from "react";
import AppTextInput from "../components/AppTextInput";
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import Font from "../components/Constants/Font";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/Constants/Screen";
import { ServerURL, postData } from "../config/ServerServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const checkLogin = async () => {
    try {

      var body = { email: emailAddress, password: password };
      const result = await axios.post('https://832b-2401-4900-1c19-6daf-d090-aea6-e929-1556.ngrok-free.app/api/auth/login', body);

      let response = result.data
      let token = response.token

      if (token) {

        Alert.alert("Login Successfully", "Welcome", [
          {
            text: 'OK', onPress: () => { console.log('Closed') }
          }
        ],
        )
        await AsyncStorage.setItem('userData', JSON.stringify(response));
        console.log(response);
        navigation.navigate('Home', { user: result });


      } else {

        console.log('Login failed:');
        Alert.alert('Login Failed');
      }
    } catch (error) {

      console.error('Error during login:', error);
    }
  };

  // const printToken = async () => {
  //   try {
  //     const userToken = await AsyncStorage.getItem('userData');
  //     console.log('User Token:', userToken);
  //   } catch (error) {
  //     console.error('Error retrieving token:', error);
  //   }
  // };




  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
        }}
      >
        {/* #29fd53 */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 30,
              color: 'purple',
              // fontFamily:Font('poppins-bold'),
              fontWeight: 'bold',
              marginVertical: 30,

            }}
          >
            Login here
          </Text>
          <View style={{ width: SCREEN_WIDTH * 0.8, alignSelf: 'center', borderBottomWidth: 0.3, marginBottom: 20, borderBottomColor: 'gray' }}></View>
          <Text
            style={{
              fontFamily: "",
              fontSize: 20,
              maxWidth: "60%",
              fontWeight: '700',
              textAlign: "center",
              letterSpacing: 0.5,
              lineHeight: 30,
              color: "black"
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: 30,
          }}
        >
          <AppTextInput value={emailAddress} onChangeText={(text) => setEmailAddress(text)} placeholder="Email" />

          <AppTextInput value={password} onChangeText={(text) => setPassword(text)} placeholder='Password' />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}

          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Image source={require('../assets/lock.png')} style={{ height: 30, width: 30 }} />
          <Text
            style={{
              // fontFamily: Font('poppins-bold'),
              fontSize: 14,
              color: 'blue',
            }}
          >
            Forgot your password ?
          </Text>
        </TouchableOpacity >
        <TouchableOpacity
          onPress={checkLogin}
          style={Styles.signIn}
        >
          <Text
            style={{
              // fontFamily: Font("poppins-bold"),
              color: 'white',
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            padding: 10,
          }}
        >
          <Text
            style={{

              color: 'black',
              textAlign: "center",
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginVertical: 30,
          }}
        >
          <Text
            style={{

              color: 'blue',
              textAlign: "center",
              fontSize: 14,
              marginBottom: 10
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
  );
};

const Styles = StyleSheet.create({
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'purple',
    marginVertical: 30,
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  }
})

export default Login;
