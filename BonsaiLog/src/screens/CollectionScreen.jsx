import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CollectionScreen() {
  const [trees, setTrees] = useState([]);
  const [nickname, setNickname] = useState('');
  const [species, setSpecies] = useState('');

  useEffect(() => {
    loadTrees();
  }, []);

  const loadTrees = async () => {
    try {
      const data = await AsyncStorage.getItem('@bonsai_collection');
      if (data) {
        setTrees(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading collection', error);
    }
  };

  const addTree = async () => {
    if (!nickname.trim() || !species.trim()) {
      Alert.alert('Error', 'Please enter both tree nickname and species!');
      return;
    }
    const newTree = {
      id: Date.now().toString(),
<<<<<<< Updated upstream
      name: treeName,
      species: treeSpecies || 'Unknown Species',
      dateAdded: new Date().toISOString().split('T')[0]
=======
      nickname: nickname.trim(),
      species: species.trim(),
      dateAdded: new Date().toISOString().split('T')[0],
>>>>>>> Stashed changes
    };

    const updatedTrees = [newTree, ...trees];
    setTrees(updatedTrees);
    try {
      await AsyncStorage.setItem('@bonsai_collection', JSON.stringify(updatedTrees));
      setNickname('');
      setSpecies('');
    } catch (error) {
      console.log('Error saving tree', error);
    }
  };

  const deleteTree = async (id) => {
<<<<<<< Updated upstream
    const updatedList = myTrees.filter(item => item.id !== id);
    setMyTrees(updatedList);
=======
    const updatedTrees = trees.filter((item) => item.id !== id);
    setTrees(updatedTrees);
>>>>>>> Stashed changes
    try {
      await AsyncStorage.setItem('@bonsai_collection', JSON.stringify(updatedTrees));
    } catch (error) {
      console.log('Error deleting tree', error);
    }
  };

  return (
<<<<<<< Updated upstream
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
=======
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LeafWatermark />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Form Section (Styled like Schedule Screen) */}
        <View style={styles.centerWrap}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>My Bonsai Garden</Text>
            <Text style={styles.formHint}>Add and manage your personal bonsai collection</Text>

            <Text style={styles.fieldLabel}>Tree Nickname</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Old Ficus"
              placeholderTextColor="#9a8f82"
              value={nickname}
              onChangeText={setNickname}
            />

            <Text style={styles.fieldLabel}>Species</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Chinese Elm"
              placeholderTextColor="#9a8f82"
              value={species}
              onChangeText={setSpecies}
            />

            <TouchableOpacity style={styles.addButton} onPress={addTree} activeOpacity={0.85}>
              <Text style={styles.addButtonText}>+ Add Tree to Collection</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trees List Section */}
        <View style={styles.listSection}>
          {trees.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>🌿</Text>
              <Text style={styles.emptyTitle}>No bonsai trees in your collection yet</Text>
              <Text style={styles.emptyText}>
                Add your first tree above to start tracking your garden!
              </Text>
            </View>
          ) : (
            <View style={styles.logsWrapper}>
              <Text style={styles.sectionTitle}>My Trees ({trees.length})</Text>
              {trees.map((item) => (
                <View key={item.id} style={styles.logCard}>
                  <View style={styles.logIcon}>
                    <Text style={{ fontSize: 18 }}>🌳</Text>
                  </View>
                  <View style={styles.logBody}>
                    <Text style={styles.taskText}>{item.nickname}</Text>
                    <Text style={styles.dateText}>Species: {item.species} • Added: {item.dateAdded}</Text>
                  </View>
                  <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteTree(item.id)}>
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
>>>>>>> Stashed changes
            </View>
          )}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
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
=======
  screen: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  centerWrap: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  formCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C5E43',
    textAlign: 'center',
    marginBottom: 4,
  },
  formHint: {
    fontSize: 12,
    color: '#7A6B5D',
    textAlign: 'center',
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8C6239',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3DCB9',
    backgroundColor: '#FAF8F5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 14,
    color: '#4A3B32',
  },
  addButton: {
    backgroundColor: '#2C5E43',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    zIndex: 1,
    alignItems: 'center',
  },
  logsWrapper: {
    width: '100%',
    maxWidth: 420,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C5E43',
    marginBottom: 12,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C5E43',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#8c8275',
    fontSize: 13,
    lineHeight: 20,
  },
  logCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    width: '100%',
  },
  logIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logBody: {
    flex: 1,
  },
  taskText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C5E43',
  },
  dateText: {
    fontSize: 12,
    color: '#7A6B5D',
    marginTop: 3,
  },
  deleteBtn: {
    backgroundColor: '#8C6239',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
>>>>>>> Stashed changes
});