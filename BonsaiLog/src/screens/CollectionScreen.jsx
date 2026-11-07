import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
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
    if (!treeName.trim()) {
      Alert.alert('Error', 'Please enter a tree nickname!');
      return;
    }
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

  const deleteTree = async (id) => {
    const updatedList = myTrees.filter(item => item.id !== id);
    setMyTrees(updatedList);
    try {
      await AsyncStorage.setItem('@my_bonsai_collection', JSON.stringify(updatedList));
    } catch (error) {
      console.log('Error deleting tree', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>🌿 My Bonsai Garden</Text>
      
      <View style={styles.formContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Tree Nickname (e.g., Old Ficus)" 
          placeholderTextColor="#888"
          value={treeName} 
          onChangeText={setTreeName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Species (e.g., Chinese Elm)" 
          placeholderTextColor="#888"
          value={treeSpecies} 
          onChangeText={setTreeSpecies} 
        />
        
        <TouchableOpacity style={styles.addButton} onPress={addTree}>
          <Text style={styles.addButtonText}>+ Add Tree to Collection</Text>
        </TouchableOpacity>
      </View>

      {myTrees.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bonsai trees in your collection yet. Add your first tree above!</Text>
        </View>
      ) : (
        <FlatList
          data={myTrees}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>🌳 {item.name}</Text>
                <Text style={styles.cardSub}>Species: {item.species}</Text>
                <Text style={styles.cardDate}>Added: {item.dateAdded}</Text>
              </View>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteTree(item.id)}>
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f6f7' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#1e8449' },
  formContainer: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 15, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#d5dbdb', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#fafafa' },
  addButton: { backgroundColor: '#27ae60', padding: 12, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, elevation: 2, borderWidth: 1, borderColor: '#e5e8e8' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  cardSub: { fontSize: 14, color: '#7f8c8d', marginTop: 3 },
  cardDate: { fontSize: 12, color: '#95a5a6', marginTop: 4 },
  deleteBtn: { backgroundColor: '#e74c3c', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  deleteBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { textAlign: 'center', color: '#95a5a6', fontSize: 15 }
});