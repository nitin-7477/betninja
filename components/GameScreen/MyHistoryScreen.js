import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../Constants/Screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';





const MyHistoryScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        console.log(token);

        const response = await axios.get(`${process.env.SERVERURL}/api/bet/30secbet`, {

          headers: {
            "Authorization": JSON.parse(token),
          },
        });
        setUserInformation(response.data.thirtyBetOfUser);
      }
      catch (error) {
        console.error('Error fetching user data of My history screen:', error);
      }
    };

    fetchData();
  }, []);

  console.log(userInformation);

  const imageMapping = {
    big: require('../../assets/big.png'),
    small: require('../../assets/small.png'),
    violet: require('../../assets/yellowdot.png'),
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
              borderColor: item.status == 'failed' ? 'red' : 'green',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: item.status == 'failed' ? 'red' : 'green' }}>{item.status}</Text>
          </View>
          <Text style={{ color: item.win_loss > 0 ? 'green' : item.win_loss < 0 ? 'red' : 'black' }}>
            {item.win_loss > 0 ? '+' : ''}{item.win_loss}
          </Text>
        </View>
      </Pressable>
      {expandedIndex === index ? (
        <View>
          <Text style={{ color: 'black' }}>{item.period}</Text>
          {/* Add more details as needed */}
        </View>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={{ color: 'black' }}>Details</Text>
      </View>
      <FlatList data={userInformation} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
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
});

export default MyHistoryScreen;
