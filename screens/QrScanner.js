import { Image, StyleSheet, Text, View, ImageBackground, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../components/Constants/Colors'
import { SCREEN_WIDTH } from '../components/Constants/Screen'

const QrScanner = () => {
  return (
    <ImageBackground source={require('../assets/gradiant3.jpg')} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15, }}>
        {/* <Text style={{ textAlign: 'center', fontSize: 36, fontWeight: 'bold', color: 'red' }}>Bet Ninja</Text> */}
        <Image source={require('../image/1.jpg')} style={{ height: 50, width: 150, alignSelf: 'center', borderRadius: 10 }} />
        <View style={{ borderBottomWidth: 0.6, borderBottomColor: 'pink', marginTop: 20, marginBottom: 30 }}>
        </View>
        <Text style={{ textAlign: 'center', fontSize: 24, color: Colors.black, fontWeight: '600' }}>Scan & Pay with any UPI</Text>
        <Text style={{ textAlign: 'center', fontSize: 14, color: Colors.fontGray, fontWeight: '600', marginTop: 10 }}>You are tranferring ₹1 to Bet Ninja</Text>
        <Image source={require('../assets/qrcode.png')} style={{ height: 320, width: 260, alignSelf: 'center', marginTop: 20 }} />
        <View style={{ alignSelf: 'center' }}>
          <Text style={{ color: 'black' }}>Do not use the same QR code to pay multiple times</Text>
          <Text style={{ textAlign: 'left', width: 300, fontWeight: 'bold', color: 'black' }}>If you successfully pay using QR code, there is no need to fill in UTR submission</Text>

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
            <Text style={{ width: '50%', textAlign: 'right', color: 'red', fontSize: 16, fontWeight: 'bold' }}>100.00</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 5 }}>
            <Text style={{ width: '50%', fontWeight: '500', color: 'black' }}>Order No:</Text>
            <Text style={{ width: '50%', textAlign: 'right', color: 'grey' }}>1234456556789</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 5 }}>
            <Text style={{ width: '50%', fontWeight: '500', color: 'black' }}>Beneficiery UPI:</Text>
            <Text style={{ width: '50%', textAlign: 'right', color: 'red', fontSize: 16, fontWeight: '500' }}>6265100070@okbizaxis</Text>
          </View>

        </View>
        <Text style={{ color: 'black', textAlign: 'center', padding: 10, fontSize: 16, marginVertical: 10, fontWeight: '500' }}>Submit Ref No/Reference No/UTR</Text>
        <View style={{ height: 55, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10 }}>
          <TextInput placeholder='Enter 12 digit here' placeholderTextColor={'blue'} style={{ fontSize: 18, fontWeight: '500' }} />
        </View>
        <TouchableOpacity style={{ height: 45, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', padding: 10, alignSelf: 'center', marginVertical: 10, marginBottom: 30, borderRadius: 10 }}>
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