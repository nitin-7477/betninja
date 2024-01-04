import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import MyHistoryScreen from '../components/GameScreen/MyHistoryScreen';
import ThirtySecBetModal from '../components/allPopUp/30SecBetModal';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from 'socket.io-client';


const HomeScreen = ({ navigation }) => {

  const [gameHistory, setGameHistory] = useState(true)
  const [myHistory, setMyHistory] = useState(false)

  const [bigModalVisible, setBigModalVisible] = useState(false)
  const [selectType, setSelectType] = useState(null)
  const [select, setSelect] = useState(null)
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState(null);
  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});
  const [ln1, setln1] = useState(0)
  const [ln2, setln2] = useState(0)
  const [ln3, setln3] = useState(0)
  const [ln4, setln4] = useState(0)
  const [loading1, setLoading1] = useState(false);





  const [selectedCountdown, setSelectedCountdown] = useState('thirtySec');
  const [defaultCountdown, setDefaultCountdown] = useState('thirtySec');
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [selectedTime, setSelectedTime] = useState('1')
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;
  const [apiData1, setApiData1] = useState([]);
  const [apiData2, setApiData2] = useState([]);
  const [apiData3, setApiData3] = useState([]);
  const [apiData4, setApiData4] = useState([]);
  // *****************This is for timer and socket*********************

  const [timerFinished, setTimerFinished] = useState(false);
  const [countdowns, setCountdowns] = useState({
    thirtySec: 0,
    oneMin: 0,
    threeMin: 0,
    fiveMin: 0,
  });

  const socketRef = useRef(null);







  const displayData1 = apiData1?.data || [];
  const displayData2 = apiData2?.data || [];
  const displayData3 = apiData3?.data || [];
  const displayData4 = apiData4?.data || [];


  const colorImageMapping = {

    red: require('../assets/reddot.png'),
    yellow: require('../assets/yellowdot.png'),
    green: require('../assets/greendot.png')

  };


  // const totalPages = Math.ceil(displayData.length / itemsPerPage);

  const onNextPress = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, (totalPages - 1) * itemsPerPage));
  };

  const onPrevPress = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };





  useEffect(() => {

    if (!socketRef.current) {
      socketRef.current = io(`${process.env.SOCKETURL}`);

      // console.log(process.env.SOCKETURL);


      const fetchGameHistoryData = async (trial) => {


        try {
          setLoading1(true);

          switch (trial) {
            case 30:
              const response1 = await axios.get(`${process.env.SERVERURL}/api/random/30secLottary`)

              setApiData1(response1.data);
              break;

            case 60:
              const response2 = await axios.get(`${process.env.SERVERURL}/api/random/1minLottary`)

              setApiData2(response2.data);
              break;
            case 180:
              const response3 = await axios.get(`${process.env.SERVERURL}/api/random/3minLottary`)

              setApiData3(response3.data);
              break;
            case 300:
              const response4 = await axios.get(`${process.env.SERVERURL}/api/random/5minLottary`)

              setApiData4(response4.data);
              break;

          }

        }
        catch (error) {
          console.error('Error fetching data in game history:', error);
        }
        finally {
          setLoading1(false)
        }
      };


      const getLotteryNumber = async (trial) => {
        try {

          switch (trial) {
            case 30:
              const response1 = await axios.get(`${process.env.SERVERURL}/api/random/30secLottaryLatest`)

              setln1(response1.data.data.LN + 1)
              break;

            case 60:
              const response2 = await axios.get(`${process.env.SERVERURL}/api/random/1minLottaryLatest`)

              setln2(response2.data.data.LN + 1)
              break;
            case 180:
              const response3 = await axios.get(`${process.env.SERVERURL}/api/random/3minLottaryLatest`)

              setln3(response3.data.data.LN + 1)
              break;
            case 300:
              const response4 = await axios.get(`${process.env.SERVERURL}/api/random/5minLottaryLatest`)

              setln4(response4.data.data.LN + 1)
              break;

          }

        }
        catch (e) {
          console.log("Error while getting lottery Number", e);

        }
      }
      if (ln1 == 0 && ln2 == 0 && ln3 == 0 && ln4 == 0) {
        getLotteryNumber(30)
        getLotteryNumber(60)
        getLotteryNumber(180)
        getLotteryNumber(300)

      }
      if (apiData1.length == 0 && apiData2.length == 0 && apiData3.length == 0 && apiData4.length == 0) {
        fetchGameHistoryData(30)
        fetchGameHistoryData(60)
        fetchGameHistoryData(180)
        fetchGameHistoryData(300)

      }

      socketRef.current.on('updateCountdown_thirtySecTimer', (data) => {

        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;
        if (data.countdown == 29) {

          getLotteryNumber(30)
          fetchGameHistoryData(30)
        }

        if (data.countdown <= 5) {
          setShowModal1(true)
        }

        if (data.countdown == 0) {
          setShowModal1(false)

        }

        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, thirtySec: { minutes, seconds } }));
      });

      socketRef.current.on('updateCountdown_oneMinTimer', (data) => {
        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;
        if (data.countdown == 59) {
          getLotteryNumber(60)
          fetchGameHistoryData(60)
        }

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
        if (data.countdown == 179) {
          getLotteryNumber(180)
          fetchGameHistoryData(180)
        }
        if (data.countdown <= 5) {
          setShowModal3(true)
        }
        if (data.countdown == 0) {
          setShowModal3(false)

        }

        setCountdowns((prevCountdowns) => ({ ...prevCountdowns, threeMin: { minutes, seconds } }));
      });
      socketRef.current.on('updateCountdown_fiveMinTimer', (data) => {
        if (data.countdown == 299) {
          getLotteryNumber(300)
          fetchGameHistoryData(300)
        }
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


  useEffect(() => {
    fetchData();
  }, [])








  const fetchData = async () => {
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
      setUserInformation(response.data);
      await AsyncStorage.setItem('email', response.data.email);
      await AsyncStorage.setItem('phone', response.data.phone);
      await AsyncStorage.setItem('username', response.data.username);
      await AsyncStorage.setItem('uid', response.data.uid);
      await AsyncStorage.setItem('inviteCode', response.data.inviteCode);
    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    }
  };
  // console.log("xxxxxxxxxxxxxxxxxxx", userInformation);



  const openBigModal = (backgroundColor, selectType, select) => {

    setButtonBackgroundColor(backgroundColor);
    setSelectType(selectType)
    setSelect(select)
    setBigModalVisible(true);
  };

  const closeBigModal = () => {
    setBigModalVisible(false);
  };




  const handleGameHistory = () => {
    setGameHistory(true)
    setMyHistory(false)
  }
  const handleMyHistory = () => {
    setMyHistory(true)
    setGameHistory(false)
  }

  const toggleMyHistory = () => {
    setMyHistory(!myHistory);
  };

  // Callback function to refresh MyHistoryScreen
  const refreshMyHistory = () => {
    // You can add additional logic here if needed
    toggleMyHistory();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>

        <Image source={require('../image/1.jpg')} style={styles.logo} />
      </View>


      <View style={styles.balanceView}>
        <View style={styles.balanceContainer}>
          <Text style={{ fontWeight: 'bold' }}>Balance: {userInformation?.wallet?.toFixed(2)}</Text>
          <TouchableOpacity onPress={fetchData}>
            <AntDesign name="reload1" size={20} color="blue" style={styles.refreshIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.withdrowBtn}
            onPress={() => navigation.navigate('WithdrawScreen')}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>WithDraw</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpacing} />
          <TouchableOpacity
            style={styles.depositeBtn}
            onPress={() => navigation.navigate("DepositeScreen")}
          ><Text style={{ fontWeight: 'bold', color: 'white', }}>Deposite</Text></TouchableOpacity>
        </View>
      </View>



      <View>
        <View style={{
          marginTop: 15,
          flexDirection: 'row',
          backgroundColor: 'white',
          shadowColor: 'black',
          elevation: 5,
          borderRadius: 10
        }}>
          <View style={{ marginHorizontal: 8, backgroundColor: selectedTime == 1 ? '#fbaed2' : 'white', borderTopStartRadius: 10, borderTopEndRadius: 10, borderWidth: selectedTime == 1 ? 0.5 : 0 }}>
            <TouchableOpacity style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5
            }} onPress={() => fetchCountdown('thirtySec', "1")}>
              <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
              <Text style={{ fontWeight: 'bold', color: selectedTime == 1 ? 'red' : 'black' }}>30 sec</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 8, backgroundColor: selectedTime == 2 ? '#fbaed2' : 'white', borderTopStartRadius: 10, borderTopEndRadius: 10, borderWidth: selectedTime == 2 ? 0.5 : 0 }}>
            <TouchableOpacity style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5
            }} onPress={() => fetchCountdown('oneMin', "2")}>
              <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
              <Text style={{ fontWeight: 'bold', color: selectedTime == 2 ? 'red' : 'black' }}>1 Min</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 8, backgroundColor: selectedTime == 3 ? '#fbaed2' : 'white', borderTopStartRadius: 10, borderTopEndRadius: 10, borderWidth: selectedTime == 3 ? 0.5 : 0 }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5
              }} onPress={() => fetchCountdown('threeMin', "3")}>
              <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
              <Text style={{ fontWeight: 'bold', color: selectedTime == 3 ? 'red' : 'black' }}>3 Min</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 8, backgroundColor: selectedTime == 4 ? '#fbaed2' : 'white', borderTopStartRadius: 10, borderTopEndRadius: 10, borderWidth: selectedTime == 4 ? 0.5 : 0 }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5
              }}
              onPress={() => fetchCountdown('fiveMin', "4")}>
              <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
              <Text style={{ fontWeight: 'bold', color: selectedTime == 4 ? 'red' : 'black' }}>5 Min</Text>
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
              <Image source={require('../assets/stopwatch.png')} style={{ height: 130, width: 130 }} />
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>
                {showModal1 ? `${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} s` : null}
              </Text>

            </View>
          </View>
        </Modal>

        <Modal visible={showModal2 && selectedCountdown == 'oneMin'} animationType="slide" transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#CBC3E3', padding: 70, borderRadius: 10, borderRadius: 10, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/stopwatch.png')} style={{ height: 130, width: 130 }} />
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>
                {showModal2 ? `${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} s` : null}
              </Text>

            </View>
          </View>
        </Modal>


        <Modal visible={showModal3 && selectedCountdown == 'threeMin'} animationType="slide" transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#CBC3E3', padding: 70, borderRadius: 10, borderRadius: 10, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/stopwatch.png')} style={{ height: 130, width: 130 }} />
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>
                {showModal3 ? `${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} s` : null}
              </Text>

            </View>
          </View>
        </Modal>

        <Modal visible={showModal4 && selectedCountdown == 'fiveMin'} animationType="slide" transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#CBC3E3', padding: 70, borderRadius: 10, borderRadius: 10, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/stopwatch.png')} style={{ height: 130, width: 130 }} />
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>
                {showModal4 ? `${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} s` : null}
              </Text>

            </View>
          </View>
        </Modal>





      </View>

      <View style={{ height: 55, width: '90%', alignSelf: 'center', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Upcoming : <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, }}>
          {selectedCountdown == 'thirtySec' ? ln1 : selectedCountdown == 'oneMin' ? ln2 : selectedCountdown == 'threeMin' ? ln3 : selectedCountdown == 'fiveMin' ? ln4 : 0}
        </Text></Text>

      </View>

      {/* 

        <Text style={{ fontWeight: '900', fontSize: 18, marginVertical: 10, color: 'black' }}>Prediction Options:</Text> */}
      <View style={styles.buttonRow}>
        {/* *********************** This is the bet modal ********************/}

        <ThirtySecBetModal isVisible={bigModalVisible} closeModal={closeBigModal} selectType={selectType} select={select}
          backgroundColor={buttonBackgroundColor}
          ln={selectedCountdown == 'thirtySec' ? ln1 : selectedCountdown == 'oneMin' ? ln2 : selectedCountdown == 'threeMin' ? ln3 : selectedCountdown == 'fiveMin' ? ln4 : 0}
          selectedCountdown={selectedCountdown} refreshMyHistory={refreshMyHistory} />

        {/* *********************** This is the bet modal ********************/}

        <TouchableOpacity
          onPress={() => openBigModal('#ffa343', 'size', 'big')}
          style={styles.bigButton}>
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Big</Text>
        </TouchableOpacity>
        {/* <View style={styles.buttonSpacing} /> */}

        <TouchableOpacity
          style={styles.smallBtn}
          onPress={() => openBigModal('skyblue', 'size', 'small')}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Small</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10 }}></View>
      <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.94, justifyContent: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 5 }}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '0')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '1')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '2')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '3')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '4')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>4</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '5')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '6')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '7')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '8')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openBigModal('#89CFF0', 'number', '9')}
            style={[styles.numberBtn, { backgroundColor: 'blue' }]}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>9</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginVertical: 20 }}></View>
      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.redBtn}
          onPress={() => openBigModal('#FFA07A', 'color', 'red')}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Red</Text>
        </TouchableOpacity>




        {/* *************************************************************** */}

        <TouchableOpacity
          style={styles.violetBtn}
          onPress={() => openBigModal('#D8BFD8', 'color', 'yellow')}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Yellow</Text>
        </TouchableOpacity>
        {/* *********************************************************************** */}



        <TouchableOpacity
          style={styles.greenBtn}
          onPress={() => openBigModal('#90EE90', 'color', 'green')}
        >

          <Text style={{ fontWeight: 'bold', color: 'white', }}>Green</Text>
        </TouchableOpacity>

        <View style={styles.buttonSpacing} />
      </View>
      <View style={{ marginVertical: 20 }}></View>
      <View style={styles.horizontalButtonContainer}>

        <Button
          title="Game History"
          onPress={handleGameHistory}
        />

        <View style={styles.buttonSpacing} />
        <Button title="Chart"

        />
        <View style={styles.buttonSpacing} />
        <Button
          title="My History"
          onPress={handleMyHistory}
        />
      </View>

      {/* ///////////////////////////////////////// Game History View */}

      {
        gameHistory && !timerFinished ? <>
          <View style={{ display: 'flex', flexDirection: 'row', width: SCREEN_WIDTH * 0.9, marginTop: 20, height: 45, backgroundColor: '#d9ad82', paddingVertical: 10, borderTopEndRadius: 10, paddingHorizontal: 5, borderTopStartRadius: 10 }}>

            <View style={{ width: SCREEN_WIDTH * 0.25, }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', }}>Peroid</Text></View>
            <View style={{ width: SCREEN_WIDTH * 0.17, alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Number</Text></View>
            <View style={{ width: SCREEN_WIDTH * 0.3, alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Big Small</Text></View>
            <View ><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Color</Text></View>
          </View>

          <FlatList
            // data={displayData.slice(startIndex, startIndex + itemsPerPage)}
            data={selectedCountdown == 'thirtySec' ? displayData1.slice(startIndex, startIndex + itemsPerPage) : selectedCountdown == 'oneMin' ? displayData2.slice(startIndex, startIndex + itemsPerPage) : selectedCountdown == 'threeMin' ? displayData3.slice(startIndex, startIndex + itemsPerPage) : selectedCountdown == 'fiveMin' ? displayData4.slice(startIndex, startIndex + itemsPerPage) : []}
            renderItem={({ item }) => {
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

          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            width: '90%', marginVertical: 20
          }}>
            <Button title="Prev" onPress={onPrevPress} disabled={startIndex === 0} />
            {/* <Text style={styles.pageIndicator}>{`Page ${Math.ceil((startIndex + 1) / itemsPerPage)} of ${totalPages}`}</Text> */}

            <Button title="Next" onPress={onNextPress} disabled={startIndex + itemsPerPage >= displayData1.length} />
          </View>
        </> : <></>
      }

      {/*////////////////////////////////////// Myhistory Screen Flatlist Data */}
      {
        myHistory ? <MyHistoryScreen selectedCountdown={selectedCountdown} /> : (<></>)
      }




    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.9
  },
  logo: {
    width: 150,
    height: 50,
    marginLeft: 60
  },
  refreshIcon: {
    marginLeft: 20,
  },
  balanceView: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.15,
    backgroundColor: '#F3CFC6', display: 'flex',
    justifyContent: 'center', alignItems: 'center',
    marginTop: 4, borderRadius: 10
  },
  balanceContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  withdrowBtn: {
    backgroundColor: '#FFAA33',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10
  },
  depositeBtn: {
    backgroundColor: '#7B3F00',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10
  },
  rapidBtn: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10, marginTop: 10
  },
  clockBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  redBtn: {
    backgroundColor: 'red',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: 10,
    marginTop: 10,
    marginLeft: 35,
    marginHorizontal: 3,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10

  },
  violetBtn: {
    backgroundColor: 'orange',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: 10,
    borderRadius: 10, marginTop: 10,
  },
  greenBtn: {
    backgroundColor: 'green',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: 10,
    marginTop: 10,
    marginHorizontal: 3,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10

  },

  buttonSpacing: {
    width: 30,
  },
  bigButton: {
    backgroundColor: '#FFAA33',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.4,
    paddingVertical: 10,
    borderTopStartRadius: 10, borderBottomStartRadius: 10, marginTop: 10,
    borderRightColor: 'grey', borderRightWidth: 1

  },
  smallBtn: {
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.4,
    paddingVertical: 10,
    borderTopEndRadius: 10, borderBottomEndRadius: 10, marginTop: 10,
  },
  numberBtn: {

    alignItems: 'center',
    width: SCREEN_WIDTH * 0.1,
    paddingVertical: 8,
    borderRadius: 50, marginTop: 10,
    marginLeft: 10,
    marginHorizontal: 3,
    elevation: 5,
    shadowColor: 'red'
  },
  gameContainer: {
    marginTop: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 5,
    borderRadius: 10
  },

  gameButton: {
    marginHorizontal: 8,
  },
  gameInfo: {
    marginTop: 30,
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',

  },
  buttonMargin: {
    marginHorizontal: 5,
  },
  modalContainer: {
    height: SCREEN_HEIGHT * 0.5,
    width: SCREEN_WIDTH * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 100,

  },
  modalText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  closeModalText: {
    fontSize: 16,
    color: '#fff',
  },

});

export default HomeScreen;
