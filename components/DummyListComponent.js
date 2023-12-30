import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useState } from 'react';

const DummyListComponent = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;

  const dummyData = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 3, name: 'Item 3', description: 'Description for Item 3' },
    { id: 4, name: 'Item 4', description: 'Description for Item 4' },
    { id: 5, name: 'Item 5', description: 'Description for Item 5' },
    { id: 6, name: 'Item 6', description: 'Description for Item 6' },
    { id: 7, name: 'Item 7', description: 'Description for Item 7' },
    { id: 8, name: 'Item 8', description: 'Description for Item 8' },
    { id: 9, name: 'Item 9', description: 'Description for Item 9' },
    { id: 10, name: 'Item 10', description: 'Description for Item 10' },
    { id: 11, name: 'Item 11', description: 'Description for Item 11' },
    { id: 12, name: 'Item 12', description: 'Description for Item 12' },
    { id: 13, name: 'Item 13', description: 'Description for Item 13' },
    { id: 14, name: 'Item 14', description: 'Description for Item 14' },
    { id: 15, name: 'Item 15', description: 'Description for Item 15' },
    { id: 16, name: 'Item 16', description: 'Description for Item 16' },
    { id: 17, name: 'Item 17', description: 'Description for Item 17' },
    { id: 18, name: 'Item 18', description: 'Description for Item 18' },
    { id: 19, name: 'Item 19', description: 'Description for Item 19' },
    { id: 20, name: 'Item 20', description: 'Description for Item 20' },
    { id: 21, name: 'Item 21', description: 'Description for Item 21' },
    { id: 22, name: 'Item 22', description: 'Description for Item 22' },
    { id: 23, name: 'Item 23', description: 'Description for Item 23' },
    { id: 24, name: 'Item 24', description: 'Description for Item 24' },
    { id: 25, name: 'Item 25', description: 'Description for Item 25' },
    { id: 26, name: 'Item 26', description: 'Description for Item 26' },
    { id: 27, name: 'Item 27', description: 'Description for Item 27' },
    { id: 28, name: 'Item 28', description: 'Description for Item 28' },
    { id: 29, name: 'Item 29', description: 'Description for Item 29' },
    { id: 30, name: 'Item 30', description: 'Description for Item 30' },
  ];

  // Render item function for FlatList


  // const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  // const onNextPress = () => {
  //   setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, (totalPages - 1) * itemsPerPage));
  // };

  // const onPrevPress = () => {
  //   setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  // };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`ID: ${item.id} - Name: ${item.name}`}</Text>
      <Text style={styles.itemText}>{`Description: ${item.description}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData.slice(startIndex, startIndex + itemsPerPage)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={onPrevPress} disabled={startIndex === 0} />
        <Text style={styles.pageIndicator}>{`Page ${Math.ceil((startIndex + 1) / itemsPerPage)} of ${totalPages}`}</Text>

        <Button title="Next" onPress={onNextPress} disabled={startIndex + itemsPerPage >= dummyData.length} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DummyListComponent;
