import { Image, StyleSheet, Text, TouchableOpacity, View, Picker } from 'react-native'
import React from 'react'
import AppTextInput from '../components/AppTextInput'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../components/Constants/Screen'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNPickerSelect from 'react-native-picker-select';



const AddBank = () => {
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const [IFSC, setIFSC] = useState('')
  const [phone, setPhone] = useState('')
  const [bankDetails, setBankDetails] = useState([])
  const [selectedBank, setSelectedBank] = useState(null);

  const placeholder = {
    label: 'Please select a bank',
    value: null,
    color: '#9EA0A4',
  };

  const banks = [
    { label: 'State Bank of India (SBI)', value: 'State Bank of India (SBI)' },
    { label: 'Punjab National Bank (PNB)', value: 'Punjab National Bank (PNB)' },
    { label: 'ICICI Bank', value: 'ICICI Bank' },
    { label: 'HDFC Bank', value: 'HDFC Bank' },
    { label: 'Axis Bank', value: 'Axis Bank' },
    { label: 'Bank of Baroda (BOB)', value: 'Bank of Baroda (BOB)' },
    { label: 'Canara Bank', value: 'Canara Bank' },
    { label: 'Union Bank of India', value: 'Union Bank of India' },
    { label: 'IDBI Bank', value: 'IDBI Bank' },
    { label: 'Bank of India', value: 'Bank of India' },
    { label: 'Central Bank of India', value: 'Central Bank of India' },
    { label: 'Indian Bank', value: 'Indian Bank ' },
    { label: 'Yes Bank', value: 'Yes Bank' },
    { label: 'Kotak Mahindra Bank', value: 'Kotak Mahindra Bank' },
    { label: 'IndusInd Bank', value: 'IndusInd Bank' },
    { label: 'Federal Bank', value: 'Federal Bank' },
    { label: 'Punjab & Sind Bank', value: 'Punjab & Sind Bank' },
    { label: 'Karur Vysya Bank', value: 'Karur Vysya Bank' },
    { label: 'South Indian Bank', value: 'South Indian Bank' },
    { label: 'Bandhan Bank', value: 'Bandhan Bank' },


    // Add more banks as needed
  ];

  const handleSaveChanges = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      var body = {
        "userId": "65969f7478b780c734302177",
        "bankName": selectedBank,
        "acountNumber": account,
        "ifscCode": IFSC,
        "phoneNumber": phone,
        "Name": name
      }
      
 
      const result = await axios.post(`${process.env.SERVERURL}/api/bank/addBank`, body, {
        headers: {
          "Authorization": JSON.parse(token),
        },
      })
      console.log(result.data.data);
      setBankDetails(result.data.data)
      
      console.log("This is result to add bank", result.data.status);




    }
    catch (error) {
      console.log(error);
    }
    finally {

    }
  }


  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50, alignItems: 'center', flexDirection: 'row', height: 30, }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EvilIcons name='chevron-left' size={35} color={'black'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 5, marginLeft: 40 }}>Add a bank account number</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <Image source={require('../assets/bank.png')} style={{ height: 30, width: 30 }} />
        <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>Add a account number</Text>
      </View>




      <RNPickerSelect
        placeholder={placeholder}
        items={banks}
        onValueChange={(value) => setSelectedBank(value)}
        style={{
          inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 20,
            color: 'black',
            backgroundColor: '#cfa67f',
          },
          inputAndroidContainer: {
            marginBottom: 20,
          },
          placeholder: {
            color: 'black',
          },
        }}
      />



      <View style={{ marginTop: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Image source={require('../assets/person.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Full recipient's name</Text>
        </View>
        <AppTextInput value={name}
          onChangeText={(text) => setName(text)} placeholder='Please Enter recipients name' />
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
          <Image source={require('../assets/accountnumber.png')} style={{ height: 20, width: 20 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Bank Account Number</Text>
        </View>
        <AppTextInput
          value={account}
          keyboardType='numeric'
          onChangeText={(text) => setAccount(text)}
          placeholder='Enter your bank account number' />
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
          <Image source={require('../assets/phone.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Phone Number</Text>
        </View>
        <AppTextInput
          keyboardType='numeric'
          value={phone}
          onChangeText={(text) => setPhone(text)} placeholder='Please Enter Phone Number' />
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
          <Image source={require('../assets/ifsce.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>IFSC code</Text>
        </View>
        <AppTextInput
          value={IFSC}
          onChangeText={(text) => setIFSC(text.toUpperCase())}
          placeholder='Please Enter IFSC code' />
      </View>


      <TouchableOpacity
        onPress={handleSaveChanges} style={{ height: SCREEN_HEIGHT * 0.06, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: 'red', marginTop: 70, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddBank

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  }
})