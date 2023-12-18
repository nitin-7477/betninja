import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/Colors';
import { Ionicons, Entypo, AntDesign, EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Constants/Screen';

const Setting = () => {
  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Setting</Text>
      </View>
      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <View style={{ height: 60, width: 60, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: Colors.fontGray, borderWidth: 1 }}>
            <Image source={require('../../assets/casino-player.png')} style={{ height: 40, width: 40 }} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500' }}>Change Avatar</Text>
            <Feather name='chevron-right' size={20} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500' }}>NickName</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500' }}>Nitin Gautam</Text>
            <Feather name='chevron-right' size={20} />
          </View>
        </View>
        <View style={{ width: SCREEN_WIDTH * 0.77, borderBottomWidth: 0.2, borderColor: Colors.fontGray, marginVertical: 30, alignSelf: 'center' }}>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500' }}>UID</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>747723</Text>
            <Feather name='copy' size={20} color={Colors.fontGray} />
          </View>
        </View>

      </View>

      <TouchableOpacity style={styles.history}>
        <View style={{ flexDirection: 'row' }}>
          <Feather name='lock' size={20} color={Colors.fontGray} />
          <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Login password</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Edit</Text>
          <Feather name='chevron-right' size={20} color={Colors.fontGray} />
        </View>

      </TouchableOpacity>

      <TouchableOpacity style={styles.history}>
        <View style={{ flexDirection: 'row' }}>
          <Feather name='mail' size={20} color={Colors.fontGray} />
          <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Bind MailBox</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>to bind</Text>
          <Feather name='chevron-right' size={20} color={Colors.fontGray} />
        </View>

      </TouchableOpacity>

      <TouchableOpacity style={styles.history}>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name='domain-verification' size={25} color={Colors.fontGray} />
          <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Google Verificationn</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 13, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>unOpened</Text>
          <Feather name='chevron-right' size={20} color={Colors.fontGray} />
        </View>

      </TouchableOpacity>

      <TouchableOpacity style={styles.history}>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name='system-update' size={25} color={Colors.fontGray} />
          <Text style={{ marginLeft: 10, fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>Updated Version</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, color: Colors.fontGray, fontWeight: '500', marginRight: 10 }}>1.2.3</Text>
          <Feather name='chevron-right' size={20} color={Colors.fontGray} />
        </View>

      </TouchableOpacity>


    </ScrollView>
  )
}

export default Setting

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
    height: SCREEN_HEIGHT * 0.33,
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
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.88,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginVertical: 7,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
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