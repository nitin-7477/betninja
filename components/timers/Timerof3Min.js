import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const TimerButton = ({ onPress, text }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const TimerWithModal3Min = () => {
  const [secondsRemaining180, setSecondsRemaining180] = useState(180); // 3 minutes
  const [modalCountdown, setModalCountdown] = useState(5);
  const [isModalVisible, setModalVisible] = useState(false);
  const [serialNumber, setSerialNumber] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining180((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isModalVisible]);

  useEffect(() => {
    if (secondsRemaining180 === 0 && isModalVisible) {
      setModalVisible(false);
      setSecondsRemaining180(180); // Reset the timer
      setSerialNumber((prevSerialNumber) => (prevSerialNumber < 30 ? prevSerialNumber + 1 : prevSerialNumber));
    } else if (secondsRemaining180 === 5 && secondsRemaining180 > 0) {
      setModalVisible(true);
      setModalCountdown(5);
    }
  }, [secondsRemaining180, isModalVisible]);

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
      setSecondsRemaining180(180); // Reset the timer
      setSerialNumber((prevSerialNumber) => (prevSerialNumber < 30 ? prevSerialNumber + 1 : prevSerialNumber));
    }

    return () => clearInterval(countdownInterval);
  }, [isModalVisible, modalCountdown]);

  const startTimer = (duration) => {
    setSecondsRemaining180(duration);
    setModalVisible(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TimerButton onPress={() => startTimer(180)} text="3 min" />

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
          <Text style={styles.timerText}>{formatTime(secondsRemaining180)}</Text>
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
    marginBottom: 20,
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

export default TimerWithModal3Min;
