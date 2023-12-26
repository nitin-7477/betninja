import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity, Modal, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HistoryScreen from '../components/GameScreen/HistoryScreen';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import MyHistoryScreen from '../components/GameScreen/MyHistoryScreen';
import CountdownComponent from '../components/timers/TimerOf30Sec';
import NewModalViolet from '../components/GamingModal';


const myHistoryData = [

  { image: require('../assets/big.png'), id: '1234567854359', date: '11/5/2023', time: '6:24:00', status: 'Succeed', pl: '+17%' },
  { image: require('../assets/big.png'), id: '6789123345445', date: '12/5/2023', time: '6:25:00', status: 'Failed', pl: '+16%' },
  { image: require('../assets/big.png'), id: '9312353454589', date: '13/7/2023', time: '6:26:00', status: 'Succeed', pl: '+15%' },

]



const HomeScreen = ({ navigation }) => {

  const [gameHistory, setGameHistory] = useState(true)
  const [myHistory, setMyHistory] = useState(false)
  const [btnModalVisibleGreen, setBtnModalVisibleGreen] = useState(false);
  const [btnModalVisibleRed, setBtnModalVisibleRed] = useState(false);
  const [btnModalVisibleViolet, setBtnModalVisibleViolet] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };











  const handleGameHistory = () => {
    setGameHistory(true)
    setMyHistory(false)
  }
  const handleMyHistory = () => {
    setMyHistory(!myHistory)
    setGameHistory(false)
  }


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
            onPress={() => handleButtonClick(1)}
          >
            <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>30 Sec</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gameButton}>
          <TouchableOpacity
            onPress={() => handleButtonClick(2)}
            style={styles.clockBtn}
          >
            <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>1 Min</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gameButton}>
          <TouchableOpacity
            onPress={() => handleButtonClick(3)}
            style={styles.clockBtn}
          >
            <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>5 Min</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gameButton}>
          <TouchableOpacity
            onPress={() => handleButtonClick(4)}
            style={styles.clockBtn}
          >
            <Image source={require('../assets/clock.png')} style={{ height: 40, width: 40 }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>10 Min</Text>
          </TouchableOpacity>
        </View>
      </View>





      {selectedButton === 1 && <CountdownComponent timerName="thirtySecTimer" />}
      {selectedButton === 2 && <CountdownComponent timerName="oneMinTimer" />}
      {selectedButton === 3 && <CountdownComponent duration={180} label="3 min" identifier="3min" />}
      {selectedButton === 4 && <CountdownComponent duration={300} label="5 min" identifier="5min" />}

      <Text style={{ fontWeight: '900', fontSize: 18, marginVertical: 10, color: 'black' }}>Prediction Options:</Text>
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

        {/* *************************************************************** */}
        <NewModalViolet
          isVisible={isModalVisible} closeModal={closeModal}
        />
        <TouchableOpacity
          style={styles.violetBtn}
          onPress={openModal}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Violet</Text>
        </TouchableOpacity>
        {/* *********************************************************************** */}

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
