import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const TimerButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>30 sec</Text>
  </TouchableOpacity>
);

const TimerWithModal30Sec = () => {
  const [secondsRemaining30, setSecondsRemaining30] = useState(30);
  const [modalCountdown, setModalCountdown] = useState(5);
  const [isModalVisible, setModalVisible] = useState(false);
  const [serialNumber, setSerialNumber] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining30((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isModalVisible]);

  useEffect(() => {
    if (secondsRemaining30 === 0 && isModalVisible) {
      setModalVisible(false);
      setSecondsRemaining30(30);
      setSerialNumber((prevSerialNumber) => (prevSerialNumber < 30 ? prevSerialNumber + 1 : prevSerialNumber));
    } else if (secondsRemaining30 === 5 && secondsRemaining30 > 0) {
      setModalVisible(true);
      setModalCountdown(5);
    }
  }, [secondsRemaining30, isModalVisible]);

  useEffect(() => {
    let countdownInterval;

    if (isModalVisible) {
      countdownInterval = setInterval(() => {
        setModalCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);
    }

    if (modalCountdown === 0) {
      clearInterval(countdownInterval);
      setModalVisible(false);
      setSecondsRemaining30(30); // Reset the timer
      setSerialNumber((prevSerialNumber) => (prevSerialNumber < 30 ? prevSerialNumber + 1 : prevSerialNumber));
    }

    return () => clearInterval(countdownInterval);
  }, [isModalVisible, modalCountdown]);

  const startTimer = () => {
    setSecondsRemaining30(30);
    setModalVisible(false);
  };

  const formatTime = (timeInSeconds) => {
    const seconds = timeInSeconds % 60;
    return `${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>

      {isModalVisible ? (
        <Modal
          visible={true}
          animationType="slide"
          transparent={false}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{formatTime(modalCountdown)}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : (
        <View>
          <Text style={styles.timerText}>{formatTime(secondsRemaining30)}</Text>
          <Text style={styles.serialNumberText}>Serial Number: {serialNumber}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  timerText: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black'
  },
  serialNumberText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  modalText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
  },
  closeModalText: {
    fontSize: 16,
    color: 'black',
  },
});

export default TimerWithModal30Sec;
