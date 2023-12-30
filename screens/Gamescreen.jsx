import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity, Modal, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HistoryScreen from '../components/GameScreen/HistoryScreen';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import MyHistoryScreen from '../components/GameScreen/MyHistoryScreen';
import CountdownComponent from '../components/timers/TimerOf30Sec';
import NewRedModal from '../components/allPopUp/NewRedModal';
import NewBigModal from '../components/allPopUp/NewBigModal';
import Modal1 from '../components/allPopUp/ModalOfNumber';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



const HomeScreen = ({ navigation }) => {

  const [gameHistory, setGameHistory] = useState(true)
  const [myHistory, setMyHistory] = useState(false)
  const [selectedButton, setSelectedButton] = useState(null);
  const [bigModalVisible, setBigModalVisible] = useState(false)
  const [selectType, setSelectType] = useState(null)
  const [select, setSelect] = useState(null)
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState(null);
  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});
  const [ln, setln] = useState(0)

  useEffect(() => {

    fetchData();
    getLotteryNumber()
  }, []);


  const getLotteryNumber = async () => {
    try {
      const response = await axios.get(`${process.env.SERVERURL}/api/random/30secLottaryLatest`)
      // console.log("xxxxxxxxxxxxxxxx",response.data.data.LN+1);
      setln(response.data.data.LN + 1)

    }
    catch (e) {
      console.log("Error while getting lottery Number", e);

    }
  }


  const fetchData = async () => {
    try {
      // Retrieve user data from AsyncStorage
      const storedUserData = await AsyncStorage.getItem('token');
      const parsedUserData = JSON.parse(storedUserData);
      setUserToken(parsedUserData);

      // const token = `${parsedUserData.token}`;
      const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
        headers: {
          "Authorization": parsedUserData,
        },
      });

      setUserInformation(response.data);
    } catch (error) {
      console.error('Error fetching user data in Gaming screen:', error);
    }
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
          <Text style={{ fontWeight: 'bold' }}>Balance: {userInformation.wallet}</Text>
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



      <View><CountdownComponent /></View>
      <View style={{ height: 55, width: '90%', alignSelf: 'center', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Upcoming : <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, }}> {ln}</Text></Text>

      </View>

      {/* 

      <Text style={{ fontWeight: '900', fontSize: 18, marginVertical: 10, color: 'black' }}>Prediction Options:</Text> */}
      <View style={styles.buttonRow}>
        <NewBigModal isVisible={bigModalVisible} closeModal={closeBigModal} selectType={selectType} select={select}
          backgroundColor={buttonBackgroundColor} />
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
          onPress={() => openBigModal('#D8BFD8', 'color', 'violet')}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', }}>Violet</Text>
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

    alignItems: 'center',
    width: SCREEN_WIDTH * 0.1,
    paddingVertical: 10,
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
