import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../components/Constants/Colors';
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';


const Promotion = () => {
  const navigation = useNavigation();

  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const storedUserData = await AsyncStorage.getItem('token');
        const parsedUserData = JSON.parse(storedUserData);
        setUserToken(parsedUserData);

        // Use the retrieved token to fetch user information
        const token = `${parsedUserData.token}`;
        const response = await axios.get('https://9871-2401-4900-1c19-6daf-d33-85ae-dfd7-8e43.ngrok-free.app/api/auth/user', {
          headers: {
            "Authorization": token,
          },
        });
        setUserInformation(response.data);
      } catch (error) {
        console.error('Error fetching user data in Promotion Screen:', error);
      }
    };

    fetchData();
  }, []);

  console.log("This is user information for Promotion Screen", userInformation);


  // #d9ad82 Main theme color
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style='dark' />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 7 }}><TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Promotion</Text></View>

        <View style={{ height: SCREEN_HEIGHT * 0.38, width: SCREEN_WIDTH, backgroundColor: '#d9ad82', }}>
          <View >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 22, marginVertical: 10, }}>0</Text>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 16, marginVertical: 10 }}>Yesterday's Total Commission</Text>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 14, marginVertical: 5 }}>Upgrade the level to increase the Commission income</Text>
          </View>


          <View style={{ backgroundColor: '#D3D3D3', height: 270, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', marginTop: 20, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%', padding: 5, height: 35, backgroundColor: 'white', justifyContent: 'center', borderTopLeftRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='person' size={20} color={'#770737'} />

                <Text style={{ textAlign: 'center', color: 'black' }}>Direct Subordinates</Text>
              </View>
              <View style={{ width: '50%', padding: 5, height: 35, backgroundColor: 'white', justifyContent: 'center', borderTopRightRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='person' size={20} color={'#770737'} />
                <Text style={{ color: 'black' }}>Team Subordinates</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center' }}>0</Text>
                <Text style={{ textAlign: 'center', color: 'grey' }}>no. of register</Text>

              </View>
              <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center' }}>0</Text>
                <Text style={{ textAlign: 'center', color: 'grey' }}>no. of register</Text>

              </View>

            </View>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
                <Text style={{ textAlign: 'center', color: 'grey' }}>Deposite number</Text>

              </View>
              <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
                <Text style={{ textAlign: 'center', color: 'grey' }}>Deposite number</Text>

              </View>

            </View>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', color: 'red' }}>0</Text>
                <Text style={{ textAlign: 'center', color: 'grey' }}>Deposite amount</Text>
              </View>
              <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', color: 'red' }}>0</Text>
                <Text style={{ textAlign: 'center', color: 'grey' }}>Deposite amount</Text>
              </View>
            </View>


            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <View style={{ width: '50%', padding: 5, height: 45, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', }}>0</Text>
                <Text style={{ textAlign: 'center', color: 'grey' }}>Number of people making first deposite</Text>
              </View>
              <View style={{ width: '50%', padding: 5, height: 45, justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center' }}>0</Text>
                <Text style={{ textAlign: 'center', color: 'grey' }}>Number of people making first deposite</Text>
              </View>
            </View>
          </View>

        </View>
        <View style={{ marginTop: 140, height: 50, width: 320, backgroundColor: '#d9ad82', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginBottom: 20 }}>
          <Text style={{ textAlign: 'center', color: '#770737', fontWeight: 600, fontSize: 20 }}>Invitation Link</Text>
        </View>
        <View style={{ height: 50, width: 320, alignSelf: 'center', marginTop: 10, borderRadius: 5, elevation: 3, backgroundColor: 'white' }}>
          <View style={{ height: 50, width: 320, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='person' size={22} color={'black'} />
              <Text style={{ marginLeft: 4, fontWeight: 500, color: 'black' }}>Copy Invitation Code</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 300, marginHorizontal: 10 }}>7477235745</Text>
              <AntDesign name='right' size={16} color={'black'} /></View>
          </View>

        </View>

        <View style={{ height: 50, width: 320, alignSelf: 'center', marginTop: 10, borderRadius: 5, elevation: 3, backgroundColor: 'white' }}>
          <View style={{ height: 50, width: 320, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='person' size={22} color={'black'} />
              <Text style={{ marginLeft: 4, fontWeight: 500, color: 'black' }}>Subordinate Data</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name='right' size={16} color={'black'} /></View>
          </View>

        </View>
        <View style={{ height: 220, width: 320, alignSelf: 'center', marginTop: 10, borderRadius: 5, elevation: 3, backgroundColor: 'white', padding: 6 }}>
          <View style={{ height: 30, width: 320, paddingHorizontal: 10, paddingVertical: 3 }}>
            <Text style={{ fontWeight: '700', fontSize: 16, color: 'black' }}>Promotion Data</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', borderRightColor: 'grey', borderRightWidth: 1 }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
              <Text style={{ textAlign: 'center', color: 'grey' }}>This Week</Text>

            </View>
            <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
              <Text style={{ textAlign: 'center', color: 'grey' }}>Total Commission</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
              <Text style={{ textAlign: 'center', color: 'grey' }}>Direct Subordinate</Text>
            </View>
            <View style={{ width: '50%', padding: 5, height: 55, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: 'grey', }}>
              <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
              <Text style={{ textAlign: 'center', color: 'grey' }}>Total number of Subordinate in the team</Text>
            </View>

          </View>

        </View>

      </View>
    </ScrollView>
  )
}

export default Promotion

const styles = {
  container: {
    flex: 1,
    // padding: 20,
  },
  heading: {
    heading: 50,
    width: 300,
    backgroundColor: 'red'
  },
  textLine: {
    textAlign: 'center', color: 'white',
    //  fontSize: '16', 
    fontWeight: '700'
  }
}