import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import AppTextInput from "../components/AppTextInput";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/Constants/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInformation, setUserInformation] = useState([])

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // useEffect(() => {

  //   handleReset()

  // }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const onboarded = await AsyncStorage.getItem('onboarded')

        if (token) {
          navigation.navigate('HomeScreen')
          return;
        }

      } catch (error) {
        console.error('Error fetching user data in Login:', error);
      }
    };
    fetchData();
  }, []);

  console.log(process.env.SERVERURL);

  const checkLogin = async () => {
    try {

      setLoading(true);
      if (!emailAddress.trim()) {
        setEmailError("Email is required");
        return;
      } else {
        setEmailError("");
      }

      if (password.length < 6 || password.length > 12) {
        Alert.alert('Invalid Password', 'Password must be between 6 and 12 characters.');
        return;
      }
      if (!password.trim()) {
        setPasswordError("Password is required");
        return;
      } else {
        setPasswordError("");
      }

      const body = { email: emailAddress, password: password };

      const result = await axios.post(`${process.env.SERVERURL}/api/auth/login`, body);

      const response = result.data;
      const token = response.token;
      console.log(response);

      if (token) {
        await AsyncStorage.setItem("token", JSON.stringify(token));
        navigation.navigate('HomeScreen')
      } else {
        console.log("Login failed:");
        Alert.alert("Login Failed");
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
        setErrorModalVisible(true);
      } else {
        setErrorMessage("An unexpected error occurred");
        setErrorModalVisible(true);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView
    //  style={{ width: 500, alignSelf: 'center' }}
    >
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 30,
              color: "blue",
              fontWeight: "bold",
              marginVertical: 30,
            }}
          >
            Login here
          </Text>
          {/* <View
            style={{
              width: SCREEN_WIDTH * 0.8,
              alignSelf: "center",
              borderBottomWidth: 0.3,
              marginBottom: 10,
              borderBottomColor: "gray",
            }}
          ></View> */}
          <Text
            style={{
              fontSize: 20,
              maxWidth: "60%",
              fontWeight: "700",
              textAlign: "center",
              letterSpacing: 0.5,
              lineHeight: 30,
              color: "black",
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View style={{ marginVertical: 30 }}>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#E5E4E2",
              borderRadius: 10,
              justifyContent: "space-between",
            }}
          >

            <TextInput
              placeholderTextColor={"grey"}
              style={{
                fontSize: 14,
                paddingHorizontal: 20,
                paddingVertical: 5,
                backgroundColor: "#E5E4E2",
                borderRadius: 10,
                marginVertical: 5,
                fontWeight: "500",
                color: "grey",
                width: '100%',
              }}
              value={emailAddress}
              onChangeText={(text) => setEmailAddress(text.replace(/\s/g, '').toLowerCase())}
              placeholder="Email Address"
            />

          </View>



          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#E5E4E2",
              borderRadius: 10,
              justifyContent: "space-between",
              marginVertical: 10
            }}
          >

            <TextInput
              placeholderTextColor={"grey"}
              style={{
                fontSize: 14,
                paddingHorizontal: 20,
                paddingVertical: 5,
                backgroundColor: "#E5E4E2",
                borderRadius: 10,
                marginVertical: 5,
                fontWeight: "500",
                color: "grey",
                width: '90%',
              }}
              secureTextEntry={isPasswordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
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
          {passwordError ? (
            <Text style={{ color: "red", marginLeft: 20 }}>{passwordError}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}
        >
          {/* <Image source={require("../assets/lock.png")} style={{ height: 30, width: 30 }} /> */}
          <Text style={{ fontSize: 14, color: "blue", fontFamily: 'Kanit' }}>
            Forgot your password ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={checkLogin} style={Styles.signIn}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            Sign in
          </Text>
        </TouchableOpacity>
        {loading && (
          <View style={Styles.activityIndicatorContainer}>
            <ActivityIndicator size={100} color="gold" />
          </View>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{ padding: 10 }}
        >
          <Text style={{ color: "black", textAlign: "center", fontSize: 14, fontWeight: "600" }}>
            Create new account
          </Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 30 }}>
          <Text style={{ color: "blue", textAlign: "center", fontSize: 14, marginBottom: 10 }}>
            Or continue with
          </Text>

          <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: "#D3D3D3", borderRadius: 5, marginHorizontal: 10 }}>
              <AntDesign name="google" color="black" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: "#D3D3D3", borderRadius: 5, marginHorizontal: 10 }}>
              <AntDesign name="apple1" color={"black"} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: "#D3D3D3", borderRadius: 5, marginHorizontal: 10 }}>
              <AntDesign name="facebook-square" color={"black"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        visible={errorModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <Text style={{ fontSize: 20, marginBottom: 10, color: 'black', fontWeight: 'bold' }}>Error</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}>{errorMessage}</Text>
            <TouchableOpacity

              onPress={() => setErrorModalVisible(false)}>
              <Text style={{ color: "blue", marginTop: 20 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: "blue",
    marginVertical: 30,
    borderRadius: 10,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  activityIndicatorContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
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
  modalContainerPopUp: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
    alignSelf: 'center',
  },
  closeButtonPopUp: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "50%",
    alignItems: "center",
  },
});

export default Login;
