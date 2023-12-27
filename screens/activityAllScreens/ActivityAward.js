import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { Colors } from '../../components/Constants/Colors'

const ActivityAward = () => {
  return (
    <ScrollView style={styles.container}>

      <View style={{ height: SCREEN_HEIGHT * 0.22, width: SCREEN_WIDTH * 1, backgroundColor: "chocolate" }}>
        {/* **********navigation********** */}
        <View>
          <Text>ActivityAward</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20, padding: 10 }}>
          <Image source={require('../../assets/activityAward.png')} style={{ height: 100, width: 100 }} />
          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 15 }}>Activity Award</Text>
            <Text style={{ width: '25%', color: 'white' }}>Complete weekly/daily tasks to receive rich rewards weekly rewards cannot be accumulated to the next week, and daily rewards cannot be accumulated to the next day</Text>
          </View>
        </View>



      </View>
      {/* *********************main Card********************** */}

      <View style={{
        height: SCREEN_HEIGHT * 0.3,
        width: SCREEN_WIDTH * 0.95, marginVertical: 10, backgroundColor: Colors.lightGray, alignSelf: 'center', borderRadius: 10
      }}>
        <View style={{
          height: SCREEN_HEIGHT * 0.07,
          width: SCREEN_WIDTH * 0.95, backgroundColor: Colors.lightblue, alignSelf: 'center', borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 5
        }}>
          <View style={{ height: 50, width: 150, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 10, borderBottomEndRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Weekly Tasks</Text></View>
          <Text>Unfinished</Text>
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10, }}>
          <Text>Bettin Bonus 10   <Text style={{ color: 'purple' }}>0/500000</Text></Text>
        </View>
        <View style={{ borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 20 }}></View>
        <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Award Amount</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>Nitin</Text>
            <Text>Rs 4999.00</Text>
          </View>
        </View>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>To Complete</Text>
        </TouchableOpacity>

      </View>

      <View style={{
        height: SCREEN_HEIGHT * 0.3,
        width: SCREEN_WIDTH * 0.95, marginVertical: 10, backgroundColor: Colors.lightGray, alignSelf: 'center', borderRadius: 10
      }}>
        <View style={{
          height: SCREEN_HEIGHT * 0.07,
          width: SCREEN_WIDTH * 0.95, backgroundColor: Colors.lightblue, alignSelf: 'center', borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 5
        }}>
          <View style={{ height: 50, width: 150, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 10, borderBottomEndRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Weekly Tasks</Text></View>
          <Text>Unfinished</Text>
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10, }}>
          <Text>Bettin Bonus 10   <Text style={{ color: 'purple' }}>0/500000</Text></Text>
        </View>
        <View style={{ borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 20 }}></View>
        <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Award Amount</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>Nitin</Text>
            <Text>Rs 4999.00</Text>
          </View>
        </View>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>To Complete</Text>
        </TouchableOpacity>

      </View>

      <View style={{
        height: SCREEN_HEIGHT * 0.3,
        width: SCREEN_WIDTH * 0.95, marginVertical: 10, backgroundColor: Colors.lightGray, alignSelf: 'center', borderRadius: 10
      }}>
        <View style={{
          height: SCREEN_HEIGHT * 0.07,
          width: SCREEN_WIDTH * 0.95, backgroundColor: Colors.lightblue, alignSelf: 'center', borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 5
        }}>
          <View style={{ height: 50, width: 150, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 10, borderBottomEndRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Weekly Tasks</Text></View>
          <Text>Unfinished</Text>
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10, }}>
          <Text>Bettin Bonus 10   <Text style={{ color: 'purple' }}>0/500000</Text></Text>
        </View>
        <View style={{ borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 20 }}></View>
        <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Award Amount</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>Nitin</Text>
            <Text>Rs 4999.00</Text>
          </View>
        </View>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.05, backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>To Complete</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  )
}

export default ActivityAward

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 1,
  }
})