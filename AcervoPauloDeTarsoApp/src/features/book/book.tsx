import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BookList from './components/book-list';

const Book = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Aqui você pode adicionar a lógica para lidar com a pesquisa
    console.log('Termo de pesquisa:', searchTerm);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Busca rápida"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#a0ccb0' }]}
        onPress={handleSearch}
      >
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>
      <BookList showAddButton={true} showRemoveButton={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    backgroundColor: '#a0ccb0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Book;
