import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../Constants/Colors';





const MyHistoryScreen = ({ selectedCountdown, showWinEmojiPopUp, showLoseEmojiPopUp }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});
  const [loading, setLoading] = useState(false);


  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }
      const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
        headers: {
          "Authorization": JSON.parse(token),
        },
      });


    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true)
        fetchUserData()

        let timerBet;


        switch (selectedCountdown) {
          case 'thirtySec':
            timerBet = '30secbet'
            break;
          case 'oneMin':
            timerBet = '1minbet'
            break;
          case 'threeMin':
            timerBet = '3minbet'
            break;
          case 'fiveMin':
            timerBet = '5minbet'
            break;

          default:
            break;
        }
        console.log(timerBet);


        const token = await AsyncStorage.getItem('token');
        console.log(token);


        const response = await axios.get(`${process.env.SERVERURL}/api/bet/${timerBet}`, {

          headers: {
            "Authorization": JSON.parse(token),
          },
        });
        if (response.data) {
          fetchUserData()
        }
        console.log(response.data);

        let userBet;
        switch (selectedCountdown) {
          case 'thirtySec':
            userBet = response.data.thirtyBetOfUser;
            break;
          case 'oneMin':
            userBet = response.data.oneBetOfUser;
            break;
          case 'threeMin':
            userBet = response.data.threeBetOfUser;
            break;
          case 'fiveMin':
            userBet = response.data.fiveBetOfUser;
            break;
          default:
            break;
        }

        console.log("xxxxxxxxxxxxxxxxxxxxx", userBet[0].status);

        if (userBet[0].status == 'success') {
          showWinEmojiPopUp()
          fetchData()
        }
        if (userBet[0].status == 'failed') {
          fetchData()
          showLoseEmojiPopUp()
        }
        if (userBet[0].status == 'pending') {
          fetchData()
        }


        setUserInformation(userBet);
      }
      catch (error) {
        console.error('Error fetching user data of My history screen:', error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [selectedCountdown]);



  const imageMapping = {
    big: require('../../assets/big.png'),
    small: require('../../assets/small.png'),
    yellow: require('../../assets/yellowdot.png'),
    red: require('../../assets/reddot.png'),
    green: require('../../assets/greendot.png'),
    1: require('../../assets/1.png'),
    2: require('../../assets/2.png'),
    3: require('../../assets/3.png'),
    4: require('../../assets/4.png'),
    5: require('../../assets/5.png'),
    6: require('../../assets/6.png'),
    7: require('../../assets/7.png'),
    8: require('../../assets/8.png'),
    9: require('../../assets/9.png'),



  };

  // console.log(userInformation);


  const handleItemPress = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const renderItem = ({ item, index }) => (

    <View>
      <Pressable
        onPress={() => handleItemPress(index)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: SCREEN_WIDTH * 0.9,
          marginTop: 2,
          height: 63,

          paddingVertical: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: 'grey',
          paddingHorizontal: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 20 }}>
            <Image source={imageMapping[item.select]} style={{ height: 30, width: 30 }} />
          </View>
          <View>
            <Text style={{ color: 'black' }}>{item.LN}</Text>
            <Text style={{ color: 'black' }}>
              {item.updatedAt}
              {item.time}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center ' }}>
          <View
            style={{
              height: 25,
              width: 60,
              border: 1,
              borderWidth: 1,
              borderColor: item.status == 'failed' ? 'red' : item.status == 'pending' ? 'orange' : 'green',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: item.status == 'failed' ? 'red' : item.status == 'pending' ? 'orange' : 'green' }}>{item.status}</Text>
          </View>
          <Text style={{ color: item.win_loss > 0 ? 'green' : item.win_loss < 0 ? 'red' : 'black' }}>
            {item.win_loss > 0 ? '+' : ''}{item.win_loss}
          </Text>
        </View>
      </Pressable>
      {expandedIndex === index ? (
        <View style={{ marginTop: 5 }}>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Order No.</Text>
            <Text style={{ color: 'black' }}>{item.orderNumber}</Text>
          </View>
          {/* Add more details as needed */}
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Lottery No.</Text>
            <Text style={{ color: 'black' }}>{item.LN}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Purchase Amount</Text>
            <Text style={{ color: 'black' }}>{item.phrchaseAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Amount after tax</Text>
            <Text style={{ color: 'black' }}>{item.amountAfterTax.toFixed(2)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tax</Text>
            <Text style={{ color: 'black' }}>{item.tax}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Result</Text>
            <Text style={{ color: 'black' }}>{item.tax}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select</Text>
            <Text style={{ color: 'black' }}>{item.select}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select Type</Text>
            <Text style={{ color: 'black' }}>{item.selectType}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Status</Text>
            <Text style={{ color: 'black' }}>{item.status}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Win/Loss</Text>
            <Text style={{ color: 'black' }}>{item.win_loss}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={50} color="gold" />
        </View>
      )}
      <FlatList data={userInformation} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    minHeight: SCREEN_HEIGHT * 0.3,
    maxHeight: 'auto'
  },
  details: {
    height: 30,
    width: 70,
    border: 1,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  listItem: {
    height: 25, width: '95%', backgroundColor: Colors.lightGray, justifyContent: 'space-between', alignItems: 'c', flexDirection: 'row', alignSelf: 'center', paddingHorizontal: 5, paddingVertical: 3, borderRadius: 5, marginVertical: 3
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyHistoryScreen;
