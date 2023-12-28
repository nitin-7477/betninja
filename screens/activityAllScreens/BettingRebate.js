import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Colors } from '../../components/Constants/Colors'
import { useNavigation } from "@react-navigation/native";
const BettingRebate = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}><TouchableOpacity
        onPress={() => navigation.navigate('Activity')}
        style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
        <Ionicons name='return-up-back' color={'white'} size={30} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: 'black', marginLeft: 70 }}>Betting Rebate</Text></View>
      <View style={{ height: SCREEN_HEIGHT * 0.38, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#DCDCDC', marginTop: 10, borderRadius: 10, padding: 10 }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>All-Total Betting Rebate</Text>
        <View style={{ flexDirection: 'row', marginTop: 10, width: 130, height: 25, borderColor: 'purple', borderWidth: 0.2, justifyContent: 'space-around', alignItems: 'center' }}>
          <Ionicons name="shield-checkmark" size={20} color={'purple'} />
          <Text>Real-Time Count</Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>0.00</Text>
        <View style={{ height: 25, width: '95%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <Text>Upgrade VIP lavel to increase the rebate rebate</Text></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ height: 45, width: '45%', backgroundColor: 'white', justifyContent: 'center', borderRadius: 2, marginVertical: 10, paddingHorizontal: 10 }}>
            <Text>Today Rebate</Text>
            <Text style={{ color: 'red' }}>0</Text>
          </View>
          <View style={{ height: 45, width: '45%', backgroundColor: 'white', justifyContent: 'center', borderRadius: 2, marginVertical: 10, paddingHorizontal: 10 }}>
            <Text>Today Rebate</Text>
            <Text style={{ color: 'red' }}>0</Text>
          </View>
        </View>
        <Text>Automatic code washing at 1:00:00 every morning</Text>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>One Click Rebate</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Rebate History</Text>

      <View style={{ height: SCREEN_HEIGHT * 0.24, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#e1edf0', marginBottom: 10, borderRadius: 10, padding: 10, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
          <TouchableOpacity style={{
            backgroundColor: '#50C878',
            alignItems: 'center',
            width: SCREEN_WIDTH * 0.25,
            paddingVertical: 5,
            borderRadius: 7

          }}>
            <View>
              <Text style={{ fontWeight: 'bold', color: 'white', }}>Lottery</Text>
            </View>
          </TouchableOpacity>
          <Text>2023-12-06 1:00:10  </Text>
          <Text style={{ marginLeft: 10, fontSize: 16, color: 'green' }} >Completed</Text>
        </View>

        {/* *********************************Deposit History Card ****************************** */}

        <View style={{ height: SCREEN_HEIGHT * 0.28, width: SCREEN_WIDTH * 0.85, borderTopWidth: 0.4, borderColor: 'grey', borderRadius: 10, padding: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>Betting Rebate</Text><Text style={{ color: 'black', fontSize: 18 }}>₹ 429</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>Rebate Rate</Text><Text style={{ color: "black" }}>0.1%</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ fontSize: 16, color: 'black' }}>Rebate Amount</Text><Text style={{ color: "black" }}>0.43</Text>
          </View>


        </View>
      </View>

    </ScrollView>
  )
}

export default BettingRebate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10
  }
})