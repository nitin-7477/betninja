import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HistoryScreen from '../components/GameScreen/HistoryScreen';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import MyHistoryScreen from '../components/GameScreen/MyHistoryScreen';



const myHistoryData = [

  { image: require('../assets/big.png'), id: '1234567854359', date: '11/5/2023', time: '6:24:00', status: 'Succeed', pl: '+17%' },
  { image: require('../assets/big.png'), id: '6789123345445', date: '12/5/2023', time: '6:25:00', status: 'Failed', pl: '+16%' },
  { image: require('../assets/big.png'), id: '9312353454589', date: '13/7/2023', time: '6:26:00', status: 'Succeed', pl: '+15%' },

]



const HomeScreen = ({ navigation }) => {

  const [gameHistory, setGameHistory] = useState(true)
  const [myHistory, setMyHistory] = useState(false)
  const [secondsRemaining30, setSecondsRemaining30] = useState(30);
  const [secondsRemaining60, setSecondsRemaining60] = useState(60);
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [modalCountdown, setModalCountdown] = useState(5);
  const [isModalVisible, setModalVisible] = useState(false);
  const [serialNumber, setSerialNumber] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [btnModalVisibleGreen, setBtnModalVisibleGreen] = useState(false);
  const [btnModalVisibleRed, setBtnModalVisibleRed] = useState(false);
  const [btnModalVisibleViolet, setBtnModalVisibleViolet] = useState(false);

  const [inputValue, setInputValue] = useState('1'); // Set default value to '1'
  const [totalAmount, setTotalAmount] = useState('');

  // ***************************For the timer***************************
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedDuration === 30) {
        setSecondsRemaining30((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      } else if (selectedDuration === 60) {
        setSecondsRemaining60((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDuration, isModalVisible]);

  useEffect(() => {
    if (selectedDuration === 30 && secondsRemaining30 === 0 && isModalVisible) {
      handleTimerCompletion(30, setSecondsRemaining30);
    } else if (selectedDuration === 60 && secondsRemaining60 === 0 && isModalVisible) {
      handleTimerCompletion(60, setSecondsRemaining60);
    } else if ((selectedDuration === 30 && secondsRemaining30 === 5) || (selectedDuration === 60 && secondsRemaining60 === 5)) {
      setModalVisible(true);
      setModalCountdown(5);
    }
  }, [secondsRemaining30, secondsRemaining60, isModalVisible]);


  useEffect(() => {
    // Set the total amount when the component mounts
    const result = parseInt(inputValue || 0, 10);
    setTotalAmount(result.toString());
  }, [inputValue]);

  const handleMultiplierClick = (value) => {
    setInputValue(value.toString());

    // Calculate and set the total amount
    const result = parseInt(inputValue || 0, 10) * value;
    setTotalAmount(result.toString());
  };

  const buttonMultiplier = (value) => {
    const result = parseInt(inputValue || 0, 10) * value;
    setTotalAmount(result.toString());
  };



  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDuration, isModalVisible]);

  useEffect(() => {
    if (secondsRemaining === 0 && isModalVisible) {
      setModalVisible(false);
      setSecondsRemaining(selectedDuration);
      setSerialNumber((prevSerialNumber) => (prevSerialNumber < 30 ? prevSerialNumber + 1 : prevSerialNumber));
    } else if (secondsRemaining === 5 && secondsRemaining > 0) {
      setModalVisible(true);
      setModalCountdown(5);
    }
  }, [secondsRemaining, isModalVisible]);

  useEffect(() => {
    let countdownInterval;

    if (isModalVisible) {
      countdownInterval = setInterval(() => {
        setModalCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);
    }

    // Close modal automatically when countdown reaches 0
    if (modalCountdown === 0) {
      clearInterval(countdownInterval);
      setModalVisible(false);
      setSecondsRemaining(selectedDuration); // Reset the main timer
      setSerialNumber((prevSerialNumber) => (prevSerialNumber < 30 ? prevSerialNumber + 1 : prevSerialNumber));
    }

    return () => clearInterval(countdownInterval);
  }, [isModalVisible, modalCountdown, selectedDuration]);

  const startTimer = (duration) => {
    if (duration !== selectedDuration) {
      setSelectedDuration(duration);
      setSecondsRemaining(duration);
    }
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  const closeModal = () => {
    setModalVisible(false);
  };

  const handleGameHistory = () => {
    setGameHistory(true)
    setMyHistory(false)
  }
  const handleMyHistory = () => {
    setMyHistory(!myHistory)
    setGameHistory(false)
  }


  const NewModalGreen = () => {
    return (
      <KeyboardAvoidingView style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
        <View style={styles.diaLogBox}>

          <View style={{ height: '10%', width: '97%', padding: 5, display: 'flex', justifyContent: 'center', backgroundColor: 'green', flexDirection: 'row', borderRadius: 10, marginVertical: 5 }}>
            <Text style={{ color: 'white' }}>Green</Text>
          </View>

          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Balance</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(1)}
              >
                <Text style={{ color: 'white' }}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(10)}
              >
                <Text style={{ color: 'white' }}>10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(100)}
              >
                <Text style={{ color: 'white' }}>100</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(1000)}
              >
                <Text style={{ color: 'white' }}>1000</Text>
              </TouchableOpacity>
            </View >

          </View>


          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Quantity</Text>
            <View style={{ flexDirection: 'row' }}>

              <TextInput
                style={styles.input}
                placeholder="Enter a number"
                keyboardType="numeric"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />


            </View></View>

          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Text>Times</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(1)}
              >
                <Text style={{ color: 'white' }}>X1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(5)}
              >
                <Text style={{ color: 'white' }}>X5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(10)}
              >
                <Text style={{ color: 'white' }}>X10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(20)}
              >
                <Text style={{ color: 'white' }}>X20</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(50)}
              >
                <Text style={{ color: 'white' }}>X50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(100)}
              >
                <Text style={{ color: 'white' }}>X100</Text>
              </TouchableOpacity>
            </View >

          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', width: '90%' }}>
            <TouchableOpacity style={{ height: 30, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: "green" }} onPress={() => setBtnModalVisibleGreen(false)}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
            <View style={{ width: '50%' }}>
              <Text>Total Amount :{totalAmount}</Text>

            </View>
          </View>
        </View>
      </KeyboardAvoidingView >

    )
  }
  const NewModalRed = () => {
    return (
      <KeyboardAvoidingView style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
        <View style={styles.diaLogBoxRed}>

          <View style={{ height: '10%', width: '97%', padding: 5, display: 'flex', justifyContent: 'center', backgroundColor: 'red', flexDirection: 'row', borderRadius: 10, marginVertical: 5 }}>
            <Text style={{ color: 'white' }}>Red</Text>
          </View>

          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Balance</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(1)}
              >
                <Text style={{ color: 'white' }}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(10)}
              >
                <Text style={{ color: 'white' }}>10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleButtonClick(100)}
              >
                <Text style={{ color: 'white' }}>100</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(1000)}
              >
                <Text style={{ color: 'white' }}>1000</Text>
              </TouchableOpacity>
            </View >

          </View>


          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Quantity</Text>
            <View style={{ flexDirection: 'row' }}>

              <TextInput
                style={styles.input}
                placeholder="Enter a number"
                keyboardType="numeric"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />


            </View></View>

          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Text>Times</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(1)}
              >
                <Text style={{ color: 'white' }}>X1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(5)}
              >
                <Text style={{ color: 'white' }}>X5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(10)}
              >
                <Text style={{ color: 'white' }}>X10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(20)}
              >
                <Text style={{ color: 'white' }}>X20</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(50)}
              >
                <Text style={{ color: 'white' }}>X50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(100)}
              >
                <Text style={{ color: 'white' }}>X100</Text>
              </TouchableOpacity>
            </View >

          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', width: '90%' }}>
            <TouchableOpacity style={{ height: 30, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: "red" }} onPress={() => setBtnModalVisibleRed(false)}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
            <View style={{ width: '50%' }}>
              <Text>Total Amount :{totalAmount}</Text>

            </View>
          </View>
        </View>
      </KeyboardAvoidingView >

    )
  }
  const NewModalViolet = () => {
    return (
      <KeyboardAvoidingView style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
        <View style={styles.diaLogViolet}>

          <View style={{ height: '10%', width: '97%', padding: 5, display: 'flex', justifyContent: 'center', backgroundColor: 'purple', flexDirection: 'row', borderRadius: 10, marginVertical: 5 }}>
            <Text style={{ color: 'white' }}>Purple</Text>
          </View>

          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Balance</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(1)}
              >
                <Text style={{ color: 'white' }}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(10)}
              >
                <Text style={{ color: 'white' }}>10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(100)}
              >
                <Text style={{ color: 'white' }}>100</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(1000)}
              >
                <Text style={{ color: 'white' }}>1000</Text>
              </TouchableOpacity>
            </View >

          </View>


          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Quantity</Text>
            <View style={{ flexDirection: 'row' }}>

              <TextInput
                style={styles.input}
                placeholder="Enter a number"
                keyboardType="numeric"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />


            </View></View>

          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Text>Times</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(1)}
              >
                <Text style={{ color: 'white' }}>X1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(5)}
              >
                <Text style={{ color: 'white' }}>X5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(10)}
              >
                <Text style={{ color: 'white' }}>X10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(20)}
              >
                <Text style={{ color: 'white' }}>X20</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(50)}
              >
                <Text style={{ color: 'white' }}>X50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(100)}
              >
                <Text style={{ color: 'white' }}>X100</Text>
              </TouchableOpacity>
            </View >

          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', width: '90%' }}>
            <TouchableOpacity style={{ height: 30, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: "purple" }} onPress={() => setBtnModalVisibleViolet(false)}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
            <View style={{ width: '50%' }}>
              <Text>Total Amount :{totalAmount}</Text>

            </View>
          </View>
        </View>
      </KeyboardAvoidingView >

    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../image/1.jpg')} style={styles.logo} />
      </View>


      <View style={styles.balanceView}>
        <View style={styles.balanceContainer}>
          <Text style={{ fontWeight: 'bold' }}>Balance: $1000</Text>
          <AntDesign name="reload1" size={20} color="blue" style={styles.refreshIcon} />
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


      <View style={styles.gameContainer}>
        <View style={styles.gameButton}>
          <TouchableOpacity
            style={styles.clockBtn}
            onPress={() => startTimer(30)}
          >
            <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', }}>30 Sec</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gameButton}>
          <TouchableOpacity
            onPress={() => startTimer(60)}
            style={styles.clockBtn}
          // onPress={() => navigation.navigate('WithdrawScreen')}
          >
            <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', }}>1 Min</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gameButton}>
          <TouchableOpacity
            onPress={() => startTimer(180)}
            style={styles.clockBtn}
          // onPress={() => navigation.navigate('WithdrawScreen')}
          >
            <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', }}>3 Min</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gameButton}>
          <TouchableOpacity
            onPress={() => startTimer(300)}
            style={styles.clockBtn}
          // onPress={() => navigation.navigate('WithdrawScreen')}
          >
            <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', }}>5 Min</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isModalVisible ? (
        <Modal
          visible={true}
          animationType="slide"
          transparent={false}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{formatTime(modalCountdown)} seconds left!</Text>
          </View>
        </Modal>
      ) : (
        <View style={{ height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple', marginVertical: 10, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontSize: 16, marginVertical: 5 }}>Time remaining</Text>
          <Text style={{ color: 'white', fontSize: 32, marginVertical: 5 }}>{formatTime(secondsRemaining)}</Text>
          <Text style={{ color: 'white', fontSize: 16, marginVertical: 5 }}>Serial Number: {serialNumber}</Text>
        </View>
      )}
      <Text style={{ fontWeight: '900', fontSize: 18, marginVertical: 10 }}>Prediction Options:</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => alert('Big')}
          style={styles.bigButton}>
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Big</Text>
        </TouchableOpacity>
        {/* <View style={styles.buttonSpacing} /> */}
        <TouchableOpacity
          style={styles.smallBtn}
          onPress={() => alert('Small')}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Small</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.94, justifyContent: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 5 }}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>4</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberBtn}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', }}>9</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.redBtn}
          onPress={() => setBtnModalVisibleRed(true)}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Red</Text>
        </TouchableOpacity>

        <Modal visible={btnModalVisibleGreen} animationType="slide" transparent={true}   >
          <NewModalGreen />
        </Modal>
        <Modal visible={btnModalVisibleRed} animationType="slide" transparent={true}   >
          <NewModalRed />
        </Modal>
        <Modal visible={btnModalVisibleViolet} animationType="slide" transparent={true}   >
          <NewModalViolet />
        </Modal>


        <TouchableOpacity
          style={styles.violetBtn}
          onPress={() => setBtnModalVisibleViolet(true)}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Violet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.greenBtn}
          onPress={() => setBtnModalVisibleGreen(true)}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Green</Text>
        </TouchableOpacity>

        <View style={styles.buttonSpacing} />
      </View>
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
        gameHistory ? (<HistoryScreen />) : (<></>)
      }
      {/*////////////////////////////////////// Myhistory Screen Flatlist Data */}
      {
        myHistory ? <MyHistoryScreen /> : (<></>)
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
  },
  logo: {
    width: 150,
    height: 50,
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
    backgroundColor: 'purple',
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
    backgroundColor: '#000080',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.1,
    paddingVertical: 10,
    borderRadius: 50, marginTop: 10,
    marginLeft: 10,
    marginHorizontal: 3
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
  diaLogBox: {
    height: '35%', width: '95%', alignItems: 'center', padding: 5, backgroundColor: '#F1EFEF',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    shadowColor: 'black', elevation: 10, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 1,
    backgroundColor: '#90EE90', borderColor: 'black', borderWidth: 2
  },
  diaLogBoxRed: {
    height: '35%', width: '95%', alignItems: 'center', padding: 5, backgroundColor: '#F1EFEF',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    shadowColor: 'black', elevation: 10, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 1,
    backgroundColor: '#FFA07A', borderColor: 'black', borderWidth: 2
  },
  diaLogViolet: {
    height: '35%', width: '95%', alignItems: 'center', padding: 5, backgroundColor: '#F1EFEF',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    shadowColor: 'black', elevation: 10, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 1,
    backgroundColor: '#D8BFD8', borderColor: 'black', borderWidth: 2
  },
});

export default HomeScreen;
