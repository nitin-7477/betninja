
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';

const Modal1 = ({ isVisible, closeModal, number }) => {


  const [inputValue, setInputValue] = useState('1'); // Set default value to '1'
  const [totalAmount, setTotalAmount] = useState('');

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


  const handleBetOfNumber = () => {
    // body -- {
    //   "LN": 35,
    //   "userId": "6582d2b750c7c42105f0ed6b",
    //   "phrchaseAmount": 100,
    //   "selectType": "color",
    //   "select": "red"
    // }

    var body = {}
    alert(totalAmount)

  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >

      <KeyboardAvoidingView style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
        <View style={styles.diaLogViolet}>

          <View style={{ height: 25, width: 150, display: 'flex', justifyContent: 'center', backgroundColor: '#fe5a1d', borderRadius: 10, marginVertical: 5, alignItems: 'center' }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Select {number}</Text>
          </View>
          <View style={{ height: '25%', width: '97%', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: 'purple', fontWeight: 'bold' }}>Quantity</Text>
            <View style={{ flexDirection: 'row' }}>


              <TextInput
                style={{ backgroundColor: '#fe5a1d', color: 'white' }}
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
              onPress={handleBetOfNumber}

              style={{ width: '50%', marginBottom: 5 }}>
              <Text style={{ color: 'purple', fontWeight: 'bold' }}>Total Amount :{totalAmount}</Text>

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
    backgroundColor: '#89CFF0', borderColor: 'black', borderWidth: 2
  },
});

export default Modal1;
