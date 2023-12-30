
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const NewBigModal = ({ isVisible, closeModal, backgroundColor, selectType, select }) => {

  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('1'); // Set default value to '1'
  const [totalAmount, setTotalAmount] = useState('');
  const [apiData, setApiData] = useState([]);
  const [ln, setln] = useState(0)

  const [userInformation, setUserInformation] = useState([]);
  const [userToken, setUserToken] = useState({});

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
  // console.log("This is my token in Pop Up", userToken);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.SERVERURL}/api/random/30secLottary`);

        // console.log("This is game history Data", response.data);

        setApiData(response.data);
        // console.log("xxxxxxxxx", response.data.data[0].LN);
        setln(response.data.data[0].LN + 1)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])
  // console.log("Its LN is sent to the Modal for bet", apiData.data[0].LN);

  // console.log("This is api data", apiData.data);
  console.log(ln);

  const handleBigData = async () => {
    try {

      // body -- {
      //   "LN": 35,
      //   "userId": "6582d2b750c7c42105f0ed6b",
      //   "phrchaseAmount": 100,
      //   "selectType": "color",
      //   "select": "red"
      // }

      console.log("zzzzzzzzzzzzzzz", userToken);

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

      // console.log("Request Body:", body);

      const response = await axios.post(`${process.env.SERVERURL}/api/bet/30secbet`, body,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      console.log("Response:", response.data);
      if (response.data) {
        closeModal()
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >

      <KeyboardAvoidingView style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
        <View style={[styles.diaLogViolet, { backgroundColor: backgroundColor }]}>

          <View style={{ height: 25, width: 150, display: 'flex', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, marginVertical: 5, alignItems: 'center' }}>
            <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Select {select}</Text>
            <Text style={{ color: 'black', textAlign: 'center' }}>SelectType {selectType}</Text>

          </View>
          <View style={{ height: '25%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: 'purple', fontWeight: 'bold' }}>Quantity</Text>
            <View style={{ flexDirection: 'row' }}>


              <TextInput
                style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}
                placeholder="Enter a number"
                keyboardType="numeric"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />

            </View></View>


          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Text style={{ color: 'purple', fontWeight: 'bold' }}>Times</Text>
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
          <View style={{ height: '15%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'purple', fontWeight: 'bold' }}>Balance</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ height: 25, width: 50, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(1)}
              >
                <Text style={{ color: 'white' }}>₹1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 50, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(10)}
              >
                <Text style={{ color: 'white' }}>₹10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 50, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(100)}
              >
                <Text style={{ color: 'white' }}>₹100</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 25, width: 50, backgroundColor: "green", borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                onPress={() => buttonMultiplier(1000)}
              >
                <Text style={{ color: 'white' }}>₹1000</Text>
              </TouchableOpacity>
            </View >
          </View>

          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', width: '90%' }}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleBigData}
              style={{ width: '45%', marginBottom: 5, backgroundColor: 'green', padding: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Total Amount :{totalAmount}</Text>

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
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  diaLogViolet: {
    height: '35%', width: '95%', alignItems: 'center', padding: 5, backgroundColor: '#F1EFEF',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    shadowColor: 'black', elevation: 10, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 1,
    // backgroundColor: '#ffa343',
    borderColor: 'black', borderWidth: 2
  },
});

export default NewBigModal;
