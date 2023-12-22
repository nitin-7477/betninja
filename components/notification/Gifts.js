import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AppTextInput from '../AppTextInput';

const Gifts = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* header */}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}><TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
        <Ionicons name='return-up-back' color={'white'} size={30} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Gifts</Text></View>
      <View style={styles.section}>
        <Text style={styles.normalText}>Hi Player</Text>
        <Text style={styles.normalText}>Our Team has a gift for you</Text>
        <Text style={styles.placeholderLine}>Please Enter your gift code below</Text>
        <AppTextInput placeholder='Please Enter Gift Code' />
        <TouchableOpacity style={styles.signIn}>
          <Text style={{ color: 'white', textAlign: "center", fontSize: 18, fontWeight: 'bold' }} >
            Receive
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.history}>

        <Text style={{ fontSize: 16, fontWeight: '600' }}>History</Text>
        <Image source={require('../../assets/noData.png')} style={{ height: 200, width: 200 }} />
      </View>
    </ScrollView>
  )
}

export default Gifts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    padding: 20
  },
  header: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors.lightGray, justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  section: {
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH * 0.88,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 10
  },
  history: {
    height: SCREEN_HEIGHT * 0.6,
    width: SCREEN_WIDTH * 0.88,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signIn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'purple',
    marginVertical: 30,
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  }, normalText: {
    color: Colors.fontGray,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  placeholderLine: {
    color: Colors.purple,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15
  }

})