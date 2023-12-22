import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";


const GameStats = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* header */}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}><TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
        <Ionicons name='return-up-back' color={'white'} size={30} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Game Charts</Text></View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.otpBtn}    >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otpBtn}    >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            Yesterday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otpBtn}    >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            This Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otpBtn}    >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }} >
            This Month
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>
          ₹ 0.00
        </Text>
        <Text>
          Total Bet
        </Text>

      </View>
      <View style={styles.history}>

        <Image source={require('../../assets/noData.png')} style={{ height: 200, width: 200 }} />
        <Text style={{ fontSize: 16, fontWeight: '600' }}>No Data</Text>

      </View>
    </ScrollView>
  )
}

export default GameStats

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
    height: SCREEN_HEIGHT * 0.2,
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
  },
  otpBtn: {
    backgroundColor: Colors.fontGray,
    borderRadius: 10,
    width: 75,
    elevation: 5,
    paddingVertical: 3,
    marginHorizontal: 2,
    paddingVertical: 5,
    marginVertical: 10
  },

})