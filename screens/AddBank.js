import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppTextInput from '../components/AppTextInput'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../components/Constants/Screen'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react'

const AddBank = () => {
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const [IFSC, setIFSC] = useState('')
  const [phone, setPhone] = useState('')


  const handleSaveChanges = () => {

    alert('Changes saved')
  }

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50, alignItems: 'center', flexDirection: 'row', height: 30, }}>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <EvilIcons name='chevron-left' size={35} color={'black'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 5, marginLeft: 40 }}>Add a bank account number</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <Image source={require('../assets/bank.png')} style={{ height: 30, width: 30 }} />
        <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>Add a account number</Text>
      </View>
      <TouchableOpacity style={{ height: 40, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', borderRadius: 10, backgroundColor: '#cfa67f', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Please select a bank</Text>
        <EvilIcons name='chevron-right' size={35} color={'white'} />
      </TouchableOpacity>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Image source={require('../assets/lock.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Full recipient's name</Text>
        </View>
        <AppTextInput value={name}
          onChangeText={(text) => setName(text)} placeholder='Please Enter recipients name' />
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
          <Image source={require('../assets/lock.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Bank Account Number</Text>
        </View>
        <AppTextInput
          value={account}
          onChangeText={(text) => setAccount(text)}
          placeholder='Enter your bank account number' />
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
          <Image source={require('../assets/lock.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>Phone Number</Text>
        </View>
        <AppTextInput value={phone}
          onChangeText={(text) => setPhone(text)} placeholder='Please Enter Phone Number' />
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
          <Image source={require('../assets/lock.png')} style={{ height: 25, width: 25 }} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>IFSC code</Text>
        </View>
        <AppTextInput
          value={IFSC}
          onChangeText={(text) => setIFSC(text)}
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