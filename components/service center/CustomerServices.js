import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../Constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const CustomerServices = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}><TouchableOpacity
          onPress={() => navigation.navigate('Account')}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Customer Care</Text></View>

        <Image source={require('../../assets/customerService.png')} style={{ height: 200, width: 300, resizeMode: 'contain' }} />
      </View>

      <View style={{ flex: 1, backgroundColor: 'white', width: SCREEN_WIDTH * 0.98, borderRadius: 40, marginTop: -30 }}>



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
          <View style={{ height: 50, width: 320, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='telegram' size={32} color={'green'} />
              <Text style={{ marginLeft: 18, fontWeight: 500, color: 'black' }}>Message Here</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {/* <Text style={{ fontWeight: 300, marginHorizontal: 10 }}>7477235745</Text> */}
              <AntDesign name='right' size={16} color={'black'} /></View>
          </View>

        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomerServices

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'

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