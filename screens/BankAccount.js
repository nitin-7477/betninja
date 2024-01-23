import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
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
  const [bankDetails, setBankDetails] = useState([])
  const [isBankAvailable, setIsBankAvailable] = useState([])

  const [selectedBankIndex, setSelectedBankIndex] = useState(-1);

  const toggleCheckbox = (index) => {
    setSelectedBankIndex(index);
    // Perform any additional actions when the checkbox state changes
    console.log('Checkbox state:', index);
  };

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${process.env.SERVERURL}/api/bank/userBank`, {
          headers: {
            "Authorization": JSON.parse(token),
          },
        });
        console.log(response.data.data);

        setBankDetails(response.data.data[(response.data.data).length - 1]);
        setIsBankAvailable(response.data.data)
        setSelectedBankIndex(response.data.data.length - 1);

      } catch (error) {
        console.error('Error fetching user data in Wallet Screen:', error.response);
      }
    };

    fetchBankData();
  }, []);



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


      <FlatList
        data={isBankAvailable}
        renderItem={({ item, index }) => (
          <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: Colors.lightGray, marginVertical: 5, borderRadius: 5 }}>
            <View style={{ height: 45, width: '100%', marginTop: 10, padding: 10, flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>Bank Name</Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>{item.bankName}</Text>
            </View>

            <View style={{ height: 45, width: '100%', marginTop: 10, padding: 10, flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>Account Number</Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>{item.acountNumber}</Text>
            </View>

            <View style={{ height: 45, width: '100%', marginTop: 10, padding: 10, flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>Phone Number</Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.fontGray }}>{item.phoneNumber}</Text>
            </View>

            <TouchableOpacity style={[styles.container, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => toggleCheckbox(index)}>
              <View style={[styles.checkmark, selectedBankIndex === index && styles.checked]}>
                {selectedBankIndex === index && <Text style={styles.checkmarkText}>✓</Text>}
              </View>
              <Text>Select</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {isBankAvailable.length <= 2 ? <TouchableOpacity
        onPress={() => navigation.navigate('AddBank')}
        style={{ height: SCREEN_HEIGHT * 0.1, marginBottom: 10, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: Colors.lightGray, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <Image source={require('../assets/plus.png')} style={{ height: 40, width: 40 }} />
        <Text>Add your bank</Text>
      </TouchableOpacity> : null}
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