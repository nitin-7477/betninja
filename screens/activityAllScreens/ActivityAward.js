import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { Colors } from '../../components/Constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";



const ActivityAward = () => {
  const navigation = useNavigation();
  data = [{ id: 10, total: 4999, amount: 5000000 },
  { id: 9, total: 2999, amount: 2000000 },
  { id: 8, total: 1111, amount: 1000000 },
  { id: 7, total: 581, amount: 600000 },
  { id: 6, total: 281, amount: 300000 },
  { id: 5, total: 181, amount: 100000 },
  { id: 4, total: 99, amount: 50000 },
  { id: 3, total: 29, amount: 10000 },
  { id: 2, total: 19, amount: 5000 },
  { id: 1, total: 9, amount: 1000 },

  ]
  return (
    <ScrollView style={styles.container}>

      <View style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 1, backgroundColor: "chocolate" }}>
        {/* **********navigation********** */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, paddingHorizontal: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Activity')}
            style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
            <Ionicons name='return-up-back' color={'white'} size={30} />
          </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.white, marginLeft: 70 }}>Activity Award</Text></View>
        <View style={{ flexDirection: 'row', marginTop: 20, padding: 10 }}>
          <Image source={require('../../assets/activityAward.png')} style={{ height: 100, width: 100 }} />
          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 15 }}>Activity Award</Text>
            <Text style={{ width: '28%', color: 'white' }}>Complete weekly/daily tasks to receive rich rewards weekly rewards cannot be accumulated to the next week,daily rewards cannot be accumulated to the next day</Text>
          </View>
        </View>



      </View>
      {/* *********************main Card********************** */}


      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{
            height: SCREEN_HEIGHT * 0.3,
            width: SCREEN_WIDTH * 0.95,
            marginVertical: 10,
            backgroundColor: Colors.lightGray,
            alignSelf: 'center',
            borderRadius: 10,
            elevation: 1
          }}>
            <View style={{
              height: SCREEN_HEIGHT * 0.07,
              width: SCREEN_WIDTH * 0.95,
              backgroundColor: Colors.lightblue,
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 5
            }}>
              <View style={{
                height: 50,
                width: 150,
                backgroundColor: 'purple',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopStartRadius: 10,
                borderBottomEndRadius: 10
              }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Weekly Tasks</Text>
              </View>
              <Text>Unfinished</Text>
            </View>

            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
              <Text>Bettin Bonus {item.id}   <Text style={{ color: 'purple' }}>0/1000</Text></Text>
            </View>
            <View style={{ borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 20 }}></View>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Award Amount</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'red' }}>Rs {item.amount}.00</Text>
              </View>
            </View>
            <TouchableOpacity style={{
              width: SCREEN_WIDTH * 0.9,
              height: SCREEN_HEIGHT * 0.05,
              borderColor: 'red',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: 'red'
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>To Complete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </ScrollView>
  )
}

export default ActivityAward

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 1,
    alignSelf: 'center'
  }
})