import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { useNavigation } from "@react-navigation/native";
const displayCard = [
  { id: 1, money: '5.00', day: '1 Day', icon: require('../../assets/starCoin.png') },
  { id: 2, money: '18.00', day: '2 Day', icon: require('../../assets/starCoin.png') },
  { id: 3, money: '100.00', day: '3 Day', icon: require('../../assets/starCoin.png') },
  { id: 4, money: '200.00', day: '4 Day', icon: require('../../assets/starCoin.png') },
  { id: 5, money: '400.00', day: '5 Day', icon: require('../../assets/starCoin.png') },
  { id: 6, money: '3000.00', day: '6 Day', icon: require('../../assets/starCoin.png') },
];
const AttendanceBonus = () => {

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 1, backgroundColor: '#d9ad82' }}>
        <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 10 }}>

          <TouchableOpacity onPress={() => navigation.navigate('Activity')} style={{ width: '40%' }}>
            <AntDesign name='left' color={'white'} size={20} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Attendance</Text>
        </View>
        
        <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 5 }}>
          <View style={{ width: '60%' }}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '400', marginHorizontal: 5, marginVertical: 10, }}>Attendance Bonus</Text>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '400', marginHorizontal: 5, width: '100%', marginVertical: 5 }}>Get Rewards based on consequtive login days</Text>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '400', marginHorizontal: 5, width: '100%', marginVertical: 5 }}>Attended consecutive 0 Day</Text>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '400', marginHorizontal: 5 }}>Accumulated 0.00</Text>
          </View>
          <View style={{ width: '40%' }}>
            <Image source={require('../../assets/attendanceBonus.jpg')} style={{ height: 150, width: 140, resizeMode: 'contain' }} />
          </View>
        </View>
        <View style={{ width: SCREEN_WIDTH * 0.95, height: 100, backgroundColor: '#F0F0F0', alignSelf: 'center', borderRadius: 15, elevation: 2, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity style={{ width: 160, height: 40, backgroundColor: 'orange', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Game Rules</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 160, height: 40, backgroundColor: 'orange', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Attendance history</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: SCREEN_WIDTH * 0.97, height: SCREEN_HEIGHT * 0.4, backgroundColor: 'white', marginTop: 80, alignSelf: 'center', borderRadius: 20, elevation: 1, padding: 10 }}>

        <FlatList

          numColumns={3}
          data={displayCard}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (

            <View style={{ height: 120, width: 100, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', elevation: 5, margin: 5 }}>
              <Text style={{ color: 'black', marginBottom: 5 }}>₹{item.money}</Text>
              <Image source={item.icon} style={{ width: 60, height: 60, resizeMode: 'contain', marginBottom: 5 }} />
              <Text style={{ color: 'black' }}>{item.day}</Text>
            </View>
          )}
        />


      </View>
      <View style={{ width: SCREEN_WIDTH * 0.96, height: SCREEN_HEIGHT * 0.2, backgroundColor: 'white', alignSelf: 'center', borderRadius: 10, elevation: 5, padding: 10, marginTop: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Image source={require('../../assets/giftBox.png')} style={{ height: 100, width: 100 }} />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '500', marginBottom: 10 }}>₹ 7,000.00 </Text>
          <Text>7 Days </Text>
        </View>
      </View>
      <TouchableOpacity>
        <View style={{ height: 40, width: 340, backgroundColor: '#d9ad82', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginBottom: 20 }}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 600, fontSize: 20 }}>Attendance</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default AttendanceBonus

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
})