import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Login from "./screens/Login";
import { Register } from "./screens";
import ForgotPasswordComponent from "./screens/ForgotPasswordScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(async () => {
    const value = await AsyncStorage.getItem("alreadyLaunched");
    if (value === null) {
      AsyncStorage.setItem("alreadyLaunched", "true");
      setIsFirstLaunch(true);
    } else {
      setIsFirstLaunch(false);
    }
  }, []);

  return (

    <NavigationContainer >
      <Stack.Navigator>

        {/* <Stack.Screen options={{ headerShown: false }} name="register" component={Register} /> */}
        <Stack.Screen options={{ headerShown: false }} name="ForgotPasswordComponent" component={ForgotPasswordComponent} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}