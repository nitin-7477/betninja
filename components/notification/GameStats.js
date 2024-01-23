import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const GameStats = () => {

  const navigation = useNavigation();

  const [today, setToday] = useState([])
  const [Yesterday, setYesterday] = useState([])
  const [thisWeek, setThisWeek] = useState([])
  const [thisMonth, setThisMonth] = useState([])
  const [selectedBtn, setSelectedBtn] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalWinLoss, setTotalWinLoss] = useState(0)



  const handleClick = async (btn) => {
    setSelectedBtn(btn);

    switch (btn) {
      case 1:
        calculateTotalWinLoss(today);
        break;
      case 2:
        calculateTotalWinLoss(Yesterday);
        break;
      case 3:
        calculateTotalWinLoss(thisWeek);
        break;
      case 4:
        calculateTotalWinLoss(thisMonth);
        break;
      default:
        setTotalWinLoss(0);
    }
  }

  const calculateTotalWinLoss = (data) => {
    const total = data.reduce((acc, item) => acc + parseFloat(item.win_loss || 0), 0);
    setTotalWinLoss(total);
  }

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

  const fetchBetData = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        navigation.navigate('Login')
        return;
      }



      var result = await axios.get(`${process.env.SERVERURL}/api/auth/user-bets`, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })


      setToday(result.data.responseData.today)
      setYesterday(result.data.responseData.yesterday)
      setThisWeek(result.data.responseData.thisWeek)
      setThisMonth(result.data.responseData.thisMonth)

      const totalToday = result.data.responseData.today.reduce((acc, item) => acc + item.win_loss, 0);
      const totalYesterday = result.data.responseData.yesterday.reduce((acc, item) => acc + item.win_loss, 0);
      const totalThisWeek = result.data.responseData.thisWeek.reduce((acc, item) => acc + item.win_loss, 0);
      const totalThisMonth = result.data.responseData.thisMonth.reduce((acc, item) => acc + item.win_loss, 0);

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
        await fetchBetData();
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    fetchData();
  }, []);


  const renderThisMonth = ({ item, i }) => {
    return (
      <View style={{ flex: 1, width: '95%', height: responsiveHeight(27), backgroundColor: '#e9ffdb', marginVertical: 4, alignSelf: 'center', borderRadius: 5, padding: 5, elevation: 5, }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Lottery No.</Text>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.LN}</Text>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Bet Amount</Text>
          <Text style={{ color: 'black' }}>
            ₹ {item.phrchaseAmount ? item.phrchaseAmount.toFixed(2) : '0.00'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Result</Text>
          <Text style={{ color: 'black' }}>{item.result.size}  {item.result.number}  {item.result.color}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Select</Text>
          <Text style={{ color: 'black' }}>{item.select}  </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Select Type</Text>
          <Text style={{ color: 'black' }}>{item.selectType}  </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Status</Text>
          <Text style={{ color: item.status === 'success' ? 'blue' : 'red', fontWeight: 'bold' }}>{item.status}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Win/Loss</Text>
          <Text style={{
            color: item.win_loss >= 0 ? 'green' : 'red',
          }}>
            ₹{(parseFloat(item.win_loss) || 0).toFixed(2)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Date</Text>
          <Text style={{ color: 'black' }}>{new Date(item.orderTime).toLocaleString()}</Text>
        </View>
      </View>
    );
  }
  const renderToday = ({ item, i }) => {
    return (
      <View style={{ flex: 1, width: '95%', height: responsiveHeight(27), backgroundColor: '#e9ffdb', marginVertical: 4, alignSelf: 'center', borderRadius: 5, padding: 5, elevation: 5, }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Lottery No.</Text>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.LN}</Text>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Bet Amount</Text>
          <Text style={{ color: 'black' }}>
            ₹ {item.phrchaseAmount ? item.phrchaseAmount.toFixed(2) : '0.00'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Result</Text>
          <Text style={{ color: 'black' }}>{item.result.size}  {item.result.number}  {item.result.color}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Select</Text>
          <Text style={{ color: 'black' }}>{item.select}  </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Select Type</Text>
          <Text style={{ color: 'black' }}>{item.selectType}  </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Status</Text>
          <Text style={{ color: item.status === 'success' ? 'blue' : 'red', fontWeight: 'bold' }}>{item.status}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Win/Loss</Text>
          <Text style={{
            color: item.win_loss >= 0 ? 'green' : 'red',
          }}>
            ₹{(parseFloat(item.win_loss) || 0).toFixed(2)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Date</Text>
          <Text style={{ color: 'black' }}>{new Date(item.orderTime).toLocaleString()}</Text>
        </View>
      </View>
    );

  }
  const renderYesterday = ({ item, i }) => {
    return (
      <View style={{ flex: 1, width: '95%', height: responsiveHeight(27), backgroundColor: '#e9ffdb', marginVertical: 4, alignSelf: 'center', borderRadius: 5, padding: 5, elevation: 5, }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Lottery No.</Text>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.LN}</Text>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Bet Amount</Text>
          <Text style={{ color: 'black' }}>
            ₹ {item.phrchaseAmount ? item.phrchaseAmount.toFixed(2) : '0.00'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Result</Text>
          <Text style={{ color: 'black' }}>{item.result.size}  {item.result.number}  {item.result.color}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Select</Text>
          <Text style={{ color: 'black' }}>{item.select}  </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Select Type</Text>
          <Text style={{ color: 'black' }}>{item.selectType}  </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Status</Text>
          <Text style={{ color: item.status === 'success' ? 'blue' : 'red', fontWeight: 'bold' }}>{item.status}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Win/Loss</Text>
          <Text style={{
            color: item.win_loss >= 0 ? 'green' : 'red',
          }}>
            ₹{(parseFloat(item.win_loss) || 0).toFixed(2)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Date</Text>
          <Text style={{ color: 'black' }}>{new Date(item.orderTime).toLocaleString()}</Text>
        </View>
      </View>
    );
  }
  const renderThisWeek = ({ item, i }) => {
    return (
      <View style={{ flex: 1, width: '95%', height: responsiveHeight(27), backgroundColor: '#e9ffdb', marginVertical: 4, alignSelf: 'center', borderRadius: 5, padding: 5, elevation: 5, }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Lottery No.</Text>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.LN}</Text>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Bet Amount</Text>
          <Text style={{ color: 'black' }}>
            ₹ {item.phrchaseAmount ? item.phrchaseAmount.toFixed(2) : '0.00'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Result</Text>
          <Text style={{ color: 'black' }}>{item.result.size}  {item.result.number}  {item.result.color}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Select</Text>
          <Text style={{ color: 'black' }}>{item.select}  </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Select Type</Text>
          <Text style={{ color: 'black' }}>{item.selectType}  </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Status</Text>
          <Text style={{ color: item.status === 'success' ? 'blue' : 'red', fontWeight: 'bold' }}>{item.status}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Win/Loss</Text>
          <Text style={{
            color: item.win_loss >= 0 ? 'green' : 'red',
          }}>
            ₹{(parseFloat(item.win_loss) || 0).toFixed(2)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 1 }}>
          <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold' }}>Date</Text>
          <Text style={{ color: 'black' }}>{new Date(item.orderTime).toLocaleString()}</Text>
        </View>
      </View>
    );
  }

 

  const renderLoadingIndicator = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={100} color="gold" />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* header */}

      <View style={{ width: SCREEN_WIDTH * 1, backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Game Chart</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity
          onPress={() => handleClick(1)}
          style={[styles.otpBtn, { backgroundColor: selectedBtn == 1 ? 'red' : 'grey', }]}    >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleClick(2)}
          style={[styles.otpBtn, { backgroundColor: selectedBtn == 2 ? 'red' : 'grey', }]}    >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            Yesterday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleClick(3)}
          style={[styles.otpBtn, { backgroundColor: selectedBtn == 3 ? 'red' : 'grey', }]}    >
          <Text style={{ color: selectedBtn == 3 ? 'white' : 'white', textAlign: 'center', fontSize: 12, }} >
            This Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleClick(4)}
          style={[styles.otpBtn, { backgroundColor: selectedBtn == 4 ? 'red' : 'grey', }]} >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            This Month
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 10,
          color: totalWinLoss >= 0 ? 'green' : 'red',
        }}>
          {totalWinLoss.toFixed(2)}
        </Text>
        <Text>
          Total Bet
        </Text>

      </View>

      <View style={{ flex: 1, width: responsiveWidth(100), height: 'auto' }}>
        {loading
          ? renderLoadingIndicator()
          : (
            <FlatList
              data={
                selectedBtn === 1 ? today :
                  selectedBtn === 2 ? Yesterday :
                    selectedBtn === 3 ? thisWeek :
                      selectedBtn === 4 ? thisMonth :
                        [] // Default to an empty array if none of the conditions match
              }
              renderItem={
                selectedBtn === 1 ? renderToday :
                  selectedBtn === 2 ? renderYesterday :
                    selectedBtn === 3 ? renderThisWeek :
                      selectedBtn === 4 ? renderThisMonth :
                        null // Set renderItem to null or another default value if none of the conditions match
              }
            />
          )}
      </View>


      {/* <View style={styles.history}>

        <Image source={require('../../assets/noData.png')} style={{ height: 200, width: 200 }} />
        <Text style={{ fontSize: 16, fontWeight: '600' }}>No Data</Text>

      </View> */}
    </ScrollView>
  )
}

export default GameStats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH * 1
  },
  header: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors?.lightGray, justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  section: {
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.88,
    backgroundColor: Colors?.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  history: {
    height: SCREEN_HEIGHT * 0.6,
    width: SCREEN_WIDTH * 0.88,
    backgroundColor: Colors?.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
    color: Colors?.fontGray,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  placeholderLine: {
    color: Colors?.purple,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15
  },
  otpBtn: {
    backgroundColor: Colors?.fontGray,
    borderRadius: 10,
    width: '23%',
    elevation: 5,
    paddingVertical: 3,
    marginHorizontal: 2,
    paddingVertical: 5,
    marginVertical: 10, alignSelf: 'center'
  },

})