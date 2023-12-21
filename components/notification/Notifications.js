import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from 'react-native-vector-icons/Ionicons';


const notificationData = [
  {
    date: '23/12/2023', time: '12:24:23'
  }, {
    date: '24/12/2023', time: '12:24:23'
  }, {
    date: '25/12/2023', time: '12:24:23'
  }
]


const Notifications = () => {
  return (
    <View style={styles.container}>
      {/* header */}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}><TouchableOpacity
        onPress={() => navigation.navigate('Wallet')}
        style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
        <Ionicons name='return-up-back' color={'white'} size={30} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Notifications</Text></View>

      <FlatList data={notificationData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <TouchableOpacity style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Entypo name='login' size={20} color={Colors.fontGray} />
                <Text style={{ marginHorizontal: 10, fontSize: 18, fontWeight: 'bold', color: Colors.purple, }}>Login Notification</Text>

              </View>
              <AntDesign name='delete' size={20} color={'purple'} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
              <Text style={{ color: Colors.fontGray }}>{item.date}</Text>
              <Text style={{ color: Colors.fontGray }}>{item.time}</Text>
            </View>
            <Text style={{ color: Colors.fontGray }}>Your account is logged in {item.date} {item.time}</Text>

          </TouchableOpacity>
        }} />
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    height: SCREEN_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors.lightGray,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  section: {
    height: SCREEN_HEIGHT * 0.13,
    width: SCREEN_WIDTH * 0.88,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 5,
    borderRadius: 10
  },
})