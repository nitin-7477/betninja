import { Image, StyleSheet, Text, View, ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert, Animated } from 'react-native'
import React from 'react'
import { Colors } from '../components/Constants/Colors'
import { SCREEN_WIDTH } from '../components/Constants/Screen'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import AntDesign from "react-native-vector-icons/AntDesign"

const QrScanner = ({ route }) => {
  const navigation = useNavigation()

  const { amount } = route.params;
  const [orderNumber, setOrderNumber] = useState('');
  const [UTR, setUTR] = useState('')
  const [countdown, setCountdown] = useState(300);
  const [bounceValue] = useState(new Animated.Value(0));

  useEffect(() => {
    generateOrderNumber();
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {

          clearInterval(timer);
          // Handle timer expiration here if needed
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const generateOrderNumber = () => {
    const randomOrderNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setOrderNumber(randomOrderNumber);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const startBouncingAnimation = () => {
    Animated.sequence([
      Animated.timing(bounceValue, { toValue: 1.5, duration: 1000, useNativeDriver: false }),
      Animated.spring(bounceValue, { toValue: 0, friction: 1, useNativeDriver: false }),
    ]).start(() => startBouncingAnimation());
  };


  const handlePayment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }
      var body = { amount: amount, orderNumber: orderNumber, beneficiery: "6265100070@okbizaxis", UTR: UTR }
      var result = await axios.post(`${process.env.SERVERURL}/api/deposit/deposits`, body, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })
      console.log(result.data);
      alert(result.data.message)
    }
    catch (e) {
      console.log(e);
    }

  }

  return (
    <ImageBackground source={require('../assets/gradiant3.jpg')} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15, }}>
        {/* <Text style={{ textAlign: 'center', fontSize: 36, fontWeight: 'bold', color: 'red' }}>Bet Ninja</Text> */}
        <Image source={require('../image/1.jpg')} style={{ height: 50, width: 150, alignSelf: 'center', borderRadius: 10 }} />
        <View style={{ borderBottomWidth: 0.6, borderBottomColor: 'pink', marginTop: 20, marginBottom: 30 }}>
        </View>
        <Text style={{ textAlign: 'center', fontSize: 24, color: Colors.black, fontWeight: '600' }}>Scan & Pay with any UPI</Text>
        <Text style={{ textAlign: 'center', fontSize: 14, color: Colors.fontGray, fontWeight: '600', marginTop: 10 }}>You are tranferring ₹{amount} to Bet Ninja</Text>



        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <AntDesign name="arrowdown" size={32} color={'red'} />

          <Text style={{ textAlign: 'center', color: 'red', fontSize: 32, fontWeight: 'bold', marginHorizontal: 10 }}>Below</Text>

          <AntDesign name="arrowdown" size={32} color={'red'} />

        </View>
        <Text style={{ textAlign: 'center', marginLeft: 7, color: 'black', fontSize: 14, fontWeight: 'bold' }}><Text style={{ color: 'red' }}>UTR Number</Text> is compulsory to verify</Text>

        <Image source={require('../assets/qrcode2.png')} style={{ height: 280, width: 260, alignSelf: 'center', resizeMode: 'contain', }} />
        <Text style={{ textAlign: 'center', fontSize: 16, color: 'black', fontWeight: '900', }}>
          This QR code will be expired in {formatTime(countdown)}
        </Text>
        <View style={{ alignSelf: 'center', marginBottom: 10, marginVertical: 25 }}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontWeight: 'bold' }}>Do not use the same QR code to pay multiple times</Text>
          {/* <Text style={{ textAlign: 'left', width: 300, fontWeight: 'bold', color: 'black' }}>If you successfully pay using QR code,still you have to fill in UTR submission</Text> */}
          <Text style={{ color: 'red', marginVertical: 10, textAlign: 'center' }}>NOTE: IF amount is not fetch then fill the amount manually</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30, justifyContent: 'space-evenly' }}>
          <Image source={require('../assets/paytm.png')} style={{ height: 60, width: 60 }} />
          <Image source={require('../assets/phonepay.png')} style={{ height: 50, width: 50 }} />
          <Image source={require('../assets/googlepe.png')} style={{ height: 70, width: 70 }} />
          <Image source={require('../assets/bhim.png')} style={{ height: 60, width: 60 }} />

        </View>
        <View style={{ borderBottomWidth: 0.6, borderBottomColor: 'skyblue', marginTop: 30, marginBottom: 30 }}>
        </View>
        <View style={{ width: '100%', height: 110, backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 6, padding: 5 }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.4 }}>UPI Payment</Text>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 5 }}>
            <Text style={{ width: '50%', fontWeight: '500', color: 'black' }}>Amount:</Text>
            <Text style={{ width: '50%', textAlign: 'right', color: 'red', fontSize: 16, fontWeight: 'bold' }}>{amount}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 5 }}>
            <Text style={{ width: '50%', fontWeight: '500', color: 'black' }}>Order No:</Text>
            <Text style={{ width: '50%', textAlign: 'right', color: 'grey' }}>{orderNumber}</Text>
          </View>
          {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 5 }}>
            <Text style={{ width: '50%', fontWeight: '500', color: 'black' }}>Beneficiery UPI:</Text>
            <Text style={{ width: '50%', textAlign: 'right', color: 'red', fontSize: 16, fontWeight: '500' }}>6265100070@okbizaxis</Text>
          </View> */}

        </View>
        <Text style={{ color: 'black', textAlign: 'center', padding: 10, fontSize: 16, marginVertical: 10, fontWeight: '500' }}>Submit Ref No/Reference No/UTR</Text>
        <View style={{ height: 55, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10 }}>
          <TextInput
            maxLength={12}
            keyboardType='numeric'
            placeholder='Enter 12 digit here'
            placeholderTextColor={'blue'}
            style={{ fontSize: 18, fontWeight: '500' }}
            onChangeText={(text) => setUTR(text)} />
        </View>
        <TouchableOpacity
          onPress={handlePayment}
          style={{ height: 45, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', padding: 10, alignSelf: 'center', marginVertical: 10, marginBottom: 30, borderRadius: 10 }}>
          <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Submit Ref No.</Text>
        </TouchableOpacity>
      </ScrollView>

    </ImageBackground >
  )
}

export default QrScanner

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 10, backgroundColor: 'white',
  }
})