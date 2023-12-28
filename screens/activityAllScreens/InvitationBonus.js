import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { Colors } from '../../components/Constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const InvitationBonus = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>

      <View style={{ height: SCREEN_HEIGHT * 0.32, width: SCREEN_WIDTH * 1, backgroundColor: "chocolate" }}>
        {/* **********navigation********** */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, paddingHorizontal: 10 }}><TouchableOpacity
          onPress={() => navigation.navigate('Activity')}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.white, marginLeft: 70 }}>Invitation Bonus</Text></View>
        <View style={{ flexDirection: 'row', marginTop: 20, padding: 10 }}>
          <Image source={require('../../assets/activityAward.png')} style={{ height: 100, width: 100 }} />
          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 15 }}>Invite Friend and Deposite</Text>
            <Text style={{ width: '100%', color: 'white' }}>Both Parties can receive rewards</Text>
            <Text style={{ width: '80%', color: 'white' }}>Invite Friends to register and recharge to receive rewards</Text>
            <Text style={{ width: '80%', color: 'white', marginTop: 10 }}>activity date</Text>
            <Text style={{ width: '80%', color: 'white', fontSize: 20 }}>2023-12-01 - 2023-12-31</Text>
          </View>
        </View>



      </View>
      {/* *********************main Card********************** */}
      <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: 'white', elevation: 2, marginTop: -20, borderRadius: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
        <View style={{
          height: 100, width: '50%',
          borderRadius: 10, justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{ height: 40, width: 40, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

            <Image source={require('../../assets/reward.png')} style={{ height: 30, width: 30, borderRadius: 10 }} />

          </View>
          <Text style={{ marginTop: 5, color: 'black', fontWeight: '600' }}>Invitaion reward rules</Text>
        </View>
        <View style={{
          height: 100, width: '50%',
          borderRadius: 10, justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{ height: 40, width: 40, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

            <Image source={require('../../assets/reward.png')} style={{ height: 30, width: 30, borderRadius: 10 }} />

          </View>
          <Text style={{ marginTop: 5, color: 'black', fontWeight: '600' }}>Invitaion record</Text>
        </View>

      </View>

      <View style={{
        height: SCREEN_HEIGHT * 0.4,
        width: SCREEN_WIDTH * 0.95, marginVertical: 10, backgroundColor: Colors.lightGray, alignSelf: 'center', borderRadius: 10, elevation: 2
      }}>
        <View style={{
          height: SCREEN_HEIGHT * 0.07,
          width: SCREEN_WIDTH * 0.95, backgroundColor: Colors.lightblue, alignSelf: 'center', borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 5
        }}>
          <View style={{ height: 50, width: 150, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 10, borderBottomEndRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Bonus 1</Text></View>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Rs 99.00</Text>
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.fontGray, height: '40', padding: 5, borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ color: 'white' }}>Number of Invitees</Text>
          <Text style={{ color: 'white' }}>1</Text>
        </View>
        <View style={{ marginTop: 10, paddingHorizontal: 10, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.fontGray, height: '40', padding: 5, borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ color: 'white' }}>Rechage per People</Text>
          <Text style={{ color: 'white' }}>Rs 555.00</Text>
        </View>
        <View style={{ borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 20 }}></View>
        <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>0/1</Text>
            <Text>Number of Invitees</Text>
          </View>
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>0/1</Text>
            <Text>Deposite Number</Text>
          </View>
        </View>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Unfinished</Text>
        </TouchableOpacity>

      </View>

      <View style={{
        height: SCREEN_HEIGHT * 0.4,
        width: SCREEN_WIDTH * 0.95, marginVertical: 10, backgroundColor: Colors.lightGray, alignSelf: 'center', borderRadius: 10, elevation: 2
      }}>
        <View style={{
          height: SCREEN_HEIGHT * 0.07,
          width: SCREEN_WIDTH * 0.95, backgroundColor: Colors.lightblue, alignSelf: 'center', borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 5
        }}>
          <View style={{ height: 50, width: 150, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 10, borderBottomEndRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Bonus 1</Text></View>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Rs 99.00</Text>
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.fontGray, height: '40', padding: 5, borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ color: 'white' }}>Number of Invitees</Text>
          <Text style={{ color: 'white' }}>1</Text>
        </View>
        <View style={{ marginTop: 10, paddingHorizontal: 10, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.fontGray, height: '40', padding: 5, borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ color: 'white' }}>Rechage per People</Text>
          <Text style={{ color: 'white' }}>Rs 555.00</Text>
        </View>
        <View style={{ borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 20 }}></View>
        <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: 'red' }}>0/1</Text>
            <Text>Number of Invitees</Text>
          </View>
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: 'red' }}>0/1</Text>
            <Text>Deposite Number</Text>
          </View>
        </View>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Unfinished</Text>
        </TouchableOpacity>

      </View>
      <View style={{
        height: SCREEN_HEIGHT * 0.4,
        width: SCREEN_WIDTH * 0.95, marginVertical: 10, backgroundColor: Colors.lightGray, alignSelf: 'center', borderRadius: 10, elevation: 2
      }}>
        <View style={{
          height: SCREEN_HEIGHT * 0.07,
          width: SCREEN_WIDTH * 0.95, backgroundColor: Colors.lightblue, alignSelf: 'center', borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 5
        }}>
          <View style={{ height: 50, width: 150, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 10, borderBottomEndRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Bonus 1</Text></View>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Rs 99.00</Text>
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.fontGray, height: '40', padding: 5, borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ color: 'white' }}>Number of Invitees</Text>
          <Text style={{ color: 'white' }}>1</Text>
        </View>
        <View style={{ marginTop: 10, paddingHorizontal: 10, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: Colors.fontGray, height: '40', padding: 5, borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ color: 'white' }}>Rechage per People</Text>
          <Text style={{ color: 'white' }}>Rs 555.00</Text>
        </View>
        <View style={{ borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 20 }}></View>
        <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>0/1</Text>
            <Text>Number of Invitees</Text>
          </View>
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>0/1</Text>
            <Text>Deposite Number</Text>
          </View>
        </View>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Unfinished</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  )
}

export default InvitationBonus

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 1,

  }
})