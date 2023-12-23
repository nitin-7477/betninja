import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { Colors } from './Constants/Colors';
import { SCREEN_WIDTH } from './Constants/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
const FeedbackForm = () => {
  const navigation = useNavigation();

  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    // Alert.alert("OOPS", "ALert kyu aa gya bhai", [
    //   {
    //     text: 'Band Kro', onPress: () => { console.log('Band Ho gya') }
    //   }
    // ],
    // )
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}><TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
        <Ionicons name='return-up-back' color={'white'} size={30} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Feedback</Text></View>
      <TextInput
        style={styles.feedbackInput}
        multiline
        numberOfLines={10}
        placeholder="Please give you feedback here and please describe the problem in detail when providing the feedback and preferrably attach a screenshot of the problem you faced, we will immediately process your feedback"
        placeholderTextColor={Colors.fontGray}
        textAlignVertical="top" // Align the text to the top
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
      />
      <Image source={require('../assets/feedback.png')} style={{ height: 200, width: 300, marginVertical: 40 }} />


      <TouchableOpacity onPress={handleSubmit} style={{ height: 40, width: SCREEN_WIDTH * 0.9, backgroundColor: 'red', marginVertical: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: "white", fontWeight: 'bold' }}>Submit Feedback</Text>
      </TouchableOpacity>


    </View >
  );
};

const styles = StyleSheet.create({
  container: {

    margin: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black'
  },
  feedbackInput: {
    width: '100%',
    height: 250, // Adjust the height as needed
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: 'black',
    backgroundColor: Colors.lightGray,
    borderRadius: 10
  },
});

export default FeedbackForm;
