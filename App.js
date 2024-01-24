import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Register from "./screens/Register";
import Wallet from "./screens/Wallet";
import Account from "./screens/Account";
import Gamescreen from "./screens/Gamescreen";
import Login from "./screens/Login";
import Home from "./screens/Home";
import OnboardingScreen from "./screens/OnboardingScreen";
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
import FeedbackForm from "./components/service center/FeedBack";
import NotificationFile from "./components/service center/NotificationFile";
import CustomerServices from "./components/service center/CustomerServices";
import CountdownComponent from "./components/timers/TimerOf30Sec";
import Activity from "./screens/Activity";
import ActivityAward from "./screens/activityAllScreens/ActivityAward";
import InvitationBonus from "./screens/activityAllScreens/InvitationBonus";
import BettingRebate from "./screens/activityAllScreens/BettingRebate";
import LevelScreen from "./screens/levelScreens/LevelScreen";
import AboutUs from "./components/service center/aboutus/AboutUs";
import Confidential from "./components/service center/aboutus/Confidential";
import RiskDisclosure from "./components/service center/aboutus/RiskDisclosure";
import ChangePasswordScreen from "./components/service center/ChangePasswordScreen";
import AddBank from "./screens/AddBank";
import SubOrdinate from "./screens/promotionAllScreens/SubOrdinate";
import CommissionDetails from "./screens/promotionAllScreens/CommissionDetails";
import BankAccount from "./screens/BankAccount";
import QrScanner from "./screens/QrScanner";
import AttendanceBonus from "./screens/activityAllScreens/AttendanceBonus";
import InvitationRules from "./screens/InvitationRules";
import DD from "./screens/levelScreens/Dropdown";
import InvitationLink from "./screens/promotionAllScreens/InvitationLink";
import Whatsapp from "./components/service center/Whatsapp";
import LiveChatScreen from "./screens/livechatscreens/LiveChatScreen";
import LiveChat1 from "./screens/livechatscreens/LiveChat1";
import LiveChat2 from "./screens/livechatscreens/LiveChat2";
import LiveChat3 from "./screens/livechatscreens/LiveChat3";
import LiveChat4 from "./screens/livechatscreens/LiveChat4";
import LiveChat5 from "./screens/livechatscreens/LiveChat5";
import LiveChat6 from "./screens/livechatscreens/LiveChat6";
import LiveChat7 from "./screens/livechatscreens/LiveChat7";
import LiveChat8 from "./screens/livechatscreens/LiveChat8";

// Navigation Configuration
const Stack = createNativeStackNavigator();
const defaultScreenOptions = {
  headerShown: false,
};

// Main App Component
export default function App() {



  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(null)

  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("alreadyLaunched");

  //       if (value === null) {
  //         await AsyncStorage.setItem("alreadyLaunched", "true");
  //         setIsFirstLaunch(true);
  //       } else {
  //         setIsFirstLaunch(false);
  //       }
  //     } catch (error) {
  //       console.error('Error checking first launch:', error);
  //     }
  //   };
  //   checkFirstLaunch();
  // }, []);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, [])

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await AsyncStorage.getItem('onboarded');
    if (onboarded == 1) {
      // hide onboarding
      console.log('Yes');
      setShowOnboarding(false);
    } else {
      console.log("no");
      // show onboardingr
      setShowOnboarding(true);
    }
  }

  if (showOnboarding == null) {
    return null;
  }


  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='OnboardingScreen'>
          <Stack.Screen name="OnboardingScreen" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  else {
    return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">

          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
          <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="LiveChatScreen" component={LiveChatScreen} />
          <Stack.Screen options={{ headerShown: false }} name="InvitationLink" component={InvitationLink} />

          <Stack.Screen name="GameStats" options={{ headerShown: false }} component={GameStats} />
          <Stack.Screen options={{ headerShown: false }} name="Whatsapp" component={Whatsapp} />
          <Stack.Screen options={{ headerShown: false }} name="DD" component={DD} />
          <Stack.Screen options={{ headerShown: false }} name="LevelScreen" component={LevelScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddBank" component={AddBank} />

          <Stack.Screen options={{ headerShown: false }} name="InvitationRules" component={InvitationRules} />


          <Stack.Screen options={{ headerShown: false }} name="Gamescreen" component={Gamescreen} />
          <Stack.Screen options={{ headerShown: false }} name="SubOrdinate" component={SubOrdinate} />
          <Stack.Screen name="DepositHistoryScreen" options={{ headerShown: false }} component={DepositHistoryScreen} />


          <Stack.Screen name="WithdrawHistoryScreen" options={{ headerShown: false }} component={WithdrawHistoryScreen} />
          <Stack.Screen options={{ headerShown: false }} name="CommissionDetails" component={CommissionDetails} />

          <Stack.Screen options={{ headerShown: false }} name="AttendanceBonus" component={AttendanceBonus} />
          <Stack.Screen options={{ headerShown: false }} name="QrScanner" component={QrScanner} />
          <Stack.Screen options={{ headerShown: false }} name="BankAccount" component={BankAccount} />
          <Stack.Screen name="WithdrawScreen" options={{ headerShown: false }} component={WithdrawScreen} />



          <Stack.Screen options={{ headerShown: false }} name="ChangePasswordScreen" component={ChangePasswordScreen} />
          <Stack.Screen options={{ headerShown: false }} name="RiskDisclosure" component={RiskDisclosure} />

          <Stack.Screen options={{ headerShown: false }} name="Confidential" component={Confidential} />
          <Stack.Screen options={{ headerShown: false }} name="AboutUs" component={AboutUs} />

          <Stack.Screen name="Wallet" options={{ headerShown: false }} component={Wallet} />
          <Stack.Screen options={{ headerShown: false }} name="BettingRebate" component={BettingRebate} />
          <Stack.Screen options={{ headerShown: false }} name="InvitationBonus" component={InvitationBonus} />
          <Stack.Screen options={{ headerShown: false }} name="ActivityAward" component={ActivityAward} />
          <Stack.Screen options={{ headerShown: false }} name="Activity" component={Activity} />

          <Stack.Screen name="CountdownComponent" options={{ headerShown: false }} component={CountdownComponent} />
          <Stack.Screen name="Language" options={{ headerShown: false }} component={Language} />
          <Stack.Screen options={{ headerShown: false }} name="CustomerServices" component={CustomerServices} />
          <Stack.Screen options={{ headerShown: false }} name="NotificationFile" component={NotificationFile} />

          <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPasswordComponent} />

          <Stack.Screen options={{ headerShown: false }} name="Notification" component={Notifications} />
          <Stack.Screen name="FeedbackForm" options={{ headerShown: false }} component={FeedbackForm} />
          <Stack.Screen name="Account" options={{ headerShown: false }} component={Account} />
          <Stack.Screen name="Setting" options={{ headerShown: false }} component={Setting} />
          <Stack.Screen name="Gifts" options={{ headerShown: false }} component={Gifts} />
          <Stack.Screen name="SettingLogin" options={{ headerShown: false }} component={SettingLogin} />
          <Stack.Screen name="BindMail" options={{ headerShown: false }} component={BindMail} />


          <Stack.Screen name="DepositeScreen" options={{ headerShown: false }} component={DepositeScreen} />

          <Stack.Screen options={{ headerShown: false }} name="LiveChat1" component={LiveChat1} />
          <Stack.Screen options={{ headerShown: false }} name="LiveChat2" component={LiveChat2} />
          <Stack.Screen options={{ headerShown: false }} name="LiveChat3" component={LiveChat3} />
          <Stack.Screen options={{ headerShown: false }} name="LiveChat4" component={LiveChat4} />
          <Stack.Screen options={{ headerShown: false }} name="LiveChat5" component={LiveChat5} />
          <Stack.Screen options={{ headerShown: false }} name="LiveChat6" component={LiveChat6} />
          <Stack.Screen options={{ headerShown: false }} name="LiveChat7" component={LiveChat7} />
          <Stack.Screen options={{ headerShown: false }} name="LiveChat8" component={LiveChat8} />



        </Stack.Navigator>
      </NavigationContainer>

    )
  }
}
