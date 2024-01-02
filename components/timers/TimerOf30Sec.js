import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import io from 'socket.io-client';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen';
const CountdownComponent = () => {
  const [countdowns, setCountdowns] = useState({
    thirtySec: 0,
    oneMin: 0,
    threeMin: 0,
    fiveMin: 0,
  });
  const [selectedCountdown, setSelectedCountdown] = useState('thirtySec');
  const [defaultCountdown, setDefaultCountdown] = useState('thirtySec');
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [selectedTime, setSelectedTime] = useState('1')

  const socketRef = useRef(null);



  useEffect(() => {

    // Establish socket connection only if it doesn't exist

    if (!socketRef.current) {
      socketRef.current = io(`${process.env.SOCKETURL}`);


      // setSelectedCountdown('thirtySec')

      // console.log(socketRef.current);
      // Replace 'http://your-server-address' with your actual server address
      socketRef.current.on('updateCountdown_thirtySecTimer', (data) => {
        console.log('Received updateCountdown_thirtySecTimer event:', data);
        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;
        if (data.countdown <= 5 && selectedCountdown == 'thirtySec') {
          setShowModal1(true)
        }
        if (data.countdown == 0 && selectedCountdown == 'thirtySec') {
          setShowModal1(false)
          onTimerFinish();
        }

        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, thirtySec: { minutes, seconds } }));
      });

      socketRef.current.on('updateCountdown_oneMinTimer', (data) => {
        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;
        if (data.countdown <= 5) {
          setShowModal2(true)
        }
        if (data.countdown == 0) {
          setShowModal2(false)
        }
        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, oneMin: { minutes, seconds } }));
      });

      socketRef.current.on('updateCountdown_threeMinTimer', (data) => {
        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;
        if (data.countdown <= 5) {
          setShowModal3(true)
        }
        if (data.countdown == 0) {
          setShowModal3(false)
        }
        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, threeMin: { minutes, seconds } }));
      });
      socketRef.current.on('updateCountdown_fiveMinTimer', (data) => {

        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;
        if (data.countdown <= 5) {
          setShowModal4(true)
        }

        if (data.countdown == 0) {
          setShowModal4(false)
        }
        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, fiveMin: { minutes, seconds } }));
      });
      setDefaultCountdown('thirtySec');
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);


  const fetchCountdown = (timerName, x) => {
    setSelectedCountdown(timerName);
    setShowModal1(false)
    setSelectedTime(x)
    socketRef.current.emit('fetchCountdown', timerName);

  };

  return (
    <View>
      <View style={{
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 5,
        borderRadius: 10
      }}>
        <View style={{ marginHorizontal: 8, backgroundColor: selectedTime == 1 ? 'red' : 'white', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
          <TouchableOpacity style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5
          }} onPress={() => fetchCountdown('thirtySec', "1")}>
            <Image source={require('../../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: selectedTime == 1 ? 'white' : 'black' }}>30 sec</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 8, backgroundColor: selectedTime == 2 ? 'red' : 'white', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
          <TouchableOpacity style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5
          }} onPress={() => fetchCountdown('oneMin', "2")}>
            <Image source={require('../../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: selectedTime == 2 ? 'white' : 'black' }}>1 Min</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 8, backgroundColor: selectedTime == 3 ? 'red' : 'white', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5
            }} onPress={() => fetchCountdown('threeMin', "3")}>
            <Image source={require('../../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: selectedTime == 3 ? 'white' : 'black' }}>3 Min</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 8, backgroundColor: selectedTime == 4 ? 'red' : 'white', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5
            }}
            onPress={() => fetchCountdown('fiveMin', "4")}>
            <Image source={require('../../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: selectedTime == 4 ? 'white' : 'black' }}>5 Min</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: SCREEN_HEIGHT * 0.14, width: SCREEN_WIDTH * 0.9, backgroundColor: 'purple', marginVertical: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }}>Time Remaining ...</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginVertical: 20 }}>
          {`${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} `}
        </Text>

      </View>

      <Modal visible={showModal1 && selectedCountdown == 'thirtySec'} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#CBC3E3', padding: 70, borderRadius: 10, borderRadius: 10, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/stopwatch.png')} style={{ height: 130, width: 130 }} />
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: 'black  ' }}>
              {showModal1 ? `${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} s` : null}
            </Text>

          </View>
        </View>
      </Modal>

      <Modal visible={showModal2 && selectedCountdown == 'oneMin'} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 70, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {showModal2 ? `${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} s` : null}
            </Text>

          </View>
        </View>
      </Modal>

      <Modal visible={showModal3 && selectedCountdown == 'threeMin'} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 70, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {showModal3 ? `${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} s` : null}
            </Text>

          </View>
        </View>
      </Modal>

      <Modal visible={showModal4 && selectedCountdown == 'fiveMin'} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#CBC3E3', padding: 70, borderRadius: 10, borderColor: 'black', borderWidth: 1, }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {showModal4 ? `${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} s` : null}
            </Text>

          </View>
        </View>
      </Modal>





    </View>
  );
};
export default CountdownComponent;







