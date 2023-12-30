import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "./Constants/Colors";

const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={'white'}


      style={[
        {
          // fontFamily:"poppins-regular",
          fontSize: 16,
          paddingHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: '#1434A4',
          borderRadius: 10,
          marginVertical: 5,
          fontWeight: '500',
          color: 'white'
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