import { View, Text, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator, Modal, Alert, Image, RefreshControl } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../components/Constants/Colors';
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Entypo from "react-native-vector-icons/Entypo"

import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import { BackHandler } from "react-native";

const Promotion = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [commission, setCommission] = useState([])
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [referalCode, setReferalCode] = useState('')
  const [refreshing, setRefreshing] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString(referalCode);
    setShowCopyModal(true)
    setTimeout(() => {
      setShowCopyModal(false);
    }, 2000);

  };

  console.log(process.env.SERVERURL);

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {

        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );


        return true;
      }

      // If not on HomePage, allow the default back behavior
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        alert('Token Expired')
        navigation.navigate('Login')
        return;
      }
    }

    catch (error) {
      console.error('Error fetching user data in Account Screen:', error);
    }

  };

  const fetchCommissionData = async () => {
    try {
      setLoading(true)

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }

      var result = await axios.get(`${process.env.SERVERURL}/api/commission/commission`, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })

      setCommission(result.data.data)
      setReferalCode(result.data.data.referalCode)


    } catch (e) {
      console.log("ERROR IN FETCHING COMMISSION", e);
    }
    finally {
      setLoading(false)

    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchToken();
        await fetchCommissionData();
        // navigation.replace('Main');
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    fetchData();
  }, []);

  const directRegisterCount = commission?.direct?.number_of_register || 0;
  const teamRegisterCount = commission?.team?.number_of_register || 0;
  const totalRegisterCount = directRegisterCount + teamRegisterCount;

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // Call your data fetching function here (e.g., fetchCommissionData)
      await fetchCommissionData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };


  // #d9ad82 Main theme color
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ position: 'relative' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ff0000', '#00ff00', '#0000ff']} // Set the colors of the refresh indicator
          />
        }
      >
        <View style={styles.container}>
          <StatusBar style='dark' />

          <View style={{ height: responsiveHeight(37), width: responsiveWidth(100), backgroundColor: '#d9ad82', }}>
            <View >
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 24, marginVertical: 10 }}>
                {commission?.total_commission > 0 ? commission?.total_commission.toFixed(2) : '0'}
              </Text>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 22, marginVertical: responsiveHeight(2) }}>Yesterday's Total Commission</Text>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 14, marginVertical: 5 }}>Upgrade the level to increase the Commission income</Text>
            </View>


            <View style={{ backgroundColor: '#D3D3D3', height: responsiveHeight(37), width: responsiveWidth(95), alignSelf: 'center', marginTop: responsiveHeight(1.7), borderRadius: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%', padding: 5, height: '100%', backgroundColor: 'white', justifyContent: 'center', borderTopLeftRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name='person' size={20} color={'#770737'} />

                  <Text style={{ textAlign: 'center', color: 'black' }}>Direct Subordinates</Text>
                </View>
                <View style={{ width: '50%', padding: 5, height: '100%', backgroundColor: 'white', justifyContent: 'center', borderTopRightRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name='person' size={20} color={'#770737'} />
                  <Text style={{ color: 'black' }}>Team Subordinates</Text>
                </View>

              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <View style={{ width: '50%', padding: 5, height: 'auto', justifyContent: 'center', }}>
                  <Text style={{ textAlign: 'center', color: 'black' }}>
                    {commission?.direct?.number_of_register}
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'grey' }}>no. of register</Text>

                </View>
                <View style={{ width: '50%', padding: 5, height: 'auto', justifyContent: 'center', }}>
                  <Text style={{ textAlign: 'center', color: 'black' }}>
                    {commission?.team?.number_of_register}
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'grey' }}>no. of register</Text>

                </View>

              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <View style={{ width: '50%', padding: 5, height: 'auto', justifyContent: 'center', }}>
                  <Text style={{ textAlign: 'center', color: 'green' }}>
                    {commission?.direct?.deposit_number}
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'grey' }}>Deposite number</Text>

                </View>
                <View style={{ width: '50%', padding: 5, height: 'auto', justifyContent: 'center', }}>
                  <Text style={{ textAlign: 'center', color: 'green' }}>
                    {commission?.team?.deposit_number}
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'grey' }}>Deposite number</Text>

                </View>

              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <View style={{ width: '50%', padding: 5, height: 'auto', justifyContent: 'center', }}>
                  <Text style={{ textAlign: 'center', color: 'red' }}>
                    {commission?.direct?.deposit_amount}
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'grey' }}>Deposite amount</Text>
                </View>
                <View style={{ width: '50%', padding: 5, height: 35, justifyContent: 'center', }}>
                  <Text style={{ textAlign: 'center', color: 'red' }}>
                    {commission?.team?.deposit_amount}
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'grey' }}>Deposite amount</Text>
                </View>
              </View>


              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <View style={{ width: '50%', padding: 5, height: 'auto', justifyContent: 'center', }}>
                  <Text style={{ textAlign: 'center', color: 'black' }}>
                    {commission?.direct?.deposit_first_time_count}
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'grey' }}>Number of people making first deposite</Text>
                </View>
                <View style={{ width: '50%', padding: 5, height: 'auto', justifyContent: 'center', }}>
                  <Text style={{ textAlign: 'center', color: 'black' }}>
                    {commission?.team?.deposit_first_time_count}
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'grey' }}>Number of people making first deposite</Text>
                </View>
              </View>
              {loading && (
                <View style={styles.activityIndicatorContainer}>
                  <ActivityIndicator size={100} color="gold" />
                </View>
              )}
            </View>

          </View>
          {/* **********************Invitation Link Button*********************** */}

          <View style={{ marginTop: responsiveHeight(22), height: responsiveHeight(7), width: responsiveWidth(95), backgroundColor: '#d9ad82', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginBottom: 20 }}>
            <Text style={{ textAlign: 'center', color: '#770737', fontWeight: 600, fontSize: 18 }}>Invite Your Friends</Text>
          </View>
          {/* **********************Invitation Link Button*********************** */}



          <TouchableOpacity onPress={copyToClipboard} style={{ height: responsiveHeight(7), width: responsiveWidth(95), alignSelf: 'center', marginTop: responsiveHeight(2), borderRadius: 5, elevation: 3, backgroundColor: 'white' }}>
            <View style={{ height: responsiveHeight(7), width: responsiveWidth(96), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row', }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='person' size={22} color={'black'} />
                <Text style={{ marginLeft: 4, fontWeight: 500, color: 'black' }}>Copy Invitation Code</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 300, marginHorizontal: 10 }}>
                  {commission?.referalCode}
                </Text>
                <AntDesign name='right' size={16} color={'black'} /></View>
            </View>

          </TouchableOpacity>
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
          <View style={styles.tile1}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SubOrdinate')}
              style={styles.tile2}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='person' size={22} color={'black'} />
                <Text style={{ marginLeft: 4, fontWeight: 500, color: 'black' }}>Subordinate Data</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name='right' size={16} color={'black'} /></View>
            </TouchableOpacity>
          </View>

          <View style={styles.tile1}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CommissionDetails')}
              style={styles.tile2}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='person' size={22} color={'black'} />
                <Text style={{ marginLeft: 4, fontWeight: 500, color: 'black' }}>Commission Details</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name='right' size={16} color={'black'} /></View>
            </TouchableOpacity>
          </View>

          <View style={styles.tile1}>
            <TouchableOpacity onPress={() => navigation.navigate('InvitationRules')} style={styles.tile2}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='person' size={22} color={'black'} />
                <Text style={{ marginLeft: 4, fontWeight: 500, color: 'black' }}>Invitation Rules</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name='right' size={16} color={'black'} /></View>
            </TouchableOpacity>
          </View>

          <View style={styles.tile1}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CustomerServices')}
              style={styles.tile2}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='person' size={22} color={'black'} />
                <Text style={{ marginLeft: 4, fontWeight: 500, color: 'black' }}>Agent Line customer services</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name='right' size={16} color={'black'} /></View>
            </TouchableOpacity>
          </View>


          <View style={{ height: responsiveHeight(35), width: responsiveWidth(95), alignSelf: 'center', marginTop: responsiveHeight(2), borderRadius: 5, elevation: 3, backgroundColor: 'white', padding: 6, marginBottom: responsiveHeight(5) }}>
            <View style={{ height: responsiveHeight(5), width: responsiveWidth(92), paddingHorizontal: 10, paddingVertical: 3 }}>
              <Text style={{ fontWeight: '700', fontSize: 16, color: 'black' }}>Promotion Data</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ width: responsiveWidth(46), height: responsiveHeight(10), justifyContent: 'center', borderRightColor: 'grey', borderRightWidth: 1 }}>
                <Text style={{ textAlign: 'center', color: 'green' }}>0</Text>
                <Text style={{ textAlign: 'center', color: 'grey', fontSize: 14 }}>This Week</Text>

              </View>
              <View style={{ width: responsiveWidth(46), height: responsiveHeight(10), justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'green' }}>
                  {commission?.total_commission > 0 ? commission?.total_commission.toFixed(2) : '0'}
                </Text>

                <Text style={{ textAlign: 'center', color: 'grey', fontSize: 14 }}>Total Commission</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ width: responsiveWidth(46), height: responsiveHeight(12), justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center', color: 'green' }}> {commission?.direct?.number_of_register}</Text>
                <Text style={{ textAlign: 'center', color: 'grey', fontSize: 14 }}>Direct Subordinate</Text>
              </View>
              <View style={{ width: responsiveWidth(46), height: responsiveHeight(12), justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: 'grey' }}>
                <Text style={{ textAlign: 'center', color: 'green' }}>{totalRegisterCount}</Text>
                <Text style={{ textAlign: 'center', color: 'grey', fontSize: 14 }}>Total number of Subordinate in the team</Text>
              </View>

            </View>

          </View>

        </View>

      </ScrollView>
      <View style={styles.fixedBox}>
        {/* Your content for the fixed box goes here */}
        <TouchableOpacity onPress={() => navigation.navigate('CustomerServices')} style={{ height: 60, width: 60, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
          <Image source={require('../assets/customerCare.png')} style={{ height: 60, width: 60 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Promotion

const styles = {
  container: {
    flex: 1,
    alignSelf: 'center',
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
  , tile1: { height: responsiveHeight(7), width: responsiveWidth(95), alignSelf: 'center', marginTop: responsiveHeight(1), borderRadius: 5, elevation: 3, backgroundColor: 'white' },
  tile2: { height: responsiveHeight(7), width: responsiveWidth(95), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(1), flexDirection: 'row', },
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  fixedBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
  },
}