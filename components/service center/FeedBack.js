import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Colors } from '../Constants/Colors';
import { SCREEN_WIDTH } from '../Constants/Screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating } from 'react-native-ratings';
const FeedbackForm = () => {

  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const ratingCompleted = (rating) => {

    setRating(rating)
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      let body = { comment: feedback, rating: rating };

      // if (rating > 0) {
      //   // Include rating in the body only if the user has provided a rating
      //   body = { ...body, rating: rating };
      // }
      console.log(token);

      const result = await axios.post(`${process.env.SERVERURL}/api/feedback/feedback`, body, {
        headers: {
          Authorization: JSON.parse(token),
        },
      });

      console.log(result);
      setFeedback('');
      setRating(1); //  
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ width: '100%', backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Feedback</Text>
      </View>
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

      <Rating
        type='star'
        ratingBackgroundColor='red'
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

    alignSelf: 'center', width: SCREEN_WIDTH * 1
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black'
  },
  feedbackInput: {
    width: '95%',
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
