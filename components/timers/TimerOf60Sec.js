import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const TimerButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>60 sec</Text>
  </TouchableOpacity>
);

const TimerWithModal60Sec = () => {
  const [secondsRemaining60, setSecondsRemaining60] = useState(60);
  const [modalCountdown, setModalCountdown] = useState(5);
  const [isModalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining60((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isModalVisible]);

  useEffect(() => {
    if (secondsRemaining60 === 0 && isModalVisible) {
      setModalVisible(false);
      setSecondsRemaining60(60);

    } else if (secondsRemaining60 === 5 && secondsRemaining60 > 0) {
      setModalVisible(true);
      setModalCountdown(5);
    }
  }, [secondsRemaining60, isModalVisible]);

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
      setSecondsRemaining60(60); // Reset the timer

    }

    return () => clearInterval(countdownInterval);
  }, [isModalVisible, modalCountdown]);

  const startTimer = () => {
    setSecondsRemaining60(60);
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

          </View>
        </Modal>
      ) : (
        <View>
          <Text style={styles.timerText}>{formatTime(secondsRemaining60)}</Text>
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

export default TimerWithModal60Sec;
