import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import { Colors } from '../../components/Constants/Colors'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'

const SubOrdinate = () => {

  const navigation = useNavigation();
  const [downline, setDownline] = useState([])
  const [currentPage, setCurrentPage] = useState(1);


  const fetchCommissionData = async () => {
    try {
      // setLoading(true)
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login')
        return;
      }


      var result = await axios.get(`${process.env.SERVERURL}/api/commission/commission`, {

        headers: {
          "Authorization": JSON.parse(token),
        },
      })
      setDownline(result.data.data.downline)



    } catch (e) {
      console.log("ERROR IN FETCHING for subordinate", e);
    }

  }

  useEffect(() => {
    fetchCommissionData();
  }, [currentPage]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleData = downline.slice(startIndex, endIndex);




  console.log("This is downline data", downline);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ width: responsiveWidth(100), backgroundColor: 'white', height: responsiveHeight(6), alignItems: 'center', flexDirection: 'row', elevation: 5, paddingHorizontal: 10, shadowColor: 'black', marginBottom: 10 }}>
        <AntDesign name='left' size={20} color={'black'} style={{ fontWeight: 'bold' }} />
        <Text style={{ marginLeft: 30, fontSize: 16, color: 'black', fontWeight: 'bold' }}>Subordinate Data</Text>
      </View>

      <FlatList data={visibleData} renderItem={({ item }) => {
        return <View style={{ width: responsiveWidth(97), height: 'auto', backgroundColor: 'white', marginVertical: 2, alignSelf: 'center', borderRadius: 5, paddingHorizontal: 6, elevation: 1, paddingVertical: 5 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>User Name</Text>
            <Text style={{ color: 'black' }}>{item?.userId?.username}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Email ID</Text>
            <Text style={{ color: 'black' }}>{item?.userId?.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Join Date</Text>
            <Text style={{ color: 'black' }}>{new Date(item.joinDate).toLocaleString()}</Text>
          </View>



        </View>
      }} />

      <View style={styles.paginationContainer} >
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <Text style={styles.paginationButtonText}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.paginationText}>{currentPage}</Text>

        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={endIndex >= downline.length}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

export default SubOrdinate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center', width: responsiveWidth(100)
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    // backgroundColor: 'red',
    position: 'relative',
    bottom: 0

  },
  paginationButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  paginationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
})