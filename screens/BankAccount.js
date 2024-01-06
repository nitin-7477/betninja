import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen'
import { Colors } from '../components/Constants/Colors'
import { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const BankAccount = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false)
  const [bankInfo, setBankInfo] = useState([])


  useEffect(() => {
    fetchAllBankDetails()
  }, [])


  const fetchAllBankDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      var result = await axios.get(`${process.env.SERVERURL}/api/bank/bank`, {
        headers: {
          "Authorization": JSON.parse(token),
        },
      })
      console.log(result);
    }
    catch (error) {
      console.log(error);
    }
    finally {

    }


  }




  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    // Perform any additional actions when the checkbox state changes
    console.log('Checkbox state:', !isChecked);
  };
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50, alignItems: 'center', flexDirection: 'row', height: 30, }}>
        <TouchableOpacity onPress={() => navigation.navigate('WithdrawScreen')}>
          <EvilIcons name='chevron-left' size={35} color={'black'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 5, marginLeft: 100 }}>Bank account</Text>
      </View>


      <View style={{ height: SCREEN_HEIGHT * 0.07, width: SCREEN_WIDTH * 0.95, backgroundColor: '#800080', borderTopStartRadius: 15, borderTopEndRadius: 15, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Bank Details</Text>
      </View>
      <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: Colors.lightGray }}>
        <View style={{ height: 45, width: '100%', marginTop: 10, padding: 10, flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>Bank Name
            </Text></View>
          <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>Jupiter federal bank</Text>
        </View>


        <View style={{ height: 45, width: '100%', marginTop: 10, padding: 10, flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>Account Number
            </Text></View>
          <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>9435***766</Text>
        </View>

        <View style={{ height: 45, width: '100%', marginTop: 10, padding: 10, flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>Phone Number
            </Text></View>
          <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>7477****745</Text>
        </View>

        <TouchableOpacity style={[styles.container, { flexDirection: 'row', alignItems: 'center' }]} onPress={toggleCheckbox}>
          <View style={[styles.checkmark, isChecked && styles.checked]}>
            {isChecked && <Text style={styles.checkmarkText}>✓</Text>}
          </View>
          <Text>Select</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddBank')}
        style={{ height: SCREEN_HEIGHT * 0.1, marginBottom: 10, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: Colors.lightGray, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <Image source={require('../assets/plus.png')} style={{ height: 40, width: 40 }} />
        <Text>Add your bank</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BankAccount

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, checkmark: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 2,
    borderColor: '#fbaed2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,

  },
  checked: {
    backgroundColor: '#800080',
    borderColor: '#800080',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
})