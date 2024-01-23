import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity, Modal, FlatList, ActivityIndicator, RefreshControl, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import ThirtySecBetModal from '../components/allPopUp/30SecBetModal';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from 'socket.io-client';
import { Colors } from '../components/Constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const HomeScreen = ({ navigation, index }) => {

  const route = useRoute();

  const [userInformation, setUserInformation] = useState({});

  const [myHistoryThirtySec, setMyHistoryThirtySec] = useState([]);
  const [myHistoryOneMin, setMyHistoryOneMin] = useState([]);
  const [myHistoryThreeMin, setMyHistoryThreeMin] = useState([]);
  const [myHistoryFiveMin, setMyHistoryFiveMin] = useState([]);

  const [gameHistoryThirtySec, setGameHistoryThirtySec] = useState([]);
  const [gameHistoryOneMin, setGameHistoryOneMin] = useState([]);
  const [gameHistoryThreeMin, setGameHistoryThreeMin] = useState([]);
  const [gameHistoryFiveMin, setGameHistoryFiveMin] = useState([]);

  const [popWinThirtySec, setPopWinThirtySec] = useState(false);
  const [popWinOneMin, setPopWinOneMin] = useState(false);
  const [popWinThreeMin, setPopWinThreeMin] = useState(false);
  const [popWinFiveMin, setPopWinFiveMin] = useState(false);

  const [popLoseThirtySec, setPopLoseThirtySec] = useState(false);
  const [popLoseOneMin, setPopLoseOneMin] = useState(false);
  const [popLoseThreeMin, setPopLoseThreeMin] = useState(false);
  const [popLoseFiveMin, setPopLoseFiveMin] = useState(false);

  const [selectedCountdown, setSelectedCountdown] = useState('thirtySec');

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState()
  const [startIndex, setStartIndex] = useState(0);
  const [startedIndexOfMyHistory, setStartedIndexOfMyHistory] = useState(0)
  const [gameHistory, setGameHistory] = useState(true)
  const [myHistory, setMyHistory] = useState(false)
  const [bigModalVisible, setBigModalVisible] = useState(false)
  const [selectType, setSelectType] = useState(null)
  const [select, setSelect] = useState(null)
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const socketRef = useRef(null);
  const itemsPerPage = 10;
  const [timerFinished, setTimerFinished] = useState(false);
  const [countdowns, setCountdowns] = useState({
    thirtySec: 0,
    oneMin: 0,
    threeMin: 0,
    fiveMin: 0,
  });


  const gameHistorylength = selectedCountdown === 'thirtySec' ? gameHistoryThirtySec.length : selectedCountdown === 'oneMin' ? gameHistoryOneMin.length : selectedCountdown === 'threeMin' ? gameHistoryThreeMin.length : selectedCountdown === 'fiveMin' ? gameHistoryFiveMin.length : 0

  const myHistorylength = selectedCountdown === 'thirtySec' ? myHistoryThirtySec.length : selectedCountdown === 'oneMin' ? myHistoryOneMin.length : selectedCountdown === 'threeMin' ? myHistoryThreeMin.length : selectedCountdown === 'fiveMin' ? myHistoryFiveMin.length : 0



  // *****************This is for timer and socket*********************



  useEffect(() => {

    if (route.params == 0) {
      setSelectedCountdown('thirtySec')
      setSelectedTime(1)
    }
    else if (route.params == 1) {
      setSelectedCountdown('oneMin')
      setSelectedTime(2)
    }
    else if (route.params == 2) {
      setSelectedCountdown('threeMin')
      setSelectedTime(3)
    }
    else if (route.params == 3) {
      setSelectedCountdown('fiveMin')
      setSelectedTime(4)
    }
    else {
      setSelectedCountdown('thirtySec')
      setSelectedTime(1)
    }


  }, [])






  const imageMapping = {
    big: require('../assets/big.png'),
    small: require('../assets/small.png'),
    yellow: require('../assets/yellowdot.png'),
    red: require('../assets/reddot.png'),
    green: require('../assets/greendot.png'),
    0: require('../assets/0.png'),
    1: require('../assets/1.png'),
    2: require('../assets/2.png'),
    3: require('../assets/3.png'),
    4: require('../assets/4.png'),
    5: require('../assets/5.png'),
    6: require('../assets/6.png'),
    7: require('../assets/7.png'),
    8: require('../assets/8.png'),
    9: require('../assets/9.png'),

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
          alignSelf: 'center',
        }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 20 }}>
            <Image source={imageMapping[item.select]} style={{ height: 40, width: 40, borderRadius: 5, resizeMode: 'contain' }} />
          </View>
          <View>
            <Text style={{ color: 'black' }}>{item.LN}</Text>
            <Text style={{ color: 'black' }}>
              {new Date(item.updatedAt).toLocaleString()}
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
            {item.win_loss > 0 ? '+' : ''} ₹{item.win_loss}
          </Text>


        </View>
      </Pressable>
      {expandedIndex === index ? (
        <View style={{ marginTop: 5 }}>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Order No.</Text>
            <Text style={{ color: 'black' }}>{item.orderNumber}</Text>
          </View>
          {/* Add more details as needed */}
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Lottery No.</Text>
            <Text style={{ color: 'black' }}>{item.LN}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Purchase Amount</Text>
            <Text style={{ color: 'black' }}>₹{item.phrchaseAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Amount after tax</Text>
            <Text style={{ color: 'black' }}>₹{item.amountAfterTax.toFixed(2)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Tax</Text>
            <Text style={{ color: 'black' }}>₹{item.tax.toFixed(2)}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Result</Text>
            <Text style={{ color: 'black' }}>{item.result.number} {item.result.color} {item.result.size} </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Select</Text>
            <Text style={{ color: 'black' }}>{item.select}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Select Type</Text>
            <Text style={{ color: 'black' }}>{item.selectType}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Status</Text>
            <Text style={{ color: 'black' }}>{item.status}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Win/Loss</Text>
            <Text style={{ color: 'black' }}>₹{item.win_loss}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );



  const totalPages = Math.ceil(gameHistorylength / itemsPerPage);

  const onNextPress = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, (totalPages - 1) * itemsPerPage));
  };

  const onPrevPress = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const totalPagesofMyHistory = Math.ceil(myHistorylength / itemsPerPage);

  const onNextPressOfMyHistory = () => {
    setStartedIndexOfMyHistory((prev) => Math.min(prev + itemsPerPage, (totalPagesofMyHistory - 1) * itemsPerPage));
  };

  const onPrevPressOfMyHistory = () => {
    setStartedIndexOfMyHistory((prev) => Math.max(0, prev - itemsPerPage));
  };


  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData()
    thirtySecGameHistory()
    oneMinGameHistory()
    threeMinGameHistory()
    fiveMinGameHistory()
    

  };





  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`${process.env.SOCKETURL}`);

      socketRef.current.on('updateCountdown_thirtySecTimer', data => {
        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;



        setCountdowns(prevCountdowns => ({
          ...prevCountdowns,
          thirtySec: { minutes, seconds },
        }));

        if (data.countdown == 30) {
          thirtySecGameHistory();
        }
        if (data.countdown == 25) {
          setPopWinThirtySec(false)
          setPopLoseThirtySec(false)
        }
        if (data.countdown <= 5) {
          setShowModal1(true)
        }
        if (data.countdown == 0) {
          setShowModal1(false)
        }

      });

      socketRef.current.on('updateCountdown_oneMinTimer', data => {
        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;

        setCountdowns(prevCountdowns => ({
          ...prevCountdowns,
          oneMin: { minutes, seconds },
        }));
        if (data.countdown == 60) {
          oneMinGameHistory();
        }
        if (data.countdown == 55) {
          setPopWinOneMin(false)
          setPopLoseOneMin(false)
        }
        if (data.countdown == 5) {
          setShowModal2(true)
        }
        if (data.countdown == 0) {
          setShowModal2(false)
        }

      });

      socketRef.current.on('updateCountdown_threeMinTimer', data => {
        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;
        setCountdowns(prevCountdowns => ({
          ...prevCountdowns,
          threeMin: { minutes, seconds },
        }));
        if (data.countdown == 180) {
          threeMinGameHistory();
        }
        if (data.countdown == 175) {
          setPopWinThreeMin(false)
          setPopLoseThreeMin(false)
        }
        if (data.countdown == 5) {
          setShowModal3(true)
        }
        if (data.countdown == 0) {
          setShowModal3(false)
        }
      });

      socketRef.current.on('updateCountdown_fiveMinTimer', data => {
        const minutes = Math.floor(data.countdown / 60);
        const seconds = data.countdown % 60;
        setCountdowns(prevCountdowns => ({
          ...prevCountdowns,
          fiveMin: { minutes, seconds },
        }));
        if (data.countdown == 300) {
          fiveMinGameHistory();
        }
        if (data.countdown == 295) {
          setPopWinFiveMin(false)
          setPopLoseFiveMin(false)
        }
        if (data.countdown == 5) {
          setShowModal4(true)
        }
        if (data.countdown == 0) {
          setShowModal4(false)
        }
      });
    }
    return () => {
      if (socketRef.current) {
        // on socket disconnect make popup value to false
        socketRef.current.disconnect();
      }
    };
  }, []);

  // console.log("hello")
  // console.log(selectedCountdown);

  const thirtySecGameHistory = async () => {
    try {


      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }
      const user = await axios.get(
        `${process.env.SERVERURL}/api/auth/user`,
        { headers: { Authorization: JSON.parse(token), } },
      );
      await AsyncStorage.setItem('email', user.data.email);
      await AsyncStorage.setItem('phone', user.data.phone);
      await AsyncStorage.setItem('username', user.data.username);
      await AsyncStorage.setItem('uid', user.data.uid);
      await AsyncStorage.setItem('inviteCode', user.data.inviteCode);
      setUserInformation(user.data);

      const gameHistory = await axios.get(
        `${process.env.SERVERURL}/api/random/30secLottary`
      );

      setGameHistoryThirtySec(gameHistory.data.data)

      // console.log(gameHistory.data.data)
      const myHistory = await axios.get(
        `${process.env.SERVERURL}/api/bet/30secbet`,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        },
      );
      setMyHistoryThirtySec(myHistory.data.thirtyBetOfUser)

      if (myHistory?.data?.thirtyBetOfUser[0]?.LN == gameHistory?.data?.data[0]?.LN && myHistory?.data?.thirtyBetOfUser[0]?.status == "success") {
        console.log(countdowns);
        setPopWinThirtySec(true)

      }
      if (myHistory?.data?.thirtyBetOfUser[0]?.LN == gameHistory?.data?.data[0]?.LN && myHistory?.data?.thirtyBetOfUser[0]?.status == "failed") {
        setPopLoseThirtySec(true)

      }
    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const oneMinGameHistory = async () => {
    try {

      // token fetch 
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }
      const user = await axios.get(
        `${process.env.SERVERURL}/api/auth/user`,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        },
      );
      await AsyncStorage.setItem('email', user.data.email);
      await AsyncStorage.setItem('phone', user.data.phone);
      await AsyncStorage.setItem('username', user.data.username);
      await AsyncStorage.setItem('uid', user.data.uid);
      await AsyncStorage.setItem('inviteCode', user.data.inviteCode);
      setUserInformation(user.data);

      const gameHistory = await axios.get(
        `${process.env.SERVERURL}/api/random/1minLottary`
      );

      setGameHistoryOneMin(gameHistory.data.data)

      // console.log(gameHistory.data.data)
      const myHistory = await axios.get(
        `${process.env.SERVERURL}/api/bet/1minbet`,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        },
      );
      setMyHistoryOneMin(myHistory.data.oneBetOfUser)



      if (myHistory?.data?.oneBetOfUser[0]?.LN == gameHistory?.data?.data[0]?.LN && myHistory?.data?.oneBetOfUser[0]?.status == "success") {
        setPopWinOneMin(true)
      }
      if (myHistory?.data?.oneBetOfUser[0]?.LN == gameHistory?.data?.data[0]?.LN && myHistory?.data?.oneBetOfUser[0]?.status == "failed") {
        setPopLoseOneMin(true)

      }
    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const threeMinGameHistory = async () => {
    try {
      // token fetch 
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }
      const user = await axios.get(
        `${process.env.SERVERURL}/api/auth/user`,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        },
      );
      await AsyncStorage.setItem('email', user.data.email);
      await AsyncStorage.setItem('phone', user.data.phone);
      await AsyncStorage.setItem('username', user.data.username);
      await AsyncStorage.setItem('uid', user.data.uid);
      await AsyncStorage.setItem('inviteCode', user.data.inviteCode);
      setUserInformation(user.data);

      const gameHistory = await axios.get(
        `${process.env.SERVERURL}/api/random/3minLottary`
      );

      setGameHistoryThreeMin(gameHistory.data.data)

      // console.log(gameHistory.data.data)
      const myHistory = await axios.get(
        `${process.env.SERVERURL}/api/bet/3minbet`,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        },
      );
      setMyHistoryThreeMin(myHistory.data.threeBetOfUser)
      if (myHistory?.data?.threeBetOfUser[0]?.LN == gameHistory?.data?.data[0]?.LN && myHistory?.data?.threeBetOfUser[0]?.status == "success") {
        setPopWinThreeMin(true)

      }
      if (myHistory?.data?.threeBetOfUser[0]?.LN == gameHistory?.data?.data[0]?.LN && myHistory?.data?.threeBetOfUser[0]?.status == "failed") {
        setPopLoseThreeMin(true)

      }
    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fiveMinGameHistory = async () => {
    try {
      // token fetch 
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }
      const user = await axios.get(
        `${process.env.SERVERURL}/api/auth/user`,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        },
      );
      await AsyncStorage.setItem('email', user.data.email);
      await AsyncStorage.setItem('phone', user.data.phone);
      await AsyncStorage.setItem('username', user.data.username);
      await AsyncStorage.setItem('uid', user.data.uid);
      await AsyncStorage.setItem('inviteCode', user.data.inviteCode);
      setUserInformation(user.data);

      const gameHistory = await axios.get(
        `${process.env.SERVERURL}/api/random/5minLottary`
      );

      setGameHistoryFiveMin(gameHistory.data.data)

      // console.log(gameHistory.data.data)
      const myHistory = await axios.get(
        `${process.env.SERVERURL}/api/bet/5minbet`,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        },
      );
      setMyHistoryFiveMin(myHistory.data.fiveBetOfUser)
      if (myHistory?.data?.fiveBetOfUser[0]?.LN == gameHistory?.data?.data[0]?.LN && myHistory?.data?.fiveBetOfUser[0]?.status == "success") {
        setPopWinFiveMin(true)
      }
      if (myHistory?.data?.fiveBetOfUser[0]?.LN == gameHistory?.data?.data[0]?.LN && myHistory?.data?.fiveBetOfUser[0]?.status == "failed") {
        setPopLoseFiveMin(true)

      }
    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    } finally {
      setRefreshing(false);
    }
  };



  const fetchCountdown = (timerName, x) => {
    setSelectedCountdown(timerName);
    setShowModal1(false)
    setSelectedTime(x)
    socketRef.current.emit('fetchCountdown', timerName);

  };


  useEffect(() => {
    oneMinGameHistory();
    thirtySecGameHistory();
    threeMinGameHistory()
    fiveMinGameHistory()
    fetchUserData();

  }, [])







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
      setUserInformation(response.data);
      await AsyncStorage.setItem('email', response.data.email);
      await AsyncStorage.setItem('phone', response.data.phone);
      await AsyncStorage.setItem('username', response.data.username);
      await AsyncStorage.setItem('uid', response.data.uid);
      await AsyncStorage.setItem('inviteCode', response.data.inviteCode);


      if (selectedCountdown == 'thirtySec') {
        const myHistory = await axios.get(
          `${process.env.SERVERURL}/api/bet/30secbet`,
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          },
        );
        setMyHistoryThirtySec(myHistory.data.thirtyBetOfUser)
      }
      if (selectedCountdown == 'oneMin') {
        const myHistory = await axios.get(
          `${process.env.SERVERURL}/api/bet/1minbet`,
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          },
        );
        setMyHistoryOneMin(myHistory.data.oneBetOfUser)
      }
      if (selectedCountdown == 'threeMin') {
        const myHistory = await axios.get(
          `${process.env.SERVERURL}/api/bet/3minbet`,
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          },
        );
        setMyHistoryThreeMin(myHistory.data.threeBetOfUser)
      }
      if (selectedCountdown == 'fiveMin') {
        const myHistory = await axios.get(
          `${process.env.SERVERURL}/api/bet/5minbet`,
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          },
        );
        setMyHistoryFiveMin(myHistory.data.fiveBetOfUser)
      }
      console.log("This is fetch user data running times");

    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    }
    finally { setRefreshing(false) }
  };



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


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer} refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={['#4285F4', '#34A853', '#FBBC05', '#EA4335']} // Android only
        progressBackgroundColor="#ffffff" // Android only
      />
    } contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>

        <Image source={require('../image/1.jpg')} style={styles.logo} />
      </View>

      <View >
        <View style={styles.balanceView}>

          <View style={styles.balanceContainer}>

            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>Balance: ₹ {userInformation?.wallet?.toFixed(2)}</Text>
            <TouchableOpacity onPress={fetchUserData}>

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


        <View style={{
          marginTop: 15,
          flexDirection: 'row',
          backgroundColor: 'white', width: SCREEN_WIDTH * 0.92, justifyContent: 'space-evenly',
          shadowColor: 'black',
          elevation: 5,
          borderRadius: 10, alignSelf: 'center'
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

        <View style={{ height: SCREEN_HEIGHT * 0.16, width: SCREEN_WIDTH * 0.95, backgroundColor: 'purple', marginVertical: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }}>Time Remaining ...</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginVertical: 20 }}>
            {`${countdowns[selectedCountdown]?.minutes || 0} : ${countdowns[selectedCountdown]?.seconds || 0} `}
          </Text>

        </View>



        <Modal visible={selectedCountdown == 'thirtySec' && popWinThirtySec} animationType='slide' transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../assets/winEmoji.png')} style={{ height: 200, width: 200, borderRadius: 15 }} />
            <TouchableOpacity
              onPress={() => setPopWinThirtySec(false)}
              style={{ backgroundColor: 'red', padding: 5, marginTop: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={selectedCountdown == 'oneMin' && popWinOneMin} animationType='slide' transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../assets/winEmoji.png')} style={{ height: 200, width: 200, borderRadius: 15 }} />
            <TouchableOpacity
              onPress={() => setPopWinOneMin(false)}
              style={{ backgroundColor: 'red', padding: 5, marginTop: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={selectedCountdown == 'threeMin' && popWinThreeMin} animationType='slide' transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../assets/winEmoji.png')} style={{ height: 200, width: 200, borderRadius: 15 }} />
            <TouchableOpacity
              onPress={() => setPopWinThreeMin(false)}
              style={{ backgroundColor: 'red', padding: 5, marginTop: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal visible={selectedCountdown == 'fiveMin' && popWinFiveMin == true} animationType='slide' transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../assets/winEmoji.png')} style={{ height: 200, width: 200, borderRadius: 15 }} />
            <TouchableOpacity
              onPress={() => setPopWinFiveMin(false)}
              style={{ backgroundColor: 'red', padding: 5, marginTop: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal visible={selectedCountdown === 'thirtySec' && popLoseThirtySec == true} animationType='slide' transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../assets/loseEmoji.png')} style={{ height: 200, width: 200, borderRadius: 15 }} />
            <TouchableOpacity
              onPress={() => setPopLoseThirtySec(false)}
              style={{ backgroundColor: 'red', padding: 5, marginTop: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={selectedCountdown == 'oneMin' && popLoseOneMin} animationType='slide' transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../assets/loseEmoji.png')} style={{ height: 200, width: 200, borderRadius: 15 }} />
            <TouchableOpacity
              onPress={() => setPopLoseOneMin(false)}
              style={{ backgroundColor: 'red', padding: 5, marginTop: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={selectedCountdown == 'threeMin' && popLoseThreeMin} animationType='slide' transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../assets/loseEmoji.png')} style={{ height: 200, width: 200, borderRadius: 15 }} />
            <TouchableOpacity
              onPress={() => setPopLoseThreeMin(false)}
              style={{ backgroundColor: 'red', padding: 5, marginTop: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity> borderBottomColor: 'pink',
          </View>
        </Modal>
        <Modal visible={selectedCountdown == 'fiveMin' && popLoseFiveMin} animationType='slide' transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('../assets/loseEmoji.png')} style={{ height: 200, width: 200, borderRadius: 15 }} />
            <TouchableOpacity
              onPress={() => setPopLoseFiveMin(false)}
              style={{ backgroundColor: 'red', padding: 5, marginTop: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>


      </View>



      <View style={{ height: SCREEN_HEIGHT * 0.07, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 5, marginVertical: 5 }}>

        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Upcoming : <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, }}>
          {
            selectedCountdown === 'thirtySec'
              ? (gameHistoryThirtySec[0]?.LN + 1) || 0
              : selectedCountdown === 'oneMin'
                ? (gameHistoryOneMin[0]?.LN + 1) || 0
                : selectedCountdown === 'threeMin'
                  ? (gameHistoryThreeMin[0]?.LN + 1) || 0
                  : selectedCountdown === 'fiveMin'
                    ? (gameHistoryFiveMin[0]?.LN + 1) || 0
                    : 0
          }
        </Text></Text>

      </View>


      {/* Your other component content goes here */}
      <View style={{ flex: 1, width: SCREEN_WIDTH * 1, alignSelf: 'center' }}>
        <ThirtySecBetModal
          countdowns={countdowns}
          isVisible={bigModalVisible}
          closeModal={closeBigModal}
          selectType={selectType}
          select={select}
          backgroundColor={buttonBackgroundColor}
          selectedCountdown={selectedCountdown}
          fetchUserData={fetchUserData}
          ln={selectedCountdown == 'thirtySec' ? gameHistoryThirtySec[0]?.LN + 1 : selectedCountdown == 'oneMin' ? gameHistoryOneMin[0]?.LN + 1 : selectedCountdown == 'threeMin' ? gameHistoryThreeMin[0]?.LN + 1 : selectedCountdown == 'fiveMin' ? gameHistoryFiveMin[0]?.LN + 1 : 0}
        />
      </View>

      <View style={{
        height: 'auto', width: SCREEN_WIDTH * 0.97, alignSelf: 'center', paddingVertical: 5
      }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => openBigModal('#ffa343', 'size', 'big')}
              style={styles.bigButton}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Big</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallBtn}
              onPress={() => openBigModal('#0047AB', 'size', 'small')}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Small</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 10 }}></View>

          <View style={{ height: SCREEN_HEIGHT * 0.16, width: SCREEN_WIDTH * 0.95, backgroundColor: 'white', elevation: 2, borderRadius: 5, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <View style={{ height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                {[0, 1, 2, 3, 4].map((number) => (
                  <TouchableOpacity
                    key={number}
                    onPress={() => openBigModal('#0047AB', 'number', `${number}`)}
                    style={{ width: SCREEN_WIDTH * 0.1, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'blue', borderRadius: 50, justifyContent: 'center', alignItems: 'center', elevation: 5 }}
                  >
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>{number}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={{ height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                {[5, 6, 7, 8, 9].map((number) => (
                  <TouchableOpacity
                    key={number}
                    onPress={() => openBigModal('#0047AB', 'number', `${number}`)}
                    style={{ width: SCREEN_WIDTH * 0.1, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'blue', borderRadius: 50, justifyContent: 'center', alignItems: 'center', elevation: 5 }}
                  >
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>{number}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={{ marginVertical: 10 }}></View>

          <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.97, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.redBtn}
              onPress={() => openBigModal('red', 'color', 'red')}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Red</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.violetBtn}
              onPress={() => openBigModal('orange', 'color', 'yellow')}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Yellow</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.greenBtn}
              onPress={() => openBigModal('green', 'color', 'green')}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Green</Text>
            </TouchableOpacity>


          </View>
        </View>
        {showModal1 && selectedCountdown === 'thirtySec' && (
          <View style={styles.view2}>
            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
              {[
                ...(String(Number(countdowns[selectedCountdown]?.seconds) || 0).padStart(2, '0')),
              ].map((char, index) =>
                <View key={index} style={{ backgroundColor: 'white', paddingVertical: 20, borderRadius: 5, margin: 5, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 90, fontWeight: 'bold', color: 'red' }}>{char}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        {showModal2 && selectedCountdown === 'oneMin' && (
          <View style={styles.view2}>
            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
              {[
                ...(String(Number(countdowns[selectedCountdown]?.seconds) || 0).padStart(2, '0')),
              ].map((char, index) =>
                <View key={index} style={{ backgroundColor: 'white', paddingVertical: 20, borderRadius: 5, margin: 5, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 90, fontWeight: 'bold', color: 'red' }}>{char}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        {showModal3 && selectedCountdown === 'threeMin' && (
          <View style={styles.view2}>
            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
              {[
                ...(String(Number(countdowns[selectedCountdown]?.seconds) || 0).padStart(2, '0')),
              ].map((char, index) =>
                <View key={index} style={{ backgroundColor: 'white', paddingVertical: 20, borderRadius: 5, margin: 5, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 90, fontWeight: 'bold', color: 'red' }}>{char}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        {showModal4 && selectedCountdown === 'fiveMin' && (
          <View style={styles.view2}>
            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
              {[
                ...(String(Number(countdowns[selectedCountdown]?.seconds) || 0).padStart(2, '0')),
              ].map((char, index) =>
                <View key={index} style={{ backgroundColor: 'white', paddingVertical: 20, borderRadius: 5, margin: 5, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 90, fontWeight: 'bold', color: 'red' }}>{char}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>

      <View style={{ marginVertical: 10 }}></View>
      <View style={styles.horizontalButtonContainer}>

        <Button
          title="Game History"
          onPress={handleGameHistory}
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
            data={selectedCountdown == 'thirtySec' ? gameHistoryThirtySec.slice(startIndex, startIndex + itemsPerPage) : selectedCountdown == 'oneMin' ? gameHistoryOneMin.slice(startIndex, startIndex + itemsPerPage) : selectedCountdown == 'threeMin' ? gameHistoryThreeMin.slice(startIndex, startIndex + itemsPerPage) : selectedCountdown == 'fiveMin' ? gameHistoryFiveMin.slice(startIndex, startIndex + itemsPerPage) : []}
            renderItem={({ item }) => {
              return <View style={{ flex: 1, flexDirection: 'row', width: SCREEN_WIDTH * 0.9, marginTop: 2, height: SCREEN_HEIGHT * 0.09, paddingVertical: 1, borderBottomWidth: 0.5, borderBottomColor: 'grey', paddingHorizontal: 5, alignItems: 'center', alignSelf: 'center' }}>
                <View style={{ width: SCREEN_WIDTH * 0.25, }}><Text style={{ fontSize: 16, color: 'black' }}>{item.LN}</Text></View>
                <View style={{ width: SCREEN_WIDTH * 0.17, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ width: SCREEN_WIDTH * 0.1, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'green', borderRadius: 50, justifyContent: 'center', alignItems: 'center', elevation: 5 }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>
                      {item.number}</Text>
                  </View>
                  {/* <Image source={imageMapping[item.number]} style={{ height: 40, width: 40, borderRadius: 5 }} /> */}
                </View>
                <View style={{ width: SCREEN_WIDTH * 0.3, alignItems: 'center' }}><Text style={{ fontSize: 16, color: 'black' }}>{item.size}</Text></View>
                <View style={{ flexDirection: 'row' }}>
                  {item.color.map((c, index) => (
                    <Image key={index} source={imageMapping[c]} style={{ width: 20, height: 20, marginRight: 5 }} />
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
            <Button title="Next" onPress={onNextPress} disabled={startIndex + itemsPerPage >= gameHistorylength} />
          </View>
        </> : <></>
      }

      {/*////////////////////////////////////// Myhistory Screen Flatlist Data */}
      {
        myHistory ? <>
          <View style={styles.myHistoryContainer}>
            <FlatList data={selectedCountdown == 'thirtySec' ? myHistoryThirtySec.slice(startedIndexOfMyHistory, startedIndexOfMyHistory + itemsPerPage) : selectedCountdown == 'oneMin' ? myHistoryOneMin.slice(startedIndexOfMyHistory, startedIndexOfMyHistory + itemsPerPage) : selectedCountdown == 'threeMin' ? myHistoryThreeMin.slice(startedIndexOfMyHistory, startedIndexOfMyHistory + itemsPerPage) : selectedCountdown == 'fiveMin' ? myHistoryFiveMin.slice(startedIndexOfMyHistory, startedIndexOfMyHistory + itemsPerPage) : []} renderItem={renderItem} keyExtractor={(item) => item.id} />
          </View>
          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            width: '90%', marginVertical: 20
          }}>
            <Button title="Prev" onPress={onPrevPressOfMyHistory} disabled={startedIndexOfMyHistory === 0} />
            {/* <Text style={styles.pageIndicator}>{`Page ${Math.ceil((startIndex + 1) / itemsPerPage)} of ${totalPagesofMyHistory}`}</Text> */}
            <Button title="Next" onPress={onNextPressOfMyHistory} disabled={startIndex + itemsPerPage >= myHistorylength} />
          </View>
        </> : (<></>)
      }


    </ScrollView >
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, alignSelf: 'center', width: SCREEN_WIDTH * 1, paddingHorizontal: 2, backgroundColor: 'white',
  },

  container: {
    alignItems: 'center',
    paddingVertical: 5, justifyContent: 'center'
  },
  myHistoryContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    minHeight: SCREEN_HEIGHT * 0.3,
    maxHeight: 'auto'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
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
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.15,
    backgroundColor: '#F3CFC6',
    justifyContent: 'center', alignItems: 'center',
    marginTop: 4, borderRadius: 10, alignSelf: 'center'
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
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10

  },
  violetBtn: {
    backgroundColor: 'orange',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: 10,
    borderRadius: 10,
  },
  greenBtn: {
    backgroundColor: 'green',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10

  },

  buttonSpacing: {
    width: 10,
  },
  bigButton: {
    backgroundColor: '#FFAA33',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.45,
    paddingVertical: 15,
    borderTopStartRadius: 10, borderBottomStartRadius: 10, marginTop: 10,
    borderRightColor: 'grey', borderRightWidth: 1

  },
  smallBtn: {
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.45,
    paddingVertical: 15,
    borderTopEndRadius: 10, borderBottomEndRadius: 10, marginTop: 10,
  },
  numberBtn: {

    alignItems: 'center',
    width: SCREEN_WIDTH * 0.1,
    paddingVertical: 9,
    borderRadius: 50,
    elevation: 5,
    justifyContent: 'center'
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
    alignItems: 'center', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.9
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9, alignSelf: 'center',
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
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1

  },
  view2: {
    backgroundColor: 'rgba(128, 128, 128, 0.4)', // Use rgba to set opacity
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 10, alignSelf: 'center'
  },

});

export default HomeScreen;
