import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const TimerWithModal = () => {
  const [secondsRemaining30, setSecondsRemaining30] = useState(30);
  const [secondsRemaining60, setSecondsRemaining60] = useState(60);
  const [secondsRemaining300, setSecondsRemaining300] = useState(300); // 5 minutes
  const [secondsRemaining600, setSecondsRemaining600] = useState(600); // 10 minutes
  const [modalCountdown, setModalCountdown] = useState(5);
  const [isModalVisible, setModalVisible] = useState(false);
  const [serialNumber, setSerialNumber] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedDuration === 30) {
        setSecondsRemaining30((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      } else if (selectedDuration === 60) {
        setSecondsRemaining60((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      } else if (selectedDuration === 300) {
        setSecondsRemaining300((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      } else if (selectedDuration === 600) {
        setSecondsRemaining600((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDuration, isModalVisible]);

  useEffect(() => {
    if (
      (selectedDuration === 30 && secondsRemaining30 === 0) ||
      (selectedDuration === 60 && secondsRemaining60 === 0) ||
      (selectedDuration === 300 && secondsRemaining300 === 0) ||
      (selectedDuration === 600 && secondsRemaining600 === 0)
    ) {
      handleTimerCompletion(selectedDuration);
    } else if (
      (selectedDuration === 30 && secondsRemaining30 === 5) ||
      (selectedDuration === 60 && secondsRemaining60 === 5) ||
      (selectedDuration === 300 && secondsRemaining300 === 5) ||
      (selectedDuration === 600 && secondsRemaining600 === 5)
    ) {
      setModalVisible(true);
      setModalCountdown(5);
    }
  }, [secondsRemaining30, secondsRemaining60, secondsRemaining300, secondsRemaining600, isModalVisible]);

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
      resetTimer(selectedDuration);
      setSerialNumber((prevSerialNumber) => (prevSerialNumber < 30 ? prevSerialNumber + 1 : prevSerialNumber));
      // Start the timer again
      setTimeout(() => {
        startTimer(selectedDuration);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [isModalVisible, modalCountdown, selectedDuration]);

  const startTimer = (duration) => {
    if (!isModalVisible) {
      setSelectedDuration(duration);
    }
  };

  const resetTimer = (duration) => {
    if (duration === 30) {
      setSecondsRemaining30(duration);
    } else if (duration === 60) {
      setSecondsRemaining60(duration);
    } else if (duration === 300) {
      setSecondsRemaining300(duration);
    } else if (duration === 600) {
      setSecondsRemaining600(duration);
    }
  };

  const handleTimerCompletion = (duration) => {
    setModalVisible(false);
    resetTimer(duration);
    setSerialNumber((prevSerialNumber) => (prevSerialNumber < 30 ? prevSerialNumber + 1 : prevSerialNumber));
    // Start the timer again
    setTimeout(() => {
      startTimer(duration);
    }, 1000);
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => startTimer(30)} style={styles.button}>
          <Text style={styles.buttonText}>30 sec</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => startTimer(60)} style={styles.button}>
          <Text style={styles.buttonText}>60 sec</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => startTimer(300)} style={styles.button}>
          <Text style={styles.buttonText}>5 min</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => startTimer(600)} style={styles.button}>
          <Text style={styles.buttonText}>10 min</Text>
        </TouchableOpacity>
      </View>

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
          {selectedDuration === 30 ? (
            <Text style={styles.timerText}>{formatTime(secondsRemaining30)}</Text>
          ) : selectedDuration === 60 ? (
            <Text style={styles.timerText}>{formatTime(secondsRemaining60)}</Text>
          ) : selectedDuration === 300 ? (
            <Text style={styles.timerText}>{formatTime(secondsRemaining300)}</Text>
          ) : selectedDuration === 600 ? (
            <Text style={styles.timerText}>{formatTime(secondsRemaining600)}</Text>
          ) : null}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  timerText: {
    fontSize: 20,
    marginBottom: 10,
  },
  serialNumberText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  modalText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  closeModalText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TimerWithModal;








{/* <View style={{ height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple', marginVertical: 10, borderRadius: 10 }}>
<Text style={{ color: 'white', fontSize: 16, marginVertical: 5 }}>Time remaining</Text>
<Text style={{ color: 'white', fontSize: 32, marginVertical: 5 }}>{formatTime(secondsRemaining)}</Text>
<Text style={{ color: 'white', fontSize: 16, marginVertical: 5 }}>Serial Number: {serialNumber}</Text>
</View> */}