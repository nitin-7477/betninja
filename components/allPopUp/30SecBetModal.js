
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen';
import { Colors } from '../Constants/Colors';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const ThirtySecBetModal = ({ isVisible, closeModal, backgroundColor, selectType, select, ln, selectedCountdown, fetchUserData, countdowns }) => {

  const navigation = useNavigation();
  const [amount, setAmount] = useState(1)
  const [totalAmount, setTotalAmount] = useState(1);
  const [inputValue, setInputValue] = useState(1); // Set default value to '1'
  const [times, setTimes] = useState('1')

  const [userToken, setUserToken] = useState({});
  const [selectedAmount, setSelectedAmount] = useState(1)
  const [selectedTimes, setSelectedTimes] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const [isChecked, setChecked] = useState(true);

  const handleToggle = () => {
    setChecked(!isChecked);
  };

  const handleBigData = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('token')
      let timerBet;

      if (selectedCountdown === 'thirtySec') { timerBet = '30secbet' }
      else if (selectedCountdown === 'oneMin') { timerBet = '1minbet' }
      else if (selectedCountdown === 'threeMin') { timerBet = '3minbet' }
      else if (selectedCountdown === 'fiveMin') { timerBet = '5minbet' }

      const body = {
        LN: ln, phrchaseAmount: Number(totalAmount), selectType: selectType, select: select,
      };

      const response = await axios.post(`${process.env.SERVERURL}/api/bet/${timerBet}`, body,
        { headers: { Authorization: JSON.parse(token), } });

      if (response.data) {
        closeModal()
        fetchUserData()

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
    finally {
      setLoading(false)
    }
  };


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
  const handleTimesChange = (text) => {
    // Validate that the input is greater than 0 and has only four digits
    const isValidInput = /^\d{0,4}$/.test(text);

    if (isValidInput) {
      setTimes(text);
    }

  };

  useEffect(() => {


    const closeModalOnTime = () => {
      if (
        (countdowns.thirtySec.seconds == 5 && selectedCountdown == 'thirtySec' && countdowns.thirtySec.minutes == 0) ||
        (countdowns.oneMin.seconds == 5 && selectedCountdown == 'oneMin' && countdowns.oneMin.minutes == 0) ||
        (countdowns.threeMin.seconds == 5 && selectedCountdown == 'threeMin' && countdowns.threeMin.minutes == 0) ||
        (countdowns.fiveMin.seconds == 5 && selectedCountdown == 'fiveMin' && countdowns.fiveMin.minutes == 0)
      ) {

        closeModal();
      }
    };

    closeModalOnTime();
  }, [countdowns, selectedCountdown, closeModal]);



  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}

      >

        <KeyboardAvoidingView style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1, width: SCREEN_WIDTH * 1, alignSelf: 'center' }}>
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
                  <Text style={{ color: selectedAmount == 1 ? "white" : "black", fontWeight: 'bold' }}>₹1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ height: 25, width: 40, backgroundColor: selectedAmount == 2 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 }}
                  onPress={() => amountMultiplier(10, 2)}
                >
                  <Text style={{ color: selectedAmount == 2 ? "white" : "black", fontWeight: 'bold' }}>₹10</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ height: 25, width: 40, backgroundColor: selectedAmount == 3 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 }}
                  onPress={() => amountMultiplier(100, 3)}
                >
                  <Text style={{ color: selectedAmount == 3 ? "white" : "black", fontWeight: 'bold' }}>₹100</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ height: 25, width: 50, backgroundColor: selectedAmount == 4 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 }}
                  onPress={() => amountMultiplier(1000, 4)}
                >
                  <Text style={{ color: selectedAmount == 4 ? "white" : "black", fontWeight: 'bold' }}>₹1000</Text>
                </TouchableOpacity>
              </View >
            </View>




            <View style={{ height: '18%', width: '97%', paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <Text style={{ color: 'purple', fontWeight: 'bold' }}>Quantity</Text>
              <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                  onPress={handleMinus}
                  style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, marginHorizontal: 5 }}>
                  <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>-</Text>
                </TouchableOpacity>

                <TextInput
                  style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', fontSize: 10, width: 100, height: 30, paddingVertical: 0 }}
                  placeholder={`${times}`}
                  keyboardType="numeric"
                  value={times}
                  onChangeText={(text) => handleTimesChange(text)}
                />

                <TouchableOpacity
                  onPress={handlePlus}
                  style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, marginHorizontal: 5 }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>+</Text>
                </TouchableOpacity>

              </View></View>


            <View style={{ height: '15%', width: '97%', paddingVertical: 8, flexDirection: 'row', justifyContent: 'center', }}>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ height: 25, width: 'auto', backgroundColor: selectedTimes == 1 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}
                  onPress={() => handleMultiplierClick(1, 1)}
                >
                  <Text style={{ color: selectedTimes == 1 ? "white" : "black", fontWeight: 'bold' }}>X1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ height: 25, width: 'auto', backgroundColor: selectedTimes == 2 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}
                  onPress={() => handleMultiplierClick(5, 2)}
                >
                  <Text style={{ color: selectedTimes == 2 ? "white" : "black", fontWeight: 'bold' }}>X5</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ height: 25, width: 'auto', backgroundColor: selectedTimes == 3 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 2, paddingHorizontal: 5 }}
                  onPress={() => handleMultiplierClick(10, 3)}
                >
                  <Text style={{ color: selectedTimes == 3 ? "white" : "black", fontWeight: 'bold' }}>X10</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ height: 25, width: 'auto', backgroundColor: selectedTimes == 4 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 2, paddingHorizontal: 5 }}
                  onPress={() => handleMultiplierClick(20, 4)}
                >
                  <Text style={{ color: selectedTimes == 4 ? "white" : "black", fontWeight: 'bold' }}>X20</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ height: 25, width: 'auto', backgroundColor: selectedTimes == 5 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 2, paddingHorizontal: 5 }}
                  onPress={() => handleMultiplierClick(50, 5)}
                >
                  <Text style={{ color: selectedTimes == 5 ? "white" : "black", fontWeight: 'bold' }}>X50</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ height: 25, width: 'auto', backgroundColor: selectedTimes == 6 ? backgroundColor : null, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 2, paddingHorizontal: 5 }}
                  onPress={() => handleMultiplierClick(100, 6)}
                >
                  <Text style={{ color: selectedTimes == 6 ? "white" : "black", fontWeight: 'bold' }}>X100</Text>
                </TouchableOpacity>
              </View >

            </View>

            <TouchableOpacity style={{ width: '100%', height: '11%', flexDirection: 'row', alignItems: 'center', }} onPress={handleToggle} activeOpacity={0.8}>
              <View style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && <Text style={{ color: 'white' }}>✓</Text>}
              </View>
              <Text style={{ marginLeft: 10, color: 'black' }}>I agree(terms and condition)</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', width: '90%' }}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={isChecked ? (loading ? null : handleBigData) : null}
                disabled={!isChecked && isDisabled}
                style={{
                  width: '60%',
                  marginBottom: 5,
                  backgroundColor: 'purple',
                  // paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  height: responsiveHeight(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: isChecked ? (loading ? 0.5 : 1) : 0.5,    // Optionally reduce opacity during loading
                }}
              >
                {loading ? (
                  <ActivityIndicator size={20} color="red" />
                ) : (
                  <Text style={{ color: 'white', fontWeight: 'bold', width: 'auto' }}>
                    Total Amount :₹{totalAmount}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAvoidingView >

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, alignSelf: 'center', width: SCREEN_WIDTH * 1
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 5,
    marginBottom: 5
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  diaLogViolet: {
    height: SCREEN_HEIGHT * 0.34, width: '99%', alignItems: 'center', padding: 0, backgroundColor: '#F1EFEF',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    shadowColor: 'black', elevation: 10, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 1,
    // backgroundColor: '#ffa343',
    borderColor: 'white', borderWidth: 1
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

  }, checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center', marginLeft: 10
  },
  checked: {
    backgroundColor: 'green', // Change this color as needed
    borderColor: 'green',
  },
});

export default ThirtySecBetModal;
