import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const CountdownApp = () => {
  const [count, setCount] = useState(30);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let countdownInterval;

    if (count > 0) {
      countdownInterval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);

        if (count === 5) {
          setModalVisible(true);
          // Auto close modal after 2 seconds (adjust as needed)
          setTimeout(() => {
            setModalVisible(false);
          }, 2000);
        }
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [count]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const resetCountdown = () => {
    setCount(30);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Start Countdown" onPress={() => setCount(30)} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text>Modal Content</Text>
          <Button title="Close Modal" onPress={closeModal} />
        </View>
      </Modal>

      <Text style={styles.countdownText}>Countdown: {count} seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    marginTop: 20,
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
});

export default CountdownApp;
