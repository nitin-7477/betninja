import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MainSlider from '../components/sliders/MainSlider';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import { Colors } from '../components/Constants/Colors';
import MessageComponent from '../components/service center/GoogleAuthentication';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Main() {
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [recentWinners, setRecentWinners] = useState([]);
  const [userInformation, setUserInformation] = useState([]);
  const [flatListIndex, setFlatListIndex] = useState(0);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          alert('Token Expired');
          navigation.navigate('Login');
          return;
        }
        console.log(process.env.SERVERURL);
        const response = await axios.get(`${process.env.SERVERURL}/api/auth/user`, {
          headers: {
            "Authorization": JSON.parse(token),
          },
        });
        setUserInformation(response.data);
      } catch (error) {
        console.error('Error fetching user data in Main FIle:', error.response);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchRecentWinners = async () => {
      try {
        const response = await axios.get(`${process.env.SERVERURL}/api/bet/recentWinner`);
        setRecentWinners(response.data.data);
      } catch (error) {
        console.error('Error fetching recent winners:', error);
      }
    };


    fetchRecentWinners();

    const intervalId = setInterval(() => {
      fetchRecentWinners();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);


  const recentWinnersData = [
    {
      name: 'JackpotJester', amount: '₹500', game: 'rapid fire',
      image: require('../assets/player.png')
    },

  ];

  const top10ListsData = [
    { rank: 1, name: 'JackpotJester', earnings: '₹3,180,233', image: require('../assets/casino-player.png') },
    { rank: 2, name: 'VelvetVegas', earnings: '₹3,14,233', image: require('../assets/casino-player.png') },
    { rank: 3, name: 'GoldenGambit', earnings: '₹2,80,233', image: require('../assets/casino-player.png') },
    { rank: 4, name: 'DiamondDasher', earnings: '₹1,10,233', image: require('../assets/casino-player.png') },
    { rank: 5, name: 'Player 5', earnings: '₹12000', image: require('../assets/casino-player.png') },
    { rank: 6, name: 'LuckyRoller', earnings: '₹9500', image: require('../assets/casino-player.png') },
    { rank: 7, name: 'Player 7', earnings: '₹12000', image: require('../assets/casino-player.png') },
    { rank: 8, name: 'LuckChaser', earnings: '₹9500', image: require('../assets/casino-player.png') }, { rank: 9, name: 'Player 9', earnings: '₹12000', image: require('../assets/casino-player.png') },
    { rank: 10, name: 'Queen', earnings: '₹9500', image: require('../assets/casino-player.png') },
    // Add more top 10 lists data
  ];

  // const scrollFlatList = () => {
  //   if (flatListRef.current) {
  //     flatListRef.current.scrollToIndex({
  //       animated: true,
  //       index: (flatListIndex + 1) % recentWinners.length,
  //     });
  //     setFlatListIndex((prevIndex) => (prevIndex + 1) % recentWinners.length);
  //   }
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     scrollFlatList();
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  // }, [flatListIndex]);


  // Sample data for game icons
  const gameIconsData = [

    { name: 'Rapid Fire', icon: require('../assets/casino-game.png') },
    { name: '1 Min Win', icon: require('../assets/casino-game.png') },
    { name: '3 Min Win', icon: require('../assets/casino-game.png') },
    { name: '5 Min Win', icon: require('../assets/casino-game.png') },

    // Add more game icons with their images
  ];

  const handleJumpToGameScreen = (index) => {

    navigation.navigate('Gamescreen', index);
  }


  const renderGameIcon = ({ item, index }) => (

    <TouchableOpacity style={styles.gameIconContainer}
      onPress={() => handleJumpToGameScreen(index)}>

      <Image source={item.icon} style={styles.gameIcon} />
      <Text style={styles.gameIconText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../image/b2.jpg')} // Replace with your gaming-themed background image
        style={styles.backgroundImage}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>

          <Image
            source={require('../image/1.jpg')} // Replace with your gaming-themed background image
            style={{ height: 50, width: 130 }}
          />

          <Text style={styles.headerSubtitle}>Desire comes to reality</Text>
        </View>
      </View>
      <View style={{ borderRadius: 10 }}>
        <MainSlider />
      </View>

      {/* Information Section */}
      <View style={styles.informationSection}>
        <View style={{ width: SCREEN_WIDTH * 0.75 }}>
          <MessageComponent /></View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationFile')}
          style={{ height: 25, width: 45, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>Details</Text>
        </TouchableOpacity>
      </View>

      {/* Game Icons */}
      <View style={styles.iconSection}>
        <Text style={styles.iconSectionTitle}>Available Games</Text>
        <FlatList
          data={gameIconsData}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderGameIcon}
        />
      </View>

      {/* Recent Winners */}
      <View style={styles.section}>
        <Text style={{ color: 'black', textAlign: 'center', marginVertical: 10, fontWeight: 'bold', fontSize: 18 }}>Recent Winners</Text>
        <FlatList
          // ref={flatListRef}
          horizontal
          data={recentWinners}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recentWinner}>
              <Image source={require('../assets/player.png')} style={{ height: 60, width: 60 }} />
              <Text style={{ color: Colors.black, fontWeight: '500', marginVertical: 3 }}>
                {item.username.length > 10 ? item.username.slice(0, 10) + '...' : item.username}
              </Text>
              <View style={{ borderBottomWidth: 0.3, width: '100%', marginVertical: 10, borderColor: Colors.fontGray }}></View>
              <Text style={{ color: 'red', fontWeight: 'bold' }}> ₹{item.win_loss}</Text>
              <Text style={{ color: Colors.fontGray, fontWeight: '500' }}>win {item.dataType} win</Text>
            </View>
          )}
          onMomentumScrollEnd={(event) => {
            // Update the current index when scrolling ends
            const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            setFlatListIndex(index);
          }}
          scrollEnabled={false}
        />
      </View>

      {/* Top 10 Lists */}
      <View style={styles.section2}>
        <Text style={{ color: 'black', textAlign: 'center', marginVertical: 10, fontWeight: 'bold', fontSize: 18 }}>Top 10 Lists</Text>
        <FlatList

          data={top10ListsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.top10}>
              <View style={{ justifyContent: 'start', flexDirection: 'row', alignItems: 'center', width: '75%', }}>

                <Image source={item.image} style={{ height: 30, width: 30, marginRight: 20 }} />
                <View style={{ justifyContent: 'start', }}>
                  <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                  <Text style={{ fontWeight: 'bold', color: 'green' }}>No.{item.rank}</Text>
                </View>
              </View>
              <Text style={{ color: 'black', fontWeight: '800', fontSize: 14 }}>{item.earnings}</Text>

            </View>

          )}

        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: SCREEN_WIDTH * 1,

  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: SCREEN_HEIGHT * 0.89,
    resizeMode: 'cover',
    position: 'absolute', // Position the background image
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10, justifyContent: 'center'
  },
  headerTextContainer: {
    width: SCREEN_WIDTH * 1, alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    color: 'white',
    fontSize: 30,
  },
  headerSubtitle: {
    color: 'yellow',
    fontSize: 14,
    marginVertical: 10
  },
  iconSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
  },
  iconSectionTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  gameIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: Colors.white,
    padding: 5,
    width: '30%',
    borderRadius: 15,
    height: SCREEN_HEIGHT * 0.14
  },
  gameIcon: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 5,
    resizeMode: 'contain'
  },
  gameIconText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold'
  },
  informationSection: {
    backgroundColor: Colors.lightGray,
    padding: 5,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.97,
    alignSelf: 'center',
    alignItems: 'center'
  },

  informationText2: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 1,
    lineHeight: 20,
    color: 'black'
  },

  section: {
    backgroundColor: 'white',
    padding: 10,
    // margin: 10,
    borderRadius: 10,
    marginTop: 30,

  },
  section2: {
    backgroundColor: 'white',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 0

  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  winnerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  winnerName: {
    color: 'white',
  },
  winnerAmount: {
    color: 'yellow',
  },
  winnerGame: {
    color: 'white',
  },
  top10:
  {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 1,
    backgroundColor: '#FAFAFA',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH * 0.93,
    borderRadius: 5,
    height: SCREEN_HEIGHT * 0.07,
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2

  },
  recentWinner: {
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: Colors.lightGray,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH * 0.3,
    borderRadius: 15,
    height: SCREEN_HEIGHT * 0.2
  },
  top10Rank: {
    color: 'white',
    width: 30,
  },
  top10Name: {
    color: 'white',
  },
  top10Earnings: {
    color: 'yellow',
  },
});

;
