import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from 'react-native-responsive-dimensions';

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
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* header */}

      <View style={{ width: '100%', backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15  }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Notification</Text>
      </View>

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
    alignSelf: 'center', width: responsiveWidth(100)
  },
  header: {
    height: SCREEN_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: Colors.lightGray,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  section: {
    height: SCREEN_HEIGHT * 0.13,
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 5,
    borderRadius: 10
  },
})