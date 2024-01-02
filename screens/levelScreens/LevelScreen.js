import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../components/Constants/Colors';
import { useState } from 'react';

const LevelScreen = () => {
  const [selectedButton, setSelectedButton] = useState(1)


  const handleHistory = () => {
    setSelectedButton(1)
  }
  const handleRules = () => {
    setSelectedButton(2)
  }
  const navigation = useNavigation()
  return (
    <View style={styles.container}>


      <View style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.99, backgroundColor: '#d6aa7f', alignSelf: 'center' }}>
        {/* *****************This is for back navigation */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}><TouchableOpacity
          onPress={() => navigation.navigate('Account')}
          style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: Colors.gray }}>
          <Ionicons name='return-up-back' color={'black'} size={24} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 1, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Level</Text></View>

        {/* *******************This is for Avatar and Level check*************** */}
        <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.97, alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 120 }}><Image source={require('../../assets/player.png')} /></View>
          <View><Text style={{ fontWeight: 'bold', color: 'black' }}>LEVEL 0</Text><Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Nitin Gautam</Text></View>
        </View>
        <View style={{ height: 70, width: SCREEN_WIDTH * 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
          <View style={{ height: 60, width: '45%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 2 }}>
            <Text style={{ color: '#d6aa7f', fontWeight: 'bold' }}>0 EXP</Text>
            <Text style={{ marginVertical: 5 }}>My Experience</Text>

          </View>
          <View style={{ height: 60, width: '45%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 2 }}>
            <Text>  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}> 30</Text> Days</Text>
            <Text style={{ marginVertical: 5 }}>Payout Time</Text>

          </View>
        </View>
      </View>
      <View style={{ marginTop: 40, height: 25, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', borderWidth: 0.5, borderColor: 'grey', padding: 3, borderRadius: 5, justifyContent: 'center' }}><Text style={{ textAlign: 'center', fontSize: 12 }}>Level rewards are settled at 2:00 am on the 1st of every month</Text></View>

      {/* ********************* Here is a flatlist card********************* */}
      <View style={{ height: SCREEN_HEIGHT * 0.5, width: SCREEN_WIDTH * 0.94, backgroundColor: 'white', marginTop: 10, borderRadius: 15, alignSelf: 'center', elevation: 2 }}>
        <View style={{ width: SCREEN_WIDTH * 0.9, flexDirection: 'row', alignItems: 'center', height: 40, marginHorizontal: 10, marginTop: 8 }}>
          <Image source={require('../../assets/diamond.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
          <Text style={{ color: 'grey', fontWeight: '700', fontSize: 18 }}>Level 0 Benefit Level</Text>
        </View>
        <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', marginVertical: 10 }}></View>

        <View style={{ height: SCREEN_HEIGHT * 0.1, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: '20%', marginLeft: 4 }}>
            <Image source={require('../../assets/levelUp.png')} style={{ height: 60, width: 60 }} />
          </View>
          <View style={{ width: '55%', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Level up Rewards</Text>
            <Text style={{ fontSize: 12, marginTop: 6, width: '90%' }}>Each account can receive only 1 time</Text>
          </View>
          <View style={{ width: '20%' }}>
            <View style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 2, justifyContent: 'center', borderRadius: 10, marginBottom: 5 }}>
              <Image source={require('../../assets/vipWallet.png')} style={{ height: 15, width: 15, marginRight: 5 }} />
              <Text>600</Text>
            </View>
            <View style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 2, justifyContent: 'center', borderRadius: 10 }}>
              <Image source={require('../../assets/diamond.png')} style={{ height: 15, width: 15, marginRight: 5 }} />
              <Text>00</Text>
            </View>
          </View>

        </View>

        <View style={{ height: SCREEN_HEIGHT * 0.1, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: '20%', marginLeft: 4 }}>
            <Image source={require('../../assets/monthlyReward.png')} style={{ height: 60, width: 60 }} />
          </View>
          <View style={{ width: '55%', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Monthly Rewards</Text>
            <Text style={{ fontSize: 12, marginTop: 6, width: '90%' }}>Each account can receive only 1 time per month</Text>
          </View>
          <View style={{ width: '20%' }}>
            <View style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 2, justifyContent: 'center', borderRadius: 10, marginBottom: 5 }}>
              <Image source={require('../../assets/vipWallet.png')} style={{ height: 15, width: 15, marginRight: 5 }} />
              <Text>600</Text>
            </View>
            <View style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 2, justifyContent: 'center', borderRadius: 10 }}>
              <Image source={require('../../assets/diamond.png')} style={{ height: 15, width: 15, marginRight: 5 }} />
              <Text>00</Text>
            </View>
          </View>

        </View>

        <View style={{ height: SCREEN_HEIGHT * 0.1, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: '20%', marginLeft: 4 }}>
            <Image source={require('../../assets/safe.png')} style={{ height: 60, width: 60 }} />
          </View>
          <View style={{ width: '55%', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Safe</Text>
            <Text style={{ fontSize: 12, marginTop: 6, width: '90%' }}>Increase the extra income of the safe</Text>
          </View>
          <View style={{ width: '20%' }}>
            <View style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 8, justifyContent: 'center', borderRadius: 10, marginBottom: 5 }}>
              <Image source={require('../../assets/safe2.png')} style={{ height: 15, width: 15, marginRight: 5 }} />
              <Text>0.2 %</Text>
            </View>

          </View>

        </View>


        <View style={{ height: SCREEN_HEIGHT * 0.1, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: '20%', marginLeft: 4 }}>
            <Image source={require('../../assets/rebateRate.png')} style={{ height: 60, width: 60 }} />
          </View>
          <View style={{ width: '55%', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Safe</Text>
            <Text style={{ fontSize: 12, marginTop: 6, width: '90%' }}>Increase the extra income of the safe</Text>
          </View>
          <View style={{ width: '20%' }}>
            <View style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 4, justifyContent: 'center', borderRadius: 10, marginBottom: 5 }}>
              <Image source={require('../../assets/rebateRate2.png')} style={{ height: 25, width: 25, marginRight: 5 }} />
              <Text>0.2 %</Text>
            </View>

          </View>

        </View>


      </View>

      <View style={{ height: 50, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', marginVertical: 10, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={handleHistory}
          style={{
            width: '50%', height: '100%', backgroundColor: selectedButton == 1 ? '#d6aa7f' : 'white',
            borderTopStartRadius: 10, borderBottomStartRadius: 10, justifyContent: 'center', alignItems: 'center'
          }}>
          <Text style={{ color: selectedButton == 1 ? 'white' : 'black', fontWeight: '700', fontSize: 18 }}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRules}
          style={{
            width: '50%', height: '100%', backgroundColor: selectedButton == 2 ? '#d6aa7f' : 'white',
            borderTopEndRadius: 10, borderBottomEndRadius: 10, justifyContent: 'center', alignItems: 'center'
          }}>
          <Text style={{ color: selectedButton == 2 ? 'white' : 'black', fontWeight: '700', fontSize: 18 }}>Rules</Text>
        </TouchableOpacity>

      </View >





    </View >
  )
}

export default LevelScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5
  }
})