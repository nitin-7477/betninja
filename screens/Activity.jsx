import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen'
import { Colors } from '../components/Constants/Colors'
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
const Activity = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>

      <View style={{ height: responsiveHeight(22), width: SCREEN_WIDTH * 1, backgroundColor: 'orange' }}>
        <View style={{ height: responsiveHeight(4), width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(2) }}>
          <Image
            source={require("../image/1.jpg")}
            style={{ height: 50, width: 90 }}
          /></View>
        <View style={{ paddingHorizontal: responsiveWidth(5) }}>
          <Text style={{ color: 'white', fontSize: 22, marginVertical: 5, fontWeight: 'bold' }}>Activity</Text>
          <Text style={{ color: 'white', fontSize: responsiveFontSize(2.3), fontWeight: '500' }}>Please remember to follow the event page</Text>
          <Text style={{ color: 'black', fontSize: 14, fontWeight: '500' }}>We will launch user feedback activites time to time</Text>
        </View>
      </View>
      {/* **********************Activity and Invitation************************* */}
      <View style={{
        height: responsiveHeight(17), width: responsiveWidth(97), alignSelf: 'center', padding: responsiveWidth(4),
        marginVertical: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', elevation: 2,
        backgroundColor: 'white'
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ActivityAward')}
          style={{
            height: responsiveHeight(13), width: responsiveWidth(20),
            borderRadius: 10, justifyContent: 'center', alignItems: 'center',
          }}>
          <View style={{ height: 60, width: 60, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

            <Image source={require('../assets/reward.png')} style={{ height: 40, width: 40, borderRadius: 10 }} />

          </View>
          <Text style={{ marginTop: 5, color: 'black', fontWeight: '600' }}>Activity</Text>
          <Text style={{ color: 'black', fontWeight: '600' }}>Award</Text>
        </TouchableOpacity>



        <TouchableOpacity
          onPress={() => navigation.navigate('BettingRebate')}
          style={{
            height: responsiveHeight(13), width: responsiveWidth(20),
            borderRadius: 10, justifyContent: 'center', alignItems: 'center'
          }}>
          <View style={{ height: 60, width: 60, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

            <Image source={require('../assets/bettingRebate.png')} style={{ height: 40, width: 40, borderRadius: 10 }} />

          </View>
          <Text style={{ marginTop: 5, color: 'black', fontWeight: '600' }}>Betting</Text>
          <Text style={{ color: 'black', fontWeight: '600' }}>Rebate</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('Gifts')}
          style={{
            height: responsiveHeight(13), width: responsiveWidth(20),
            borderRadius: 10, justifyContent: 'center', alignItems: 'center'
          }}>
          <View style={{ height: 60, width: 60, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

            <Image source={require('../assets/reward.png')} style={{ height: 40, width: 40, borderRadius: 10 }} />

          </View>
          <Text style={{ marginTop: 5, color: 'black', fontWeight: '600' }}>Gifts</Text>
          <Text style={{ color: 'black', fontWeight: '600' }}>& More</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('InvitationBonus')}
          style={{
            height: responsiveHeight(13), width: responsiveWidth(20),
            borderRadius: 10, justifyContent: 'center', alignItems: 'center'
          }}>
          <View style={{ height: 60, width: 60, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

            <Image source={require('../assets/reward.png')} style={{ height: 40, width: 40, borderRadius: 10 }} />

          </View>
          <Text style={{ marginTop: 5, color: 'black', fontWeight: '600' }}>Invitation</Text>
          <Text style={{ color: 'black', fontWeight: '600' }}>Bonus</Text>
        </TouchableOpacity>

      </View>
      {/* ************************Gifts and bonus card*************** */}
      <View style={{ flexDirection: 'row', height: responsiveHeight(30), width: responsiveWidth(100), alignSelf: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Gifts')} style={{ width: responsiveWidth(50), justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/giftBanner.png')} style={{ height: responsiveHeight(21), width: responsiveWidth(45), borderRadius: 10 }} />
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '500', width: responsiveWidth(45) }}>Gifts</Text>
          <Text style={{ fontWeight: '500', marginTop: 3, width: responsiveWidth(45), color: 'grey' }}>Enter the redemption code to receive gift rewards</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('AttendanceBonus')} style={{ width: responsiveWidth(50), justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/attendanceBanner.png')} style={{ height: responsiveHeight(21), width: responsiveWidth(45), borderRadius: 10 }} />
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '500', width: responsiveWidth(45) }}>Attendance Bonus</Text>
          <Text style={{ fontWeight: '500', marginTop: 3, width: responsiveWidth(45), color: 'grey' }}>Enter the redemption code to receive gift rewards</Text>
        </TouchableOpacity>
      </View>

      {/* ************************Banners********************************* */}
      {/* <View style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', padding: 10, backgroundColor: Colors.lightGray, borderRadius: 10, marginVertical: 5 }}>
        <Image source={require('../assets/activityBanner1.png')} style={{ height: 150, width: 330, borderRadius: 10, resizeMode: 'contain' }} />
        <Text style={{ color: 'black', fontSize: 18, fontWeight: '900' }}>Bonus Winnig Streak</Text>
      </View> */}
      {/* ************************Banners********************************* */}
      {/* <View style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', padding: 10, backgroundColor: Colors.lightGray, borderRadius: 10, marginVertical: 5 }}>
        <Image source={require('../assets/activityBanner2.png')} style={{ height: 150, width: 330, borderRadius: 10, resizeMode: 'contain' }} />
        <Text style={{ color: 'black', fontSize: 18, fontWeight: '900' }}>Complete Awesome rewards Mission</Text>
      </View> */}
      {/* ************************Banners********************************* */}
      {/* <View style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', padding: 10, backgroundColor: Colors.lightGray, borderRadius: 10, marginVertical: 5 }}>
        <Image source={require('../assets/activityBanner1.png')} style={{ height: 150, width: 330, borderRadius: 10, resizeMode: 'contain' }} />
        <Text style={{ color: 'black', fontSize: 18, fontWeight: '900' }}>"Loss Bonus"- Turn Losses into WIns</Text>
      </View> */}
      {/* ************************Banners********************************* */}
      {/* <View style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', padding: 10, backgroundColor: Colors.lightGray, borderRadius: 10, marginVertical: 5 }}>
        <Image source={require('../assets/activityBanner4.png')} style={{ height: 150, width: 330, borderRadius: 10, resizeMode: 'contain' }} />
        <Text style={{ color: 'black', fontSize: 18, fontWeight: '900' }}>Monthly Bonus Promotion</Text>
      </View> */}

      {/* ************************Banners********************************* */}
      {/* <View style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', padding: 10, backgroundColor: Colors.lightGray, borderRadius: 10, marginVertical: 5, marginBottom: 30 }}>
        <Image source={require('../assets/activityBanner1.png')} style={{ height: 150, width: 330, borderRadius: 10, resizeMode: 'contain' }} />
        <Text style={{ color: 'black', fontSize: 18, fontWeight: '900' }}>Play Game Get Super Bonuses</Text>
      </View> */}




    </ScrollView>
  )
}

export default Activity

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center'
  }
})