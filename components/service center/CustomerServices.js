import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Alert, ScrollView, Linking } from 'react-native';
import { Colors } from '../Constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveWidth } from 'react-native-responsive-dimensions';
const CustomerServices = () => {
  const navigation = useNavigation();
  const initiateWhatsApp = () => {
    let url =
      'whatsapp://send?text=' +
      "Hi" +
      '&phone=91' + 8602695518;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };
  const openTelegramChat = () => {
    const telegramUsername = 'betninjasupport01';
    const telegramLink = `https://t.me/${telegramUsername}`;
    Linking.openURL(telegramLink).catch((err) => console.error('Error opening Telegram chat', err));
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.notification}>
        <View style={{ width: '100%', backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Customer Care</Text>
        </View>
        <Image source={require('../../assets/customerService.png')} style={{ height: 200, width: 300, resizeMode: 'contain' }} />
      </View>
      <View style={{ flex: 1, backgroundColor: 'white', width: SCREEN_WIDTH * 0.96, borderRadius: 40, marginTop: -30, marginBottom: 50, height: 300, alignSelf: 'center', elevation: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate('LiveChatScreen')} style={{ height: 50, width: '95%', alignSelf: 'center', marginTop: 30, borderRadius: 5, elevation: 3, backgroundColor: 'white' }}>
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
        <TouchableOpacity
          onPress={initiateWhatsApp}
          style={{ height: 50, width: '95%', alignSelf: 'center', marginTop: 30, borderRadius: 5, elevation: 3, backgroundColor: 'white' }}>
          <View style={{ height: 50, width: 320, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='whatsapp' size={32} color={'green'} />
              <Text style={{ marginLeft: 18, fontWeight: 500, color: 'black' }}>WhatsApp Chat</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {/* <Text style={{ fontWeight: 300, marginHorizontal: 10 }}>7477235745</Text> */}
              <AntDesign name='right' size={16} color={'black'} /></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openTelegramChat}
          style={{ height: 50, width: '95%', alignSelf: 'center', marginTop: 30, borderRadius: 5, elevation: 3, backgroundColor: 'white' }}>
          <View style={{ height: 50, width: 320, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='telegram' size={32} color={'green'} />
              <Text style={{ marginLeft: 18, fontWeight: 500, color: 'black' }}>Telegram</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {/* <Text style={{ fontWeight: 300, marginHorizontal: 10 }}>7477235745</Text> */}
              <AntDesign name='right' size={16} color={'black'} />
            </View>
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
    width: responsiveWidth(100)
  },
  notification: {
    width: SCREEN_WIDTH * 1,
    alignSelf: 'center',
    height: 'auto',
    backgroundColor: Colors?.gray,
    borderRadius: 10,
  },
  heading: { fontSize: 16, color: 'black', fontWeight: '500', marginBottom: 20 },
})