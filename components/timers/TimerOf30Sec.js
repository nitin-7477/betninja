import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import io from 'socket.io-client';

const CountdownComponent = () => {
  const [countdowns, setCountdowns] = useState({
    thirtySec: 0,
    oneMin: 0,
    threeMin: 0,
    fiveMin: 0,
  });
  const [selectedCountdown, setSelectedCountdown] = useState('thirtySec');
  const [defaultCountdown, setDefaultCountdown] = useState('thirtySec');
  const socketRef = useRef(null);


  useEffect(() => {
    // Establish socket connection only if it doesn't exist
    if (!socketRef.current) {

      socketRef.current = io("http://152.58.25.79:5001");
      // console.log(socketRef.current);

      // Replace 'http://your-server-address' with your actual server address
      socketRef.current.on('updateCountdown_thirtySecTimer', (data) => {
        console.log('Received updateCountdown_thirtySecTimer event:', data);
        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, thirtySec: data.countdown }));
      });

      socketRef.current.on('updateCountdown_oneMinTimer', (data) => {
        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, oneMin: data.countdown }));
      });

      socketRef.current.on('updateCountdown_threeMinTimer', (data) => {
        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, threeMin: data.countdown }));
      });

      socketRef.current.on('updateCountdown_fiveMinTimer', (data) => {
        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, fiveMin: data.countdown }));
      });

      setDefaultCountdown('thirtySec');
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  // console.log(socketRef.current);

  const fetchCountdown = (timerName) => {

    setSelectedCountdown(timerName);

    socketRef.current.emit('fetchCountdown', timerName);
  };

  // console.log(countdowns);

  return (
    <View>
      <View style={{
        marginTop: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 5,
        borderRadius: 10
      }}>
        <View style={{ marginHorizontal: 8, }}>
          <TouchableOpacity style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5
          }} onPress={() => fetchCountdown('thirtySec')}>
            <Image source={require('../../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>30 sec</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 8, }}>
          <TouchableOpacity style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5
          }} onPress={() => fetchCountdown('oneMin')}>
            <Image source={require('../../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>1 Min</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 8, }}>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5
            }} onPress={() => fetchCountdown('threeMin')}>
            <Image source={require('../../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>3 Min</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 8, }}>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5
            }}
            onPress={() => fetchCountdown('fiveMin')}>
            <Image source={require('../../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>5 Min</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', textAlign: 'center', marginVertical: 20 }}>
          {`${selectedCountdown} Countdown: ${countdowns[selectedCountdown]} seconds`}
        </Text></View>
      <Text style={{ textAlign: 'center' }}>Serial Number : 121 </Text>
    </View>
  );
};

export default CountdownComponent;


