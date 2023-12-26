import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const MessageComponent = () => {
  const messages = ["Hello withdrawals typically take 1-2 hours to process. We appreciate your patience",

    "Minors are not allowed to participate in the game this game is not for minors.",

    "Attention for all members, please make sure that you registered your bank details correctly "];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment index or reset to 0 if at the end
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <View>
      <Text style={{ color: 'black', fontWeight: 'bold' }}>{messages[currentMessageIndex]}</Text>
    </View>
  );
};

export default MessageComponent;
