import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../Constants/Screen';

const myHistoryData = [
  { image: require('../../assets/big.png'), id: '1234567854359', date: '11/5/2023', time: '6:24:00', status: 'Succeed', pl: '+17%', orderNo: 'QBJHLDW565VU4534VHVH', period: '342435234', purchase: '34', quantity: 5, Tax: 4, result: 'Red' },
  { image: require('../../assets/big.png'), id: '6789123345445', date: '12/5/2023', time: '6:25:00', status: 'Failed', pl: '+16%', orderNo: 'YTJHLDW565VU453345VH', period: '442435234', purchase: '44', quantity: 6, Tax: 6, result: 'Blue' },
  { image: require('../../assets/big.png'), id: '9312353454589', date: '13/7/2023', time: '6:26:00', status: 'Succeed', pl: '+15%', orderNo: 'JGDMJOJ767VU4534VHVH', period: '542435234', purchase: '54', quantity: 7, Tax: 7, result: 'Green' },
];

const MyHistoryScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

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
            <Image source={item.image} style={{ height: 30, width: 30 }} />
          </View>
          <View>
            <Text>{item.id}</Text>
            <Text>
              {item.date}
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
              borderColor: 'grey',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'green' }}>{item.status}</Text>
          </View>
          <Text style={{ color: 'green' }}>{item.pl}</Text>
        </View>
      </Pressable>
      {expandedIndex === index ? (
        <View>
          <Text>{item.period}</Text>
          {/* Add more details as needed */}
        </View>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text>Details</Text>
      </View>
      <FlatList data={myHistoryData} renderItem={renderItem} keyExtractor={(item) => item.id} />
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
