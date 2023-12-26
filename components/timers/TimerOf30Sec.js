import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import io from 'socket.io-client';

const CountdownComponent = ({ timerName }) => {
  const [countdown, setCountdown] = useState(null);


  useEffect(() => {
    const socket = io(`${process.env.SERVERURL}`);
    socket.on(`updateCountdown_${timerName}`, (data) => {
      console.log("xxxxxxxxxx", data);
      setCountdown(data.countdown);
    });

  }, [timerName]);

  useEffect(() => {
    if (countdown !== null) {
      console.log(`${timerName} Countdown: ${countdown} seconds`);
    }
  }, [countdown, timerName]);
  return (
    <View>
      {countdown !== null ? (
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}>{timerName} Countdown: {countdown} seconds</Text>
      ) : (
        <Text>Connecting to countdown...</Text>
      )}
    </View>
  );
};
export default CountdownComponent;