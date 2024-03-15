import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useNavigation } from "@react-navigation/native";
import DocumentPicker from 'react-native-document-picker';
import { useState } from 'react';
const LiveChat1 = () => {
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null)

  const selectDoc = async () => {
    try {


      const doc = await DocumentPicker.pickSingle()
      console.log(doc)
      setSelectedFile(doc)
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log("User cancelled the upload", err);
      else
        console.log(err)
    }
  }
  console.log(selectedFile);
  return (
    <View style={styles.container}>
      <View style={{ height: responsiveHeight(7), width: responsiveWidth(100), backgroundColor: 'white', alignItems: 'center', flexDirection: 'row', borderBottomStartRadius: 15, borderBottomEndRadius: 15, elevation: 5 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <EvilIcons name='chevron-left' size={40} color={'black'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 5 }}>Deposite Not received</Text>
      </View>
      <TouchableOpacity onPress={() => handleNavigation(1)} style={styles.view1}>
        <Image source={require('../../assets/livechat/image1.png')} style={{ width: '100%', height: 100, borderRadius: 10 }} />
      </TouchableOpacity>
      <View style={{ width: '97%', alignSelf: 'center', marginTop: 10, marginBottom: 5 }}>
        <Text style={{ color: 'black' }}>ID Account</Text>
      </View>
      <View style={{ width: '97%', alignSelf: 'center', borderWidth: 1, borderColor: 'black', height: 40, borderRadius: 8 }}>
        <TextInput placeholder='Enter ID Account' placeholderTextColor={'black'} />
      </View>


      <View style={{ width: '97%', alignSelf: 'center', marginTop: 10, marginBottom: 5 }}>
        <Text style={{ color: 'black' }}>Amount</Text>
      </View>
      <View style={{ width: '97%', alignSelf: 'center', borderWidth: 1, borderColor: 'black', height: 40, borderRadius: 8 }}>
        <TextInput placeholder='Enter Amount' placeholderTextColor={'black'} />
      </View>

      <View style={{ width: '97%', alignSelf: 'center', marginTop: 10, marginBottom: 5 }}>
        <Text style={{ color: 'black' }}>UTR Number</Text>
      </View>
      <View style={{ width: '97%', alignSelf: 'center', borderWidth: 1, borderColor: 'black', height: 40, borderRadius: 8 }}>
        <TextInput placeholder='Enter UTR Number' placeholderTextColor={'black'} />
      </View>

      <View style={{ width: '97%', alignSelf: 'center', marginTop: 10, marginBottom: 5 }}>
        <Text style={{ color: 'black' }}>Receiver UPI ID</Text>
      </View>
      <View style={{ width: '97%', alignSelf: 'center', borderWidth: 1, borderColor: 'black', height: 40, borderRadius: 8 }}>
        <TextInput placeholder='Enter Receiver UPI ID' placeholderTextColor={'black'} />
      </View>

      <View style={{ width: '97%', alignSelf: 'center', marginTop: 10, marginBottom: 5 }}>
        <Text style={{ color: 'black' }}>Deposit Proof receipt detail</Text>
      </View>
      <View style={{ width: '97%', alignSelf: 'center', borderWidth: 1, borderColor: 'black', height: 40, borderRadius: 8, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={selectDoc} style={{ height: 25, width: '30%', borderWidth: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: 'lightgrey', marginHorizontal: 3 }}>
          <Text>Choose File</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', marginRight: 5, width: '65%' }}>
          {selectedFile
            ? `${selectedFile?.name?.slice(0, 15)}.....${selectedFile?.name?.slice(-10)}`
            : ''}
        </Text>
      </View>

      <View style={{ width: '95%', alignSelf: 'center' }}>
        <TouchableOpacity style={{ width: 100, height: 30, backgroundColor: 'orange', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>

          <Text style={{ color: 'white' }}>Click Submit</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default LiveChat1

const styles = StyleSheet.create({
  container: {
    flex: 1, width: responsiveWidth(100), backgroundColor: 'white'
  }, view1: { height: responsiveHeight(14), width: responsiveWidth(98), alignSelf: 'center', resizeMode: 'contain', marginTop: 10, borderRadius: 5 }
})