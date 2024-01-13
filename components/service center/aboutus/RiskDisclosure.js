import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Constants/Screen'
import { Colors } from '../../Constants/Colors'
import Ionicons from "react-native-vector-icons/Ionicons"

import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from 'react-native-responsive-dimensions'


const RiskDisclosure = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1, alignSelf: 'center', width: responsiveWidth(100), backgroundColor: 'white' }} showsVerticalScrollIndicator={false}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, }}><TouchableOpacity
        onPress={() => navigation.navigate('AboutUs')}
        style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: Colors.gray }}>
        <Ionicons name='return-up-back' color={'black'} size={24} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 1, fontSize: 20, color: Colors.purple, marginLeft: 50 }}>Risk Disclosure </Text></View>



      <View style={{ flex: 1, width: responsiveWidth(95), alignSelf: 'center' }}>
        <Text style={{ color: 'black', width: responsiveWidth(95), marginVertical: 10 }}>
          User Agreement
        </Text>
        <Text style={{ color: 'black', width: responsiveWidth(92), marginVertical: 10 }}>
          1. To avoid betting disputes, members must read the company's rules before entering the app. Once the player "I agree" By entering this company to bet, you will be considered to be in agreement with the company's User Agreement.
        </Text>
        <Text style={{ color: 'black', width: responsiveWidth(92), marginVertical: 10 }}>
          2. It is the member's responsibility to ensure the confidentiality of their account and login information. Any online bets placed using your account number and member password will be considered valid. Please change your password from time to time. The company is not responsible for any compensation for bets made with a stolen account and password.
        </Text>
        <Text style={{ color: 'black', width: responsiveWidth(92), marginVertical: 10 }}>
          3. The company reserves the right to change this agreement or the game rules or confidentiality rules from time to time. The modified terms will take effect on the date specified after the change occurs, and the right to make final decisions on all disputes is reserved by the company.
        </Text>
        <Text style={{ color: 'black', width: responsiveWidth(92), marginVertical: 10 }}>
          4. Users must be of legal age according to the laws of the country of residence to use an online casino or application. Online bets that have not been successfully submitted will be considered void
        </Text>
        <Text style={{ color: 'black', width: responsiveWidth(92), marginVertical: 10 }}>
          5. When a player is automatically or forcibly disconnected from the game before the game result is announced, it will not affect the game result
        </Text>
      </View>
    </ScrollView>
  )
}

export default RiskDisclosure

const styles = StyleSheet.create({})