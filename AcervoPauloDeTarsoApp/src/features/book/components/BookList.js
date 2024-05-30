// components/BookList.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const BookList = ({ books, showAddButton, showRemoveButton }) => {
  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
    </View>
  );

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  bookItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  author: {
    fontSize: 16,
    color: '#555',
  },
});

export default BookList;
