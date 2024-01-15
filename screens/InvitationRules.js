import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const InvitationRules = () => {
  const tableData = [
    { lvl: 0, teamNumber: 0, teamBettingPer: 0 },
    { lvl: 1, teamNumber: 3, teamBettingPer: 0.07 },
    { lvl: 2, teamNumber: 5, teamBettingPer: 0.08 },
    { lvl: 3, teamNumber: 10, teamBettingPer: 0.09 },
    { lvl: 4, teamNumber: 15, teamBettingPer: 0.095 },
    { lvl: 5, teamNumber: 20, teamBettingPer: 0.1 },
  ];
  const tableData2 = [
    { lvl: 0, tier1: 0, tier2: 0, tier3: '0', tier4: '0' },
    { lvl: 1, tier1: '0.7%', tier2: '0.245%', tier3: '0.1054%', tier4: '0.03%' },
    { lvl: 2, tier1: '0.75%', tier2: '0.2812%', tier3: '0.128%', tier4: '0.0396%' },
    { lvl: 3, tier1: '0.8%', tier2: '0.32%', tier3: '0.1822%', tier4: '0.0512%' },
    { lvl: 4, tier1: '0.9%', tier2: '0.405%', tier3: '0.2144%', tier4: '0.082%' },
    { lvl: 5, tier1: '0.95%', tier2: '0.5%', tier3: '0.25%', tier4: '0.1018%' },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ marginBottom: 20, backgroundColor: 'white', elevation: 5, width: '100%', height: '5%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', }}>InvitationRules</Text>
      </View>
      <View style={{ width: '95%', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>01</Text>
        <Text style={{ color: 'black' }}>There are 6 subordinate levels in inviting friends, If A invite B, then B is a level 1 Subordinate of A. If B invites C, then C is a level 1 subordinate of B and also a level 2 subordinate of A. If C invites D, then D is a level 1 subordinate of C, at the same time a level 2 subordinate of B and also a level 3 subordinate of A.</Text>
      </View>
      <View style={{ width: '95%', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>02</Text>
        <Text style={{ color: 'black' }}>When Inviting friends to register, you must send the invitaion link provided or enter the invitaion code manually so that your friends become  your level 1 subordinates.
        </Text>
      </View>
      <View style={{ width: '95%', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>03</Text>
        <Text style={{ color: 'black' }}>The invitee registers via the inviter&#039;s invitation code and completes the deposit, shortly after that the
          commission will be received immediately.

        </Text>
      </View>
      <View style={{ width: '95%', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>04</Text>
        <Text style={{ color: 'black' }}>The calculation of yesterday&#039;s commission starts every morning at 01:00. After the commission calculation is completed, the commission is rewarded to the wallet and can be viewed through the commission collection record.


        </Text>
      </View>
      <View style={{ width: '95%', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>05</Text>
        <Text style={{ color: 'black' }}>Commission rates vary depending on your agency level
          on that day
          Number of Teams: How many downline deposits you have to date.
          Team Deposits: The total number of deposits made by your downline in one day.
          Team Deposit: Your downline deposits within one day.
        </Text>
      </View>

      <View style={styles.container2}>
        {/* Table headings */}
        <View style={styles.row}>
          <Text style={styles.heading}>Agency LVL</Text>
          <Text style={styles.heading}>Team Number</Text>
          <Text style={styles.heading}>Team Betting per</Text>
          <Text style={styles.heading}>Min Deposit</Text>
        </View>

        {tableData.map((rowData, index) => (
          <View key={index} style={styles.row}>

            <Text style={styles.cell}>LVL {rowData.lvl}</Text>
            <Text style={styles.cell}>{rowData.teamNumber}</Text>
            <Text style={styles.cell}>{rowData.teamBettingPer}</Text>
            <Text style={styles.cell}>$50</Text>
          </View>
        ))}
      </View>

      <View style={{ width: '95%', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>06</Text>
        <Text style={{ color: 'black' }}>The commission percentage depends on the
          membership level. The higher the membership level, the higher the bonus percentage. Different game types also have different payout percentages.

        </Text>
      </View>
      <View style={styles.container2}>
        {/* Table headings */}
        <View style={styles.row}>
          <Text style={styles.heading}>Commission LVL</Text>
          <Text style={styles.heading}>Tier 1</Text>
          <Text style={styles.heading}>Tier 2</Text>

          <Text style={styles.heading}>Tier 3</Text>
          <Text style={styles.heading}>Tier 4</Text>

        </View>

        {tableData2.map((rowData, index) => (
          <View key={index} style={styles.row}>

            <Text style={styles.cell}>LVL {rowData.lvl}</Text>
            <Text style={styles.cell}>{rowData.tier1}</Text>
            <Text style={styles.cell}>{rowData.tier2}</Text>
            <Text style={styles.cell}>{rowData.tier3}</Text>
            <Text style={styles.cell}>{rowData.tier4}</Text>
          </View>
        ))}
      </View>
      <View style={{ width: '95%', alignItems: 'center', marginBottom: 40, height: 100 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>07</Text>
        <Text style={{ color: 'black' }}>TOP20 commission rankings will be randomly awarded with a separate bonus
        </Text>
      </View>
    </ScrollView>
  )
}

export default InvitationRules

const styles = StyleSheet.create({
  container: {
    flex: 1, width: responsiveWidth(96), backgroundColor: 'white', alignSelf: 'center'
  },
  container2: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  heading: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    padding: 8,
    borderWidth: 1,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    borderWidth: 1,
  },
})