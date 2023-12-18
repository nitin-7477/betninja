import { View, Text, Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const navigation = useNavigation();

 const DotComponent = ({selected}) =>{
  return(
    <View className={`w-4 h-4 flex items-center justify-center rounded-full ${selected ? "border border-red-400" : ""} p-2`}>
      <View className={`w-2 h-2 flex items-center ${selected ? "bg-red-400" : "br-red-200"} rounded-full`}>

      </View>
    </View>
  )
 }

  return (
    <Onboarding
      onSkip={() => navigation.navigate("Home")}
      onDone={() => navigation.navigate("Home")}
      // DoneButtonComponent={DotComponent}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              className="w-full h-72 object-contain"
              source={require("../image/1.jpg")}
            />
          ),
          title: "Welcome to BetNinja",
          subtitle:
            "Your gateway to round-the-clock withdrawals, 24/7 support, and exciting, safe gameplay. Must be 18+ to play.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              className="w-full h-72 object-contain"
              source={require("../image/onboardWin.jpg")}
            />
          ),
          title: "Play Safe, Win Big",
          subtitle:
            "Our game rewards responsible play. Stay safe, have fun, and unlock your chance for big winnings.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              className="w-full h-72 object-contain"
              source={require("../image/onboardSafty.jpg")}
            />
          ),
          title: "Safety First",
          subtitle:
            "Your security matters. We're committed to keeping your gameplay secure and enjoyable. Welcome to Big Win Lottery!",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
