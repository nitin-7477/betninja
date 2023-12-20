import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OnboardingScreen, Register, Wallet, Account, Gamescreen, Login, Home } from "./screens";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import
import { useEffect, useState } from "react";
import ForgotPasswordComponent from "./screens/ForgotPasswordScreen";
import { DepositeScreen, WithdrawScreen, DepositHistoryScreen, WithdrawHistoryScreen } from "./components/walletscreens";
import { Notifications, Gifts, GameStats, Language } from "./components/notification";
import { Setting, SettingLogin, BindMail } from "./components/service center/Setting";

import TimerComponent from "./components/service center/GoogleAuthentication";
const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    // Use getItem instead of getItems
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (

    <NavigationContainer>
      <Stack.Navigator>

        {/* {isFirstLaunch && (
            <Stack.Screen options={{ headerShown: false }} name="OnboardingScreen" component={OnboardingScreen} />
          )} */}


        {/* 
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Gamescreen" component={Gamescreen} /> */}
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        {/* <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPasswordComponent} /> */}

        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen name="Wallet" options={{ headerShown: false }} component={Wallet} />
        <Stack.Screen name="Account" options={{ headerShown: false }} component={Account} />
        <Stack.Screen name="Setting" options={{ headerShown: false }} component={Setting} />
        <Stack.Screen name="Gifts" options={{ headerShown: false }} component={Gifts} />
        <Stack.Screen name="GameStats" options={{ headerShown: false }} component={GameStats} />
        <Stack.Screen name="Language" options={{ headerShown: false }} component={Language} />
        <Stack.Screen name="SettingLogin" options={{ headerShown: false }} component={SettingLogin} />
        <Stack.Screen name="BindMail" options={{ headerShown: false }} component={BindMail} />

        <Stack.Screen name="TimerComponent" options={{ headerShown: false }} component={TimerComponent} />

        <Stack.Screen name="DepositeScreenr" options={{ headerShown: false }} component={DepositeScreen} />
        <Stack.Screen name="WithdrawScreen" options={{ headerShown: false }} component={WithdrawScreen} />
        <Stack.Screen name="DepositHistoryScreen" options={{ headerShown: false }} component={DepositHistoryScreen} />
        <Stack.Screen name="WithdrawHistoryScreen" options={{ headerShown: false }} component={WithdrawHistoryScreen} />



      </Stack.Navigator>
    </NavigationContainer>

  );
}
