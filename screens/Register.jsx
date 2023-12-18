import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import AppTextInput from "../components/AppTextInput";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/Constants/Screen";

const Register = () => {
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
            Create Account
          </Text>
          <View style={{ width: SCREEN_WIDTH * 0.8, alignSelf: 'center', borderBottomWidth: 0.3, marginBottom: 20, borderBottomColor: 'gray' }}></View>
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
          <AppTextInput placeholder="Email" />
          <AppTextInput placeholder='Password' />
          <AppTextInput placeholder="Confirm Password" />
        </View>
        <View>
        </View>
        <TouchableOpacity
          style={Styles.signIn}
        >
          <Text style={{ color: 'white', textAlign: "center", fontSize: 20, }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ padding: 10, }} >
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