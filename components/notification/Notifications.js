import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

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
      <View style={styles.header}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Notifications</Text>
      </View>
      <FlatList data={notificationData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <TouchableOpacity style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Entypo name='login' size={20} color={Colors.fontGray}/>
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
    marginVertical: 30,
    padding: 20
  },
  header: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors.lightGray, justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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