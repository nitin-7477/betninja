import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../Constants/Screen';
import { useEffect, useState } from 'react';
import { getData } from '../../config/ServerServices';
import axios from 'axios';



const HistoryScreen = () => {


  const [apiData, setApiData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.SERVERURL}/api/random/30seclottary`);

          // console.log("This is game history Data", response.data);

          setApiData(response.data);
        } catch (error) {
          console.error('Error fetching data in game history:', error);
        }
      };

      fetchData();
    }
    catch (e) {
      console.log("This is error in Game History", e);
    }
  }, [])
  const displayData = apiData.data


  const colorImageMapping = {

    red: require('../../assets/reddot.png'),
    yellow: require('../../assets/yellowdot.png'),
    green: require('../../assets/greendot.png')

  };

  const loadMoreData = () => {
    const endIndex = startIndex + 10;
    const newData = apiData.slice(startIndex, endIndex);
    setVisibleData([...visibleData, ...newData]);
    setStartIndex(endIndex);
  };

  // console.log("This is api data", apiData.data);

  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', width: SCREEN_WIDTH * 0.9, marginTop: 20, height: 45, backgroundColor: '#d9ad82', paddingVertical: 10, borderTopEndRadius: 10, paddingHorizontal: 5, borderTopStartRadius: 10 }}>

        <View style={{ width: SCREEN_WIDTH * 0.25, }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', }}>Peroid</Text></View>
        <View style={{ width: SCREEN_WIDTH * 0.17, alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Number</Text></View>
        <View style={{ width: SCREEN_WIDTH * 0.3, alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Big Small</Text></View>
        <View ><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Color</Text></View>
      </View>

      <FlatList data={displayData} renderItem={({ item }) => {
        return <View style={{ display: 'flex', flexDirection: 'row', width: SCREEN_WIDTH * 0.9, marginTop: 2, height: 63, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'grey', paddingHorizontal: 5, alignItems: 'center' }}>
          <View style={{ width: SCREEN_WIDTH * 0.25, }}><Text style={{ fontSize: 16, color: 'black' }}>{item.LN}</Text></View>
          <View style={{ width: SCREEN_WIDTH * 0.17, alignItems: 'center', }}>
            <View style={[styles.numberBtn, { backgroundColor: 'green' }]}>
              <Text style={{ fontSize: 16, color: 'white' }}>
                {item.number}</Text>
            </View>
          </View>
          <View style={{ width: SCREEN_WIDTH * 0.3, alignItems: 'center' }}><Text style={{ fontSize: 16, color: 'black' }}>{item.size}</Text></View>
          <View style={{ flexDirection: 'row' }}>
            {item.color.map((c, index) => (
              <Image key={index} source={colorImageMapping[c]} style={{ width: 20, height: 20, marginRight: 5 }} />
            ))}

          </View>
        </View>
      }} />
      <TouchableOpacity onPress={loadMoreData} style={{ alignItems: 'center', marginTop: 10 }}>
        <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Load More</Text>
        </View>
      </TouchableOpacity>

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
  numberBtn: {
    alignItems: 'center',
    width: 40,
    paddingVertical: 10,
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'red',
    height: 40
  },
});

export default HistoryScreen;
