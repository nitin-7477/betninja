import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { Colors } from '../../components/Constants/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const ActivityAward = () => {
  const navigation = useNavigation();

  const data = [
    { id: 1, total: 9, amount: 1000, bonus: 1000 },
    { id: 2, total: 19, amount: 5000, bonus: 5000 },
    { id: 3, total: 29, amount: 10000, bonus: 10000 },
    { id: 4, total: 99, amount: 50000, bonus: 50000 },
    { id: 5, total: 181, amount: 100000, bonus: 30000 },
    { id: 6, total: 281, amount: 300000, bonus: 60000 },
    { id: 7, total: 581, amount: 600000, bonus: 100000 },
    { id: 8, total: 1111, amount: 1000000, bonus: 200000 },
    { id: 9, total: 2999, amount: 2000000, bonus: 300000 },
    { id: 10, total: 4999, amount: 5000000, bonus: 500000 },
  ];

  const renderHeader = () => (
    <View style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 1, backgroundColor: "chocolate" }}>
      <View style={{ width: responsiveWidth(100), backgroundColor: 'chocolate', height: responsiveHeight(6), alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10, borderBottomEndRadius: 15, borderBottomStartRadius: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20} color={'white'} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'white', fontWeight: 'bold' }}>Activity Award</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, padding: 10 }}>
        <Image source={require('../../assets/activityAward.png')} style={{ height: 100, width: 100 }} />
        <View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 15 }}>Activity Award</Text>
          <Text style={{ width: '28%', color: 'white' }}>Complete weekly/daily tasks to receive rich rewards weekly rewards cannot be accumulated to the next week, daily rewards cannot be accumulated to the next day</Text>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View>
      {/* Your non-scrollable content at the bottom */}
      {/* ... Your existing footer content ... */}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Weekly Tasks</Text>
        </View>
        <Text>Unfinished</Text>
      </View>
      <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
        <Text style={{ color: 'black' }}>Betting Bonus {item.id}   <Text style={{ color: 'purple' }}>0 /{item.bonus}</Text></Text>
      </View>
      <View style={{ borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 20 }}></View>
      <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: 'black' }}>Award Amount</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'red' }}>Rs {item.amount}.00</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.completeButton}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>To Complete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ActivityAward

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 1,
    alignSelf: 'center'
  }, cardContainer: {
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH * 0.95,
    marginVertical: 10,
    backgroundColor: Colors.lightGray,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 1,
  },
  cardHeader: {
    height: SCREEN_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: Colors.lightblue,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  headerTextContainer: {
    height: 50,
    width: 150,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  completeButton: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    borderColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'red',
  },
})