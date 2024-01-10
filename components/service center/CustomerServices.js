import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Colors } from '../Constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const CustomerServices = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.notification}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}><TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Customer Care</Text></View>

        <Image source={require('../../assets/customerService.png')} style={{ height: 200, width: 300, resizeMode: 'contain' }} />
      </View>

      <View style={{ flex: 1, backgroundColor: 'white', width: SCREEN_WIDTH * 0.98, borderRadius: 40, marginTop: -30, marginBottom: 50, height: 300 }}>

        <TouchableOpacity onPress={() => alert('Welcome to live chat')} style={{ height: 50, width: 320, alignSelf: 'center', marginTop: 30, borderRadius: 5, elevation: 3, backgroundColor: 'white' }}>
          <View style={{ height: 50, width: 320, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/livechat.png')} style={{ height: 25, width: 25 }} />
              <Text style={{ marginLeft: 18, fontWeight: 500, color: 'black' }}>Live Chat</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {/* <Text style={{ fontWeight: 300, marginHorizontal: 10 }}>7477235745</Text> */}
              <AntDesign name='right' size={16} color={'black'} /></View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('Welcome to whatsapp')} style={{ height: 50, width: 320, alignSelf: 'center', marginTop: 30, borderRadius: 5, elevation: 3, backgroundColor: 'white' }}>
          <View style={{ height: 50, width: 320, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='whatsapp' size={32} color={'green'} />
              <Text style={{ marginLeft: 18, fontWeight: 500, color: 'black' }}>Chat Here</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {/* <Text style={{ fontWeight: 300, marginHorizontal: 10 }}>7477235745</Text> */}
              <AntDesign name='right' size={16} color={'black'} /></View>
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => alert('Welcome to telegram')} style={{ height: 50, width: 320, alignSelf: 'center', marginTop: 30, borderRadius: 5, elevation: 3, backgroundColor: 'white' }}>
          <View style={{ height: 50, width: 320, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='telegram' size={32} color={'green'} />
              <Text style={{ marginLeft: 18, fontWeight: 500, color: 'black' }}>Telegram</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {/* <Text style={{ fontWeight: 300, marginHorizontal: 10 }}>7477235745</Text> */}
              <AntDesign name='right' size={16} color={'black'} /></View>
          </View>

        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default CustomerServices

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',

  },
  notification: {
    width: SCREEN_WIDTH * 1,
    alignSelf: 'center',
    height: 'auto',
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 10,

  },
  heading: { fontSize: 16, color: 'black', fontWeight: '500', marginBottom: 20 },
})