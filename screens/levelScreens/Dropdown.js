import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React from 'react'

const Dropdown = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Dropdown</Text>
        <FlatList
          data={[1, 1, 1, 1]} // Replace this with your data
          renderItem={({ item }) => {
            return <Text>Nitin</Text>;
          }}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatList}
        />
      </View>
    </ScrollView>
  )
}

export default Dropdown

const styles = StyleSheet.create({})