import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/Constants/Screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { Colors } from '../../components/Constants/Colors';
import { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const LevelScreen = () => {
  const navigation = useNavigation()
  const [selectedButton, setSelectedButton] = useState(1)
  const [showHistory, setShowHistory] = useState(true)
  const [showRules, setShowRules] = useState(false)
  const [currentPage, setCurrentPage] = useState(0);
  const [userInformation, setUserInformation] = useState([])
  const [currentLevel, setCurrentLevel] = useState('')
  const [info, setInfo] = useState([])
  const [tempData, setTempData] = useState({ levelup: 50, monthly: 25, exp: 3000 })
  const [userLevel, setUserLevel] = useState('')
  const [fixedLevelData, setFixedLevelData] = useState([
    { levelup: 50, monthly: 25, exp: 3000 },
    { levelup: 150, monthly: 75, exp: 30000 },
    { levelup: 400, monthly: 200, exp: 500000 },
    { levelup: 1000, monthly: 500, exp: 5000000 },
    { levelup: 4000, monthly: 3000, exp: 10000000 },
    { levelup: 15000, monthly: 4000, exp: 80000000 },
    { levelup: 60000, monthly: 15000, exp: 300000000 },
    { levelup: 150000, monthly: 65000, exp: 1000000000 },
    { levelup: 700000, monthly: 170000, exp: 5000000000 },
    { levelup: 1700000, monthly: 700000, exp: 9999999999 }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          navigation.navigate('Login')
          return;
        }
        const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
          headers: {
            "Authorization": JSON.parse(token),
          },
        });
        console.log(response.data);
        setUserLevel(response.data.level)
        setUserInformation(response.data.user_level);
        setInfo(response.data)
        setCurrentLevel(response.data.user_level.levels["1"])



      } catch (error) {
        console.error('Error fetching user data in  Level Screen:', error);
      }
    };

    fetchData();
  }, []);

  // console.log(currentLevel.level_reward);
  // const isDisabled = currentLevel.level_reward
  // const progress1 = userInformation.exp;
  // const progress2 = tempData.exp;
  // const totalProgress = progress1 / progress2;


  // console.log(isDisabled);

  // console.log(userInformation);


  const handleHistory = () => {
    setSelectedButton(1)
    setShowHistory(true)
    setShowRules(false)
  }
  const handleRules = () => {
    setSelectedButton(2)
    setShowRules(true)
    setShowHistory(false)
  }

  const handleScroll = (event) => {

    const { x } = event.nativeEvent.contentOffset;
    const page = Math.round(x / Dimensions.get('window').width);
    if (page !== currentPage) {
      setCurrentPage(page);
      setCurrentLevel(userInformation.levels[`${page + 1}`])
      setTempData(fixedLevelData[page]);

    }
    setCurrentPage(page);
    setCurrentLevel(userInformation.levels[`${page + 1}`])
    setTempData(fixedLevelData[page])
  };

  const handleLevelUp = () => {

  }



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>


      <View style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.99, backgroundColor: '#d6aa7f', alignSelf: 'center' }}>
        {/* *****************This is for back navigation */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}><TouchableOpacity
          onPress={() => navigation.navigate('Account')}
          style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: Colors.gray }}>
          <Ionicons name='return-up-back' color={'black'} size={24} />
        </TouchableOpacity>
          <Text style={{ fontWeight: '900', marginBottom: 1, fontSize: 20, color: Colors.purple, marginLeft: 30 }}>Level</Text></View>

        {/* *******************This is for Avatar and Level check*************** */}
        <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.97, alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 120 }}><Image source={require('../../assets/player.png')} /></View>
          <View><Text style={{ fontWeight: 'bold', color: 'black' }}>LEVEL {userLevel}</Text><Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>{info.username}</Text></View>
        </View>
        <View style={{ height: 70, width: SCREEN_WIDTH * 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
          <View style={{ height: 60, width: '45%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 2 }}>
            <Text style={{ color: '#d6aa7f', fontWeight: 'bold' }}>{userInformation?.exp} EXP</Text>
            <Text style={{ marginVertical: 5 }}>My Experience</Text>

          </View>
          <View style={{ height: 60, width: '45%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 2 }}>
            <Text>  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}> 30</Text> Days</Text>
            <Text style={{ marginVertical: 5 }}>Payout Time</Text>

          </View>
        </View>
      </View>
      <View style={{ marginTop: 40, height: 25, width: SCREEN_WIDTH * 0.9, alignSelf: 'center', borderWidth: 0.5, borderColor: 'grey', padding: 3, borderRadius: 5, justifyContent: 'center' }}><Text style={{ textAlign: 'center', fontSize: 12 }}>Level rewards are settled at 2:00 am on the 1st of every month</Text></View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: SCREEN_WIDTH * 0.971, alignSelf: 'center' }} onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
        <LinearGradient colors={['#a6b7d0', '#95a8c5', '#93a8c5',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>

            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 1</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 1 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>{tempData.exp}EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>

            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star1.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 1</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#93a8c5' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{tempData.exp} EXP can be levelled up</Text>

          </View>

        </LinearGradient>
        <LinearGradient colors={['#f8bd83', '#eca967', '#e39950',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>


            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 2</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 2 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>{tempData.exp}EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>
            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star2.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 2</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e39950' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{tempData.exp} EXP can be levelled up</Text>
          </View>
        </LinearGradient>
        <LinearGradient colors={['#ffa493', '#ff8c84', '#ff7878',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>


            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 3</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 3 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>{tempData.exp}EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>
            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star2.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 3</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff7878' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{tempData.exp} EXP can be levelled up</Text>
          </View>
        </LinearGradient>
        <LinearGradient colors={['#a6b7d0', '#95a8c5', '#93a8c5',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>


            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 4</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 4 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>{tempData.exp}EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>
            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star1.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 4</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#93a8c5' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{tempData.exp} EXP can be levelled up</Text>
          </View>
        </LinearGradient>
        <LinearGradient colors={['#f8bd83', '#eca967', '#e39950',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>


            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 5</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 5 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>3000EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 15 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>
            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star2.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 5</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e39950' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{tempData.exp} EXP can be levelled up</Text>
          </View>
        </LinearGradient>
        <LinearGradient colors={['#ffa493', '#ff8c84', '#ff7878',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>


            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 6</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 6 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>{tempData.exp}EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>
            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star2.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 6</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff7878' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{tempData.exp} EXP can be levelled up</Text>
          </View>
        </LinearGradient>
        <LinearGradient colors={['#a6b7d0', '#95a8c5', '#93a8c5',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>


            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 7</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 7 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>{tempData.exp} EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>
            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star1.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 7</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#93a8c5' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{tempData.exp} EXP can be levelled up</Text>
          </View>
        </LinearGradient>

        <LinearGradient colors={['#f8bd83', '#eca967', '#e39950',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>


            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 8</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 8 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>{tempData.exp}EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>
            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star2.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 8</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e39950' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{tempData.exp} EXP can be levelled up</Text>
          </View>
        </LinearGradient>
        <LinearGradient colors={['#ffa493', '#ff8c84', '#ff7878',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>


            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 9</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 9 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>{tempData.exp}EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>
            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star2.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 9</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff7878' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation?.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{tempData.exp} EXP can be levelled up</Text>
          </View>
        </LinearGradient>
        <LinearGradient colors={['#f8bd83', '#eca967', '#e39950',]} style={styles.vipCard}>
          <View style={{ height: '60%', width: '100%', flexDirection: 'row', }}>


            <View style={{ width: '70%', }}>
              <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/vipcard/image1.png')} style={{ height: 30, width: 30 }} />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>LEVEL 10</Text>
                <Image source={require('../../assets/vipcard/image2.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {userInformation.exp < tempData.exp ? (
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 10 }}>
                    Not Open yet
                  </Text>
                ) : (
                  <Text style={{ color: 'white', marginLeft: 10 }}>Completed</Text>
                )}
              </View>

              <View>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Upgrading LEVEL 10 requires</Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginVertical: 5 }}>{tempData.exp} EXP</Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2, width: 80, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Bet ₹1=1EXP</Text>
              </View>
              {/* <Progress.Bar progress={totalProgress} width={320} color='green' /> */}

            </View>
            <View style={{ width: '35%', alignItems: 'center', height: '70%', }}>
              <Image source={require('../../assets/vipcard/star2.png')} style={{ height: 70, width: 70, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 20, marginLeft: 20 }}>LEVEL 10</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ borderWidth: 1, padding: 2, width: 'auto', borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e39950' }}>
              <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{userInformation?.exp}/{tempData.exp}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', width: 'auto' }}>{tempData.exp} EXP can be levelled up</Text>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* ********************* Here is a flatlist card********************* */}
      <View style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.94, backgroundColor: 'white', marginTop: 10, borderRadius: 15, alignSelf: 'center', elevation: 2 }}>
        <View style={{ width: SCREEN_WIDTH * 0.9, flexDirection: 'row', alignItems: 'center', height: 40, marginHorizontal: 10, marginTop: 8 }}>
          <Image source={require('../../assets/diamond.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
          <Text style={{ color: 'grey', fontWeight: '700', fontSize: 18 }}>Level{currentPage + 1} Benefit Level</Text>
        </View>
        <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', marginVertical: 10 }}></View>

        <View style={{ height: SCREEN_HEIGHT * 0.1, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: '20%', marginLeft: 4 }}>
            <Image source={require('../../assets/levelUp.png')} style={{ height: 60, width: 60 }} />
          </View>
          <View style={{ width: '55%', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Level up Rewards</Text>
            <Text style={{ fontSize: 12, marginTop: 6, width: '90%' }}>Each account can receive only 1 time</Text>
          </View>
          <Text style={{ color: 'black' }}>{currentLevel.level_reward}</Text>

          <View style={{ width: '20%' }}>
            <TouchableOpacity
              // disabled={!isDisabled}
              onPress={handleLevelUp}
              style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 2, justifyContent: 'center', borderRadius: 10, marginBottom: 5 }}>
              <Image source={require('../../assets/vipWallet.png')} style={{ height: 15, width: 15, marginRight: 5 }} />
              <Text>{tempData.levelup}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 2, justifyContent: 'center', borderRadius: 10 }}>
              <Image source={require('../../assets/diamond.png')} style={{ height: 15, width: 15, marginRight: 5 }} />
              <Text>00</Text>
            </View>
          </View>

        </View>

        <View style={{ height: SCREEN_HEIGHT * 0.1, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: '20%', marginLeft: 4 }}>
            <Image source={require('../../assets/monthlyReward.png')} style={{ height: 60, width: 60 }} />
          </View>
          <View style={{ width: '55%', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Monthly Rewards</Text>
            <Text style={{ fontSize: 12, marginTop: 6, width: '90%' }}>Each account can receive only 1 time per month</Text>
          </View>
          <View style={{ width: '20%' }}>
            <View style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 2, justifyContent: 'center', borderRadius: 10, marginBottom: 5 }}>
              <Image source={require('../../assets/vipWallet.png')} style={{ height: 15, width: 15, marginRight: 5 }} />
              <Text>{tempData.monthly}</Text>
            </View>
            <View style={{ flexDirection: 'row', height: '15', width: '100%', alignItems: 'center', borderColor: 'red', borderWidth: 0.5, padding: 2, justifyContent: 'center', borderRadius: 10 }}>
              <Image source={require('../../assets/diamond.png')} style={{ height: 15, width: 15, marginRight: 5 }} />
              <Text>00</Text>
            </View>
          </View>

        </View>


      </View>

      <View style={{ height: 50, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', marginVertical: 10, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={handleHistory}
          style={{
            width: '50%', height: '100%', backgroundColor: selectedButton == 1 ? '#d6aa7f' : 'white',
            borderTopStartRadius: 10, borderBottomStartRadius: 10, justifyContent: 'center', alignItems: 'center'
          }}>
          <Text style={{ color: selectedButton == 1 ? 'white' : 'black', fontWeight: '700', fontSize: 18 }}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRules}
          style={{
            width: '50%', height: '100%', backgroundColor: selectedButton == 2 ? '#d6aa7f' : 'white',
            borderTopEndRadius: 10, borderBottomEndRadius: 10, justifyContent: 'center', alignItems: 'center'
          }}>
          <Text style={{ color: selectedButton == 2 ? 'white' : 'black', fontWeight: '700', fontSize: 18 }}>Rules</Text>
        </TouchableOpacity>

      </View >
      {/* ************************************************************************/}

      {
        showHistory ? <>
          <View style={{ flex: 1, marginBottom: 20 }}>

            {/* <View style={styles.smallCard}>
              <Text style={{ color: 'orange', fontWeight: '500', fontSize: 16, marginVertical: 5 }}>Level maintenance</Text>
              <Text style={{ color: '#3a9fbf', marginBottom: 5 }}>Level maintenance status not complete [0% complete]</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>2023-12-05 06:40:05</Text>
                <Text>-250000 EXP</Text>

              </View>
            </View> */}


            {/* <TouchableOpacity
              onPress={() => alert('View ALl')}
              style={{ height: 45, width: SCREEN_WIDTH * 0.95, backgroundColor: 'red', alignSelf: 'center', marginVertical: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: 'white' }}>View All</Text>
            </TouchableOpacity> */}
          </View>
        </> : <>
          <View style={{ height: SCREEN_HEIGHT * 1, marginBottom: 20 }}>

            <Text>These are the rules</Text>
          </View>

        </>
      }


    </ScrollView >
  )
}

export default LevelScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    alignSelf: 'center'

  }, smallCard: { height: SCREEN_HEIGHT * 0.12, width: SCREEN_WIDTH * 0.95, alignSelf: 'center', backgroundColor: 'white', elevation: 1, justifyContent: 'center', padding: 10, marginBottom: 10 },
  vipCard: {
    borderRadius: 10,
    height: 180, width: 340,
    backgroundColor: 'blue', marginVertical: 10, padding: 5, alignSelf: 'center', marginHorizontal: 4
  }
})