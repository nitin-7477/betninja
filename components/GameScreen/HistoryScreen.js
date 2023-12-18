import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../Constants/Screen';


const localData = [
  { id: 1, period: '123456789', number: '9', bigsmall: 'Big', color: 'Red' },
  { id: 2, period: '678912345', number: '8', bigsmall: 'Small', color: 'Violet' },
  { id: 3, period: '931234589', number: '4', bigsmall: 'Big', color: 'Green' },

]

const myHistoryData = [

  { image: require('../../assets/big.png'), id: '1234567854359', date: '11/5/2023', time: '6:24:00', status: 'Succeed', pl: '+17%' },
  { image: require('../../assets/big.png'), id: '6789123345445', date: '12/5/2023', time: '6:25:00', status: 'Failed', pl: '+16%' },
  { image: require('../../assets/big.png'), id: '9312353454589', date: '13/7/2023', time: '6:26:00', status: 'Succeed', pl: '+15%' },

]

const HistoryScreen = () => {
  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', width: SCREEN_WIDTH * 0.9, marginTop: 20, height: 45, backgroundColor: '#d9ad82', paddingVertical: 10, borderTopEndRadius: 10, paddingHorizontal: 5, borderTopStartRadius: 10 }}>
        <View style={{ width: SCREEN_WIDTH * 0.25, }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Peroid</Text></View>
        <View style={{ width: SCREEN_WIDTH * 0.17, alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Number</Text></View>
        <View style={{ width: SCREEN_WIDTH * 0.3, alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Big Small</Text></View>
        <View ><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Color</Text></View>

      </View>
      <FlatList data={localData} renderItem={({ item }) => {
        return <View style={{ display: 'flex', flexDirection: 'row', width: SCREEN_WIDTH * 0.9, marginTop: 2, height: 43, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'grey', paddingHorizontal: 5, }}>
          <View style={{ width: SCREEN_WIDTH * 0.25, }}><Text style={{ fontSize: 16 }}>{item.period}</Text></View>
          <View style={{ width: SCREEN_WIDTH * 0.17, alignItems: 'center' }}><Text style={{ fontSize: 16 }}>{item.number}</Text></View>
          <View style={{ width: SCREEN_WIDTH * 0.3, alignItems: 'center' }}><Text style={{ fontSize: 16 }}>{item.bigsmall}</Text></View>
          <View><Text style={{ width: SCREEN_WIDTH * 0.2, fontSize: 16, alignItems: 'center' }}>{item.color}</Text></View>

        </View>
      }} />
     
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default HistoryScreen;
