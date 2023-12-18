import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Image } from "react-native";
import React from "react";
import AppTextInput from "../components/AppTextInput";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Font from "../components/Constants/Font";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/Constants/Screen";

const Login = () => {
  const navigation = useNavigation();
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
              lineHeight: 30
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
          <AppTextInput placeholder="Email" />
          {/* <View style={{ width: SCREEN_WIDTH * 0.88, height: SCREEN_HEIGHT * 0.07, backgroundColor: 'skyblue', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
            <TextInput placeholder="Email" />
          </View> */}
          <AppTextInput placeholder='Password' />
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
          onPress={() => navigation.navigate("Register")}
          style={{
            padding: 10,
          }}
        >
          <Text
            style={{
              // fontFamily: Font('poppins-semiBold'),
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
              // fontFamily: Font('poppins-semiBold'),
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
