import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CollectionScreen() {
  const [myTrees, setMyTrees] = useState([]);
  const [treeName, setTreeName] = useState('');
  const [treeSpecies, setTreeSpecies] = useState('');

  useEffect(() => {
    loadCollection();
  }, []);

  const loadCollection = async () => {
    try {
      const data = await AsyncStorage.getItem('@my_bonsai_collection');
      if (data) {
        setMyTrees(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading collection', error);
    }
  };

  const addTree = async () => {
    if (!treeName.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name: treeName,
      species: treeSpecies || 'Unknown Species',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    const updatedList = [...myTrees, newItem];
    setMyTrees(updatedList);
    try {
      await AsyncStorage.setItem('@my_bonsai_collection', JSON.stringify(updatedList));
      setTreeName('');
      setTreeSpecies('');
    } catch (error) {
      console.log('Error saving collection', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Bonsai Collection</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Tree Nickname (e.g., My Old Ficus)" 
        value={treeName} 
        onChangeText={setTreeName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Species / Type (e.g., Chinese Elm)" 
        value={treeSpecies} 
        onChangeText={setTreeSpecies} 
      />
      
      <TouchableOpacity style={styles.addButton} onPress={addTree}>
        <Text style={styles.addButtonText}>+ Add Tree to Collection</Text>
      </TouchableOpacity>

      <FlatList
        data={myTrees}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSub}>Species: {item.species}</Text>
            <Text style={styles.cardDate}>Added: {item.dateAdded}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#f9f9f9' },
  addButton: { backgroundColor: '#27ae60', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { padding: 15, backgroundColor: '#f1f8e9', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#dcedc8' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#33691e' },
  cardSub: { fontSize: 14, color: '#558b2f', marginTop: 2 },
  cardDate: { fontSize: 12, color: '#7f8c8d', marginTop: 4 }
});