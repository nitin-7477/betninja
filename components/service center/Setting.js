import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Modal } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const Setting = () => {
  const navigation = useNavigation();
  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});
  const [copiedText, setCopiedText] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
          headers: {
            "Authorization": JSON.parse(token),
          },
        });

        setUserInformation(response.data);
        setCopiedText(response?.data?.uid)
      } catch (error) {
        console.error('Error fetching user data in Wallet Screen:', error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  console.log("THis is setting js info", userInformation);


  const [showCopyModal, setShowCopyModal] = useState(false)

  const copyToClipboard = () => {
    Clipboard.setString(copiedText);
    setShowCopyModal(true)
    setTimeout(() => {
      setShowCopyModal(false);
    }, 2000);

  };



  return (
    <ScrollView style={styles.container}>
      {/* header */}

      <View style={{ width: '100%', backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Setting</Text>
      </View>
      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <View style={{ height: 60, width: 60, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: Colors.fontGray, borderWidth: 1 }}>
            <Image source={require('../../assets/casino-player.png')} style={{ height: 40, width: 40 }} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500' }}>Change Avatar</Text>
            <Feather name='chevron-right' size={20} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500' }}>NickName</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500' }}>{userInformation?.username}</Text>
            <Feather name='chevron-right' size={20} />
          </View>
        </View>
        <View style={{ width: SCREEN_WIDTH * 0.77, borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 30, alignSelf: 'center' }}>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500' }}>UID</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>{userInformation.uid}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Feather name='copy' size={20} color={Colors.fontGray} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('ChangePasswordScreen')}
        style={styles.history}>

        <View style={{ flexDirection: 'row' }}>
          <Feather name='lock' size={20} color={Colors.fontGray} />
          <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Login password</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Edit</Text>
          <Feather name='chevron-right' size={20} color={Colors.fontGray} />
        </View>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('BindMail')}

        style={styles.history}>
        <View style={{ flexDirection: 'row' }}>
          <Feather name='mail' size={20} color={Colors.fontGray} />
          <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Bind MailBox</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>to bind</Text>
          <Feather name='chevron-right' size={20} color={Colors.fontGray} />
        </View>

      </TouchableOpacity>

      <TouchableOpacity style={styles.history}>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name='domain-verification' size={25} color={Colors.fontGray} />
          <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Google Verificationn</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 13, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>unOpened</Text>
          <Feather name='chevron-right' size={20} color={Colors.fontGray} />
        </View>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => alert('Updated Version')}
        style={styles.history}>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name='system-update' size={25} color={Colors.fontGray} />
          <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Updated Version</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>1.0.0</Text>
          <Feather name='chevron-right' size={20} color={Colors.fontGray} />
        </View>
      </TouchableOpacity>
      {loading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={100} color="gold" />
        </View>
      )}
      <Modal visible={showCopyModal} transparent={true}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            width: 150, // Set your desired width
            height: 150, // Set your desired height
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
            <Entypo name="check" size={30} color={'white'} />
            <Text style={{ color: 'white' }}>Copy Succesfull</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveWidth(100)

  },
  header: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.97,
    backgroundColor: Colors.lightGray, justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  section: {
    height: SCREEN_HEIGHT * 0.33,
    width: SCREEN_WIDTH * 0.97,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 10
  },
  history: {
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.97,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'purple',
    marginVertical: 30,
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  }, normalText: {
    color: Colors.fontGray,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  placeholderLine: {
    color: Colors.purple,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

})