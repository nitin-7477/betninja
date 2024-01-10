import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { Colors } from '../../components/Constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";



const data = [
  {
    id: '1',
    bonusTitle: 'Bonus 1',
    bonusAmount: 'Rs 55.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 333.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },
  {
    id: '2',
    bonusTitle: 'Bonus 2',
    bonusAmount: 'Rs 919.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 5553.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },
  {
    id: '3',
    bonusTitle: 'Bonus 3',
    bonusAmount: 'Rs 919.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 3455.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },
  {
    id: '4',
    bonusTitle: 'Bonus 4',
    bonusAmount: 'Rs 239.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 43.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },
  {
    id: '5',
    bonusTitle: 'Bonus 5',
    bonusAmount: 'Rs 9349.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 55345.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },
  {
    id: '6',
    bonusTitle: 'Bonus 6',
    bonusAmount: 'Rs 995.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 5455.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },
  {
    id: '7',
    bonusTitle: 'Bonus 7',
    bonusAmount: 'Rs 9339.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 44.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },
  {
    id: '8',
    bonusTitle: 'Bonus 8',
    bonusAmount: 'Rs 696.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 425.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },

  {
    id: '9',
    bonusTitle: 'Bonus 9',
    bonusAmount: 'Rs 659.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 5455.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },

  {
    id: '10',
    bonusTitle: 'Bonus 10',
    bonusAmount: 'Rs 3329.00',
    numberOfInvitees: 1,
    rechargePerPerson: 'Rs 55.00',
    inviteesStatus: '0/1',
    depositNumberStatus: '0/1',
  },

  // Add more data as needed
];
const InvitationBonus = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container1}>

      <View style={{ height: SCREEN_HEIGHT * 0.32, width: SCREEN_WIDTH * 1, backgroundColor: "chocolate" }}>
        {/* **********navigation********** */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, paddingHorizontal: 10 }}><TouchableOpacity
          onPress={() => navigation.navigate('Activity')}
          style={{ height: 40, width: 40, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Ionicons name='return-up-back' color={'white'} size={30} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 10, fontSize: 20, color: Colors.white, marginLeft: 70 }}>Invitation Bonus</Text></View>
        <View style={{ flexDirection: 'row', marginTop: 20, padding: 10 }}>
          <Image source={require('../../assets/activityAward.png')} style={{ height: 100, width: 100 }} />
          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 15 }}>Invite Friend and Deposite</Text>
            <Text style={{ width: '100%', color: 'white' }}>Both Parties can receive rewards</Text>
            <Text style={{ width: '80%', color: 'white' }}>Invite Friends to register and recharge to receive rewards</Text>
            <Text style={{ width: '80%', color: 'white', marginTop: 10 }}>activity date</Text>
            <Text style={{ width: '80%', color: 'white', fontSize: 20 }}>2023-12-01 - 2023-12-31</Text>
          </View>
        </View>



      </View>
      {/* *********************main Card********************** */}
      <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', backgroundColor: 'white', elevation: 2, marginTop: -20, borderRadius: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
        <View style={{
          height: 100, width: '50%',
          borderRadius: 10, justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{ height: 40, width: 40, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

            <Image source={require('../../assets/reward.png')} style={{ height: 30, width: 30, borderRadius: 10 }} />

          </View>
          <Text style={{ marginTop: 5, color: 'black', fontWeight: '600' }}>Invitaion reward rules</Text>
        </View>
        <View style={{
          height: 100, width: '50%',
          borderRadius: 10, justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{ height: 40, width: 40, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

            <Image source={require('../../assets/reward.png')} style={{ height: 30, width: 30, borderRadius: 10 }} />

          </View>
          <Text style={{ marginTop: 5, color: 'black', fontWeight: '600' }}>Invitaion record</Text>
        </View>

      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              <View style={styles.header}>
                <View style={styles.bonusTitleContainer}>
                  <Text style={styles.bonusTitleText}>{item.bonusTitle}</Text>
                </View>
                <Text style={styles.bonusAmountText}>{item.bonusAmount}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>Number of Invitees</Text>
                  <Text style={styles.detailText}>{item.numberOfInvitees}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>Recharge per People</Text>
                  <Text style={styles.detailText}>{item.rechargePerPerson}</Text>
                </View>

                <View style={styles.separator}></View>

                <View style={styles.statusContainer}>
                  <View style={styles.statusItem}>
                    <Text style={styles.statusNumber}>{item.inviteesStatus}</Text>
                    <Text>Number of Invitees</Text>
                  </View>
                  <View style={styles.statusItem}>
                    <Text style={styles.statusNumber}>{item.depositNumberStatus}</Text>
                    <Text>Deposit Number</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Unfinished</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />


    </ScrollView>
  )
}

export default InvitationBonus

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingHorizontal: 1,
    alignSelf: 'center'

  },
  container: {
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH * 0.95,
    marginVertical: 10,
    backgroundColor: Colors.lightGray,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  cardContainer: {
    flex: 1,
  },
  header: {
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
  bonusTitleContainer: {
    height: 50,
    width: 150,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  bonusTitleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bonusAmountText: {
    color: 'red',
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    color: 'black',
  },
  separator: {
    borderBottomWidth: 0.2,
    borderColor: Colors.fontGray,
    marginVertical: 20,
  },
  statusContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusNumber: {
    fontSize: 18,
    color: 'red',
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

})