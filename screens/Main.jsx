import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MainSlider from '../components/sliders/MainSlider';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/Constants/Screen';
import { Colors } from '../components/Constants/Colors';
import MessageComponent from '../components/service center/GoogleAuthentication';

export default function Main() {
  const navigation = useNavigation();
  // Sample data for recent winners and top 10 lists
  const recentWinnersData = [
    {
      name: 'Player 1', amount: '$500', game: 'Slot Machine',
      image: require('../assets/player.png')
    },
    {
      name: 'Player 2', amount: '$1000', game: 'Roulette',
      image: require('../assets/player.png')
    },
    {
      name: 'Player 3', amount: '$3000', game: 'Slot Machine',
      image: require('../assets/player.png')
    },
    {
      name: 'Player 4', amount: '$500', game: 'Slot Machine',
      image: require('../assets/player.png')
    },
    {
      name: 'Player 5', amount: '$1000', game: 'Roulette',
      image: require('../assets/player.png')
    },
    {
      name: 'Player 6', amount: '$3000', game: 'Slot Machine',
      image: require('../assets/player.png')
    },
    // Add more recent winners data
  ];

  const top10ListsData = [
    { rank: 1, name: 'Player 1', earnings: '$12000', image: require('../assets/casino-player.png') },
    { rank: 2, name: 'Player 2', earnings: '$9500', image: require('../assets/casino-player.png') },
    { rank: 1, name: 'Player 3', earnings: '$12000', image: require('../assets/casino-player.png') },
    { rank: 2, name: 'Player 4', earnings: '$9500', image: require('../assets/casino-player.png') }, { rank: 1, name: 'Player 5', earnings: '$12000', image: require('../assets/casino-player.png') },
    { rank: 2, name: 'Player 6', earnings: '$9500', image: require('../assets/casino-player.png') }, { rank: 1, name: 'Player 7', earnings: '$12000', image: require('../assets/casino-player.png') },
    { rank: 2, name: 'Player 8', earnings: '$9500', image: require('../assets/casino-player.png') }, { rank: 1, name: 'Player 9', earnings: '$12000', image: require('../assets/casino-player.png') },
    { rank: 2, name: 'Player 10', earnings: '$9500', image: require('../assets/casino-player.png') },
    // Add more top 10 lists data
  ];

  // Sample data for game icons
  const gameIconsData = [

    { name: 'Rapid Fire', icon: require('../assets/casino-game.png') },
    { name: '1 Min Win', icon: require('../assets/casino-game.png') },
    { name: '3 Min Win', icon: require('../assets/casino-game.png') },
    { name: '5 Min Win', icon: require('../assets/casino-game.png') },

    // Add more game icons with their images
  ];

  // Renders a grid of game icons
  const renderGameIcon = ({ item }) => (
    <TouchableOpacity style={styles.gameIconContainer}
      onPress={() => navigation.navigate("Gamescreen")}>

      <Image source={item.icon} style={styles.gameIcon} />
      <Text style={styles.gameIconText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../image/b2.jpg')} // Replace with your gaming-themed background image
        style={styles.backgroundImage}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>BetNinja</Text>
          <Text style={styles.headerSubtitle}>Your Ultimate Gaming Experience</Text>
        </View>
      </View>
      <View style={{ borderRadius: 10 }}>
        <MainSlider />
      </View>

      {/* Information Section */}
      <View style={styles.informationSection}>
        <View style={{ width: SCREEN_WIDTH * 0.75, }}>
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
          horizontal
          data={recentWinnersData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recentWinner}>
              <Image source={item.image} style={{ height: 60, width: 60 }} />
              <Text style={{ color: Colors.black, fontWeight: '500', marginVertical: 3 }}>{item.name}</Text>
              <View style={{ borderBottomWidth: 0.3, width: '100%', marginVertical: 10, borderColor: Colors.fontGray }}></View>
              <Text style={{ color: 'red' }}>{item.amount}</Text>
              <Text style={{ color: Colors.fontGray, fontWeight: '500' }}>{item.game}</Text>
            </View>
          )}
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
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '35%' }}>

                <Image source={item.image} style={{ height: 30, width: 30 }} />
                <View>
                  <Text style={{ fontWeight: 'bold', color: 'green' }}>{item.rank}</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                </View>
              </View>
              <Text style={{ color: 'orange', fontWeight: '800', fontSize: 18 }}>{item.earnings}</Text>

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
    marginTop: 30,
    marginBottom: 30
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
    padding: 20,
  },
  headerTextContainer: {
    marginLeft: 20,
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  iconSectionTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  gameIconContainer: {
    alignItems: 'center',
    margin: 7,
    backgroundColor: Colors.white,
    padding: 5,
    width: SCREEN_WIDTH * 0.26,
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
    width: SCREEN_WIDTH * 0.92,
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
    padding: 10,
    margin: 10,
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
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH * 0.88,
    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.07,
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2

  },
  recentWinner: {
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: Colors.lightGray,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH * 0.35,
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
