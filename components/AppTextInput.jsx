import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const AppTextInput = ({ ...otherProps }) => {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={'white'}
      style={[
        {
          fontSize: 16,
          paddingHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: '#1434A4',
          borderRadius: 10,
          marginVertical: 5,
          fontWeight: '500',
          color: 'white',
          width: '100%'
        },
        focused && {
          borderWidth: 1,
          borderColor: 'blue',
          shadowOffset: { width: 4, height: 10 },
          shadowColor: 'blue',
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
