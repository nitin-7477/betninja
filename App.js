import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/Register";
import Wallet from "./screens/Wallet";
import Account from "./screens/Account";
import Gamescreen from "./screens/Gamescreen";
import Login from "./screens/Login";
import Home from "./screens/Home";
import OnboardingScreen from "./screens/OnboardingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import ForgotPasswordComponent from "./screens/ForgotPasswordScreen";
import DepositHistoryScreen from "./components/walletscreens/DepositHistoryScreen";
import DepositeScreen from "./components/walletscreens/DepositeScreen";
import WithdrawScreen from "./components/walletscreens/WithdrawScreen";
import WithdrawHistoryScreen from "./components/walletscreens/WithdrawHistoryScreen";
import GameStats from "./components/notification/GameStats";
import Language from "./components/notification/Language";
import Notifications from "./components/notification/Notifications";
import Gifts from "./components/notification/Gifts";
import Setting from "./components/service center/Setting";
import SettingLogin from "./components/service center/SettingLogin";
import BindMail from "./components/service center/BindMail";
import TimerComponent from "./components/service center/GoogleAuthentication";
import TimerWithModal30Sec from "./components/timers/TimerOf30Sec";
import TimerWithModal60Sec from "./components/timers/TimerOf60Sec";
import TimerWithModal3Min from "./components/timers/Timerof3Min";
import TimerWithModal5Min from "./components/timers/Timerof5min";
import FeedbackForm from "./components/FeedBack";

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
        {/* <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} /> */}
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        {/* <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="Gamescreen" component={Gamescreen} /> */}
        {/* <Stack.Screen name="Wallet" options={{ headerShown: false }} component={Wallet} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPasswordComponent} /> */}

        {/* <Stack.Screen options={{ headerShown: false }} name="Notification" component={Notifications} /> */}
        {/* <Stack.Screen name="FeedbackForm" options={{ headerShown: false }} component={FeedbackForm} /> */}
        {/* <Stack.Screen name="Account" options={{ headerShown: false }} component={Account} /> */}
        {/* <Stack.Screen name="Setting" options={{ headerShown: false }} component={Setting} /> */}
        {/* <Stack.Screen name="Gifts" options={{ headerShown: false }} component={Gifts} /> */}
        {/* <Stack.Screen name="GameStats" options={{ headerShown: false }} component={GameStats} /> */}
        {/* <Stack.Screen name="Language" options={{ headerShown: false }} component={Language} /> */}
        {/* <Stack.Screen name="SettingLogin" options={{ headerShown: false }} component={SettingLogin} /> */}
        {/* <Stack.Screen name="BindMail" options={{ headerShown: false }} component={BindMail} /> */}

        {/* <Stack.Screen name="TimerComponent" options={{ headerShown: false }} component={TimerComponent} /> */}
        {/* <Stack.Screen name="TimerWithModal30Sec" options={{ headerShown: false }} component={TimerWithModal30Sec} /> */}
        {/* <Stack.Screen name="TimerWithModal60Sec" options={{ headerShown: false }} component={TimerWithModal60Sec} /> */}
        {/* <Stack.Screen name="TimerWithModal3Min" options={{ headerShown: false }} component={TimerWithModal3Min} /> */}
        {/* <Stack.Screen name="TimerWithModal5Min" options={{ headerShown: false }} component={TimerWithModal5Min} /> */}

        {/* <Stack.Screen name="DepositeScreen" options={{ headerShown: false }} component={DepositeScreen} /> */}
        {/* <Stack.Screen name="WithdrawScreen" options={{ headerShown: false }} component={WithdrawScreen} /> */}
        {/* <Stack.Screen name="DepositHistoryScreen" options={{ headerShown: false }} component={DepositHistoryScreen} /> */}
        {/* <Stack.Screen name="WithdrawHistoryScreen" options={{ headerShown: false }} component={WithdrawHistoryScreen} /> */}



      </Stack.Navigator>
    </NavigationContainer>

  );
}
