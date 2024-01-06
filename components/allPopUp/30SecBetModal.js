
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from '../Constants/Screen';

const ThirtySecBetModal = ({ isVisible, closeModal, backgroundColor, selectType, select, ln, selectedCountdown, refreshMyHistory, fetchUserData, }) => {

  const navigation = useNavigation();
  const [amount, setAmount] = useState(1)
  const [totalAmount, setTotalAmount] = useState(1);
  const [inputValue, setInputValue] = useState(1); // Set default value to '1'
  const [times, setTimes] = useState('1')
  const [apiData, setApiData] = useState([]);

  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});
  const [selectedAmount, setSelectedAmount] = useState(1)
  const [selectedTimes, setSelectedTimes] = useState(1)


  const fetchHistoryData = async () => {
    try {

      let timerBet;


      switch (selectedCountdown) {
        case 'thirtySec':
          timerBet = '30secbet'
          break;
        case 'oneMin':
          timerBet = '1minbet'
          break;
        case 'threeMin':
          timerBet = '3minbet'
          break;
        case 'fiveMin':
          timerBet = '5minbet'
          break;

        default:
          break;
      }



      const token = await AsyncStorage.getItem('token');



      const response = await axios.get(`${process.env.SERVERURL}/api/bet/${timerBet}`, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      });


      let userBet;
      switch (selectedCountdown) {
        case 'thirtySec':
          userBet = response.data.thirtyBetOfUser;
          break;
        case 'oneMin':
          userBet = response.data.oneBetOfUser;
          break;
        case 'threeMin':
          userBet = response.data.threeBetOfUser;
          break;
        case 'fiveMin':
          userBet = response.data.fiveBetOfUser;
          break;
        default:
          break;
      }

      setUserInformation(userBet);
    }
    catch (error) {
      console.error('Error fetching user data of My history screen:', error);
    }

  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        setUserToken(JSON.parse(token))

      } catch (error) {
        console.error('Error fetching token in pop up:', error);
      }
    };

    fetchData();
  }, []);

  const handleBigData = async () => {
    try {

      let timerBet;
      fetchHistoryData()


      if (selectedCountdown === 'thirtySec') {
        timerBet = '30secbet'
      }
      else if (selectedCountdown === 'oneMin') {
        timerBet = '1minbet'
      }
      else if (selectedCountdown === 'threeMin') {
        timerBet = '3minbet'
      }
      else {
        timerBet = '5minbet'
      }



      // Check if userToken is available before making the request
      if (!userToken) {
        console.error("User token is missing");
        return;
      }

      const body = {
        LN: ln,
        phrchaseAmount: Number(totalAmount),
        selectType: selectType,
        select: select,
      };


      closeModal()
      fetchHistoryData()

      const response = await axios.post(`${process.env.SERVERURL}/api/bet/${timerBet}`, body,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      fetchUserData()

      if (response.data) {
        closeModal()
        fetchUserData()
        fetchHistoryData()
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {

        console.error("Server Response Data:", error.response.data);
        console.error("Server Response Status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };




  useEffect(() => {
    fetchHistoryData()

  }, []);


  useEffect(() => {
    const showTotalAmount = () => {
      const amounts = amount
      const quantity = parseInt(times)



      setTotalAmount(amounts * quantity)
    }
    showTotalAmount()
  }, [amount, times])


  const handleMultiplierClick = (value, times) => {
    setInputValue(value);
    setTimes(value)

    setSelectedTimes(times)
    // showTotalAmount()
  };



  const amountMultiplier = (value, money) => {

    setAmount(value)
    setSelectedAmount(money)

  };






  const handlePlus = () => {
    const timesMultiplier = Number(times)

    setTimes((timesMultiplier + 1).toString())

  }

  const handleMinus = () => {
    const timesMultiplier = Number(times)

    if (timesMultiplier > 0) {
      setTimes((timesMultiplier - 1).toString())

    }

  }



  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >

      <KeyboardAvoidingView style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
        <View style={[styles.diaLogViolet]}>
          <View style={{ height: 60, width: SCREEN_WIDTH * 0.99, backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 18, borderTopEndRadius: 18, }}>
            <View style={{ height: '50%', width: 150, display: 'flex', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, marginVertical: 5, alignItems: 'center' }}>
              <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Select {select}</Text>

            </View>
          </View>
          <View style={{ height: '15%', width: '97%', paddingVertical: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ color: 'purple', fontWeight: 'bold' }}>Amount</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ height: 25, width: 40, backgroundColor: selectedAmount == 1 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 }}
                onPress={() => amountMultiplier(1, 1)}
              >
                <Text style={{ color: selectedAmount == 1 ? "white" : "black", }}>₹1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 40, backgroundColor: selectedAmount == 2 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 }}
                onPress={() => amountMultiplier(10, 2)}
              >
                <Text style={{ color: selectedAmount == 2 ? "white" : "black", }}>₹10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 40, backgroundColor: selectedAmount == 3 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 }}
                onPress={() => amountMultiplier(100, 3)}
              >
                <Text style={{ color: selectedAmount == 3 ? "white" : "black", }}>₹100</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 50, backgroundColor: selectedAmount == 4 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 }}
                onPress={() => amountMultiplier(1000, 4)}
              >
                <Text style={{ color: selectedAmount == 4 ? "white" : "black", }}>₹1000</Text>
              </TouchableOpacity>
            </View >
          </View>




          <View style={{ height: '18%', width: '97%', paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <Text style={{ color: 'purple', fontWeight: 'bold' }}>Quantity</Text>
            <View style={{ flexDirection: 'row' }}>

              <TouchableOpacity
                onPress={handlePlus}
                style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, marginHorizontal: 5 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>+</Text>
              </TouchableOpacity>

              <TextInput
                style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', fontSize: 10, width: 100, height: 30, paddingVertical: 0 }}
                placeholder={`${times}`}
                keyboardType="numeric"
                value={times}
                onChangeText={(text) => setTimes(text)}
              />
              <TouchableOpacity
                onPress={handleMinus}
                style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, marginHorizontal: 5 }}>
                <Text style={{ color: 'white', fontSize: 24 }}>-</Text>
              </TouchableOpacity>

            </View></View>


          <View style={{ height: '15%', width: '97%', paddingVertical: 8, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 6 }}>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: selectedTimes == 1 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(1, 1)}
              >
                <Text style={{ color: selectedTimes == 1 ? "white" : "black", }}>X1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: selectedTimes == 2 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(5, 2)}
              >
                <Text style={{ color: selectedTimes == 2 ? "white" : "black", }}>X5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 30, backgroundColor: selectedTimes == 3 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(10, 3)}
              >
                <Text style={{ color: selectedTimes == 3 ? "white" : "black", }}>X10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: selectedTimes == 4 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(20, 4)}
              >
                <Text style={{ color: selectedTimes == 4 ? "white" : "black", }}>X20</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: selectedTimes == 5 ? "green" : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(50, 5)}
              >
                <Text style={{ color: selectedTimes == 5 ? "white" : "black", }}>X50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 25, width: 35, backgroundColor: selectedTimes == 6 ? "green" : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => handleMultiplierClick(100, 6)}
              >
                <Text style={{ color: selectedTimes == 6 ? "white" : "black", }}>X100</Text>
              </TouchableOpacity>
            </View >

          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', width: '90%' }}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleBigData}
              style={{
                width: '55%', marginBottom: 5, backgroundColor: 'purple', paddingVertical: 15,
                paddingHorizontal: 20, borderRadius: 5, justifyContent: 'center', alignItems: 'center'
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Total Amount :₹{totalAmount}</Text>

            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView >



    </Modal>
  );
};

const styles = StyleSheet.create({

  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 5
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  diaLogViolet: {
    height: '35%', width: '99%', alignItems: 'center', padding: 0, backgroundColor: '#F1EFEF',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    shadowColor: 'black', elevation: 10, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 1,
    // backgroundColor: '#ffa343',
    borderColor: 'white', borderWidth: 1
  },
});

export default ThirtySecBetModal;
