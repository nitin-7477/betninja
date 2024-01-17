import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Colors } from '../Constants/Colors';
import { SCREEN_WIDTH } from '../Constants/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating } from 'react-native-ratings';
const FeedbackForm = () => {

  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  const [setRating, setSetRating] = useState(0);

  const ratingCompleted = (rating) => {

    setSetRating(rating);
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const body = { rating: setRating, comment: feedback };
      console.log(body);

      const result = await axios.post(`${process.env.SERVERURL}/api/feedback/feedback`, body, {
        headers: {
          Authorization: JSON.parse(token),
        },
      });

      console.log(result);
      setFeedback('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
      <View>
        <Text style={{ textAlign: 'center' }}>Plz Rate the app</Text>
      </View>
      <Rating
        type='heart'
        ratingCount={5}
        imageSize={40}
        showRating
        onFinishRating={ratingCompleted}
      />
      <Image source={require('../../assets/feedback.png')} style={{ height: 200, width: 300, marginVertical: 40 }} />

      <TouchableOpacity onPress={handleSubmit} style={{ height: 40, width: SCREEN_WIDTH * 0.9, backgroundColor: 'red', marginVertical: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
        <Text style={{ color: "white", fontWeight: 'bold' }}>Submit Feedback</Text>
      </TouchableOpacity>

    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignSelf: 'center', width: SCREEN_WIDTH * 1
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
    borderRadius: 10, alignSelf: 'center',
  },
});

export default FeedbackForm;
