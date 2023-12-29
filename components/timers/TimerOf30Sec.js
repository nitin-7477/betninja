import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
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
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [selectedTime, setSelectedTime] = useState('1')

  const socketRef = useRef(null);



  useEffect(() => {
    // Establish socket connection only if it doesn't exist
    if (!socketRef.current) {
      socketRef.current = io("https://24c9-2409-40c4-ea-b867-1ce4-647f-42ab-f091.ngrok-free.app");

      // setSelectedCountdown('thirtySec')

      // console.log(socketRef.current);
      // Replace 'http://your-server-address' with your actual server address
      socketRef.current.on('updateCountdown_thirtySecTimer', (data) => {
        console.log('Received updateCountdown_thirtySecTimer event:', data);
        // console.log("IN 30 seczzzzzzzzzzzzzzzzzzzzzzzz", selectedCountdown);
        if (data.countdown <= 5 && selectedCountdown == 'thirtySec') {
          setShowModal1(true)
        }
        if (data.countdown == 0 && selectedCountdown == 'thirtySec') {
          setShowModal1(false)
        }

        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, thirtySec: data.countdown }));
      });
      socketRef.current.on('updateCountdown_oneMinTimer', (data) => {
        // console.log("IN ONE MINUTEaaaaaaaaaaaaaaaaaaaaaaaaaa", data.countdown);
        // console.log("IN ONE MINUTEaaaaaaaaaaaaaaaaaaaaaaaaaa", selectedCountdown);
        if (data.countdown <= 5) {
          setShowModal2(true)
        }
        if (data.countdown == 0) {
          setShowModal2(false)
        }
        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, oneMin: data.countdown }));
      });
      socketRef.current.on('updateCountdown_threeMinTimer', (data) => {
        if (data.countdown <= 5) {
          setShowModal3(true)
        }
        if (data.countdown == 0) {
          setShowModal3(false)
        }
        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, threeMin: data.countdown }));
      });
      socketRef.current.on('updateCountdown_fiveMinTimer', (data) => {
        if (data.countdown <= 5) {
          setShowModal4(true)
        }

        if (data.countdown == 0) {
          setShowModal4(false)
        }
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
  // console.log(showModal1);
  // console.log("zzzzzzzzzzzz", selectedCountdown);
  // console.log(socketRef.current);

  const fetchCountdown = (timerName, x) => {
    setSelectedCountdown(timerName);
    setShowModal1(false)
    setSelectedTime(x)
    socketRef.current.emit('fetchCountdown', timerName);

  };
  // console.log(countdowns);
  console.log("Start thirty sec xxxxxxxx", showModal1 && selectedCountdown == 'thirtySec');
  console.log("Start One Min yyyyyyy", selectedCountdown == 'oneMin');
  console.log("Start three Min zzzzzzzzzzzzzz", showModal3 && selectedCountdown == 'threeMin');
  console.log("Start five Min qqqqqqqqqqqqq", showModal4 && selectedCountdown == 'fiveMin');
  console.log(countdowns[selectedCountdown])

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
          }} onPress={() => fetchCountdown('thirtySec', "1")}>
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
          }} onPress={() => fetchCountdown('oneMin', "2")}>
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
            }} onPress={() => fetchCountdown('threeMin', "3")}>
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
            onPress={() => fetchCountdown('fiveMin', "4")}>
            <Image source={require('../../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>5 Min</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', textAlign: 'center', marginVertical: 20 }}>
          {`${selectedCountdown} Countdown: ${countdowns[selectedCountdown]} seconds`}
        </Text></View>
      {/* <Text style={{ textAlign: 'center' }}>Serial Number : 121 </Text> */}
      {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedTime}</Text> */}

      <Modal visible={showModal1 && selectedCountdown == 'thirtySec'} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 70, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {showModal1 ? `${selectedCountdown} Countdown: ${countdowns[selectedCountdown]}` : null}
            </Text>

          </View>
        </View>
      </Modal>

      <Modal visible={showModal2 && selectedCountdown == 'oneMin'} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 70, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {showModal2 ? `${selectedCountdown} Countdown: ${countdowns[selectedCountdown]}` : null}
            </Text>

          </View>
        </View>
      </Modal>

      <Modal visible={showModal3 && selectedCountdown == 'threeMin'} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 70, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {showModal3 ? `${selectedCountdown} Countdown: ${countdowns[selectedCountdown]}` : null}
            </Text>

          </View>
        </View>
      </Modal>

      <Modal visible={showModal4 && selectedCountdown == 'fiveMin'} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 70, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {showModal4 ? `${selectedCountdown} Countdown: ${countdowns[selectedCountdown]}` : null}
            </Text>

          </View>
        </View>
      </Modal>





    </View>
  );
};
export default CountdownComponent;







