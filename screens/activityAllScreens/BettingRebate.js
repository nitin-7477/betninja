import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Colors } from '../../components/Constants/Colors'
import { useNavigation } from "@react-navigation/native";


const data = [
  { id: '1', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 429', rebateRate: '0.1%', rebateAmount: '0.43' },
  { id: '2', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 1237', rebateRate: '0.3%', rebateAmount: '0.43' },
  { id: '3', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 4239', rebateRate: '0.19%', rebateAmount: '0.43' },
  { id: '4', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 13327', rebateRate: '0.3%', rebateAmount: '0.43' },
  { id: '5', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 4249', rebateRate: '0.15%', rebateAmount: '0.43' },
  { id: '6', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 12337', rebateRate: '0.35%', rebateAmount: '0.43' },
  { id: '7', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 429', rebateRate: '0.1%', rebateAmount: '0.43' },
  { id: '8', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 127', rebateRate: '0.3%', rebateAmount: '0.43' },
  { id: '9', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 429', rebateRate: '0.1%', rebateAmount: '0.43' },
  { id: '10', type: 'Lottery', date: '2023-12-06 1:00:10', status: 'Completed', rebate: '₹ 127', rebateRate: '0.3%', rebateAmount: '0.43' },

];
const BettingRebate = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container1}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}><TouchableOpacity
        onPress={() => navigation.navigate('Activity')}
        style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
        <Ionicons name='return-up-back' color={'white'} size={30} />
      </TouchableOpacity>
        <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: 'black', marginLeft: 70 }}>Betting Rebate</Text></View>
      <View style={{ height: SCREEN_HEIGHT * 0.38, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: '#DCDCDC', marginTop: 10, borderRadius: 10, padding: 10 }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>All-Total Betting Rebate</Text>
        <View style={{ flexDirection: 'row', marginTop: 10, width: 130, height: 25, borderColor: 'purple', borderWidth: 0.2, justifyContent: 'space-around', alignItems: 'center' }}>
          <Ionicons name="shield-checkmark" size={20} color={'purple'} />
          <Text>Real-Time Count</Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>0.00</Text>
        <View style={{ height: 25, width: '95%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <Text>Upgrade VIP lavel to increase the rebate rebate</Text></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ height: 45, width: '45%', backgroundColor: 'white', justifyContent: 'center', borderRadius: 2, marginVertical: 10, paddingHorizontal: 10 }}>
            <Text>Today Rebate</Text>
            <Text style={{ color: 'red' }}>0</Text>
          </View>
          <View style={{ height: 45, width: '45%', backgroundColor: 'white', justifyContent: 'center', borderRadius: 2, marginVertical: 10, paddingHorizontal: 10 }}>
            <Text>Today Rebate</Text>
            <Text style={{ color: 'red' }}>0</Text>
          </View>
        </View>
        <Text>Automatic code washing at 1:00:00 every morning</Text>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>One Click Rebate</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Rebate History</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              <View style={styles.header}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{item.type}</Text>
                </TouchableOpacity>
                <Text>{item.date}</Text>
                <Text style={styles.statusCompleted}>{item.status}</Text>
              </View>

              {/* Deposit History Card */}
              <View style={styles.depositHistoryCard}>
                <View style={styles.historyRow}>
                  <Text style={styles.historyText}>Betting Rebate</Text>
                  <Text style={styles.historyAmount}>{item.rebate}</Text>
                </View>

                <View style={styles.historyRow}>
                  <Text style={styles.historyText}>Rebate Rate</Text>
                  <Text style={styles.historyAmount}>{item.rebateRate}</Text>
                </View>

                <View style={styles.historyRow}>
                  <Text style={styles.historyText}>Rebate Amount</Text>
                  <Text style={styles.historyAmount}>{item.rebateAmount}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />


    </ScrollView>
  )
}

export default BettingRebate

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    marginVertical: 10,
    alignSelf: 'center'
  },
  container: {
    height: SCREEN_HEIGHT * 0.24,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    backgroundColor: '#e1edf0',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  cardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#50C878',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: 5,
    borderRadius: 7,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  statusCompleted: {
    marginLeft: 10,
    fontSize: 16,
    color: 'green',
  },
  depositHistoryCard: {
    height: SCREEN_HEIGHT * 0.28,
    width: SCREEN_WIDTH * 0.85,
    borderTopWidth: 0.4,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  historyText: {
    fontSize: 16,
    color: 'black',
  },
  historyAmount: {
    color: 'black',
    fontSize: 18,
  },

})