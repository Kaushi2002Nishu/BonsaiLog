/*import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import bonsaiData from '../data/bonsaiData.json';

export default function DirectoryScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredData = bonsaiData.species.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchInput}
        placeholder="Search Bonsai Species..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filterRow}>
        {['All', 'Indoor', 'Outdoor'].map(type => (
          <TouchableOpacity 
            key={type} 
            onPress={() => setFilterType(type)}
            style={[styles.filterBtn, filterType === type && styles.activeBtn]}
          >
            <Text style={styles.btnText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('ProfileDetail', { tree: item })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text>Type: {item.type} | Difficulty: {item.difficulty}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  filterBtn: { padding: 8, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeBtn: { borderBottomColor: 'green' },
  btnText: { fontWeight: 'bold' },
  card: { padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold' }
});*/



import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import bonsaiData from '../data/bonsai.json';

export default function DirectoryScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredData = bonsaiData.species.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <View style={styles.container}>
      {/* Navigation Shortcut Buttons */}
      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Collection')}>
          <Text style={styles.navBtnText}>My Collection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.navBtnText}>Care Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('StylingGuide')}>
          <Text style={styles.navBtnText}>Styling Guide</Text>
        </TouchableOpacity>
      </View>

      <TextInput 
        style={styles.searchInput}
        placeholder="Search Bonsai Species..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filterRow}>
        {['All', 'Indoor', 'Outdoor'].map(type => (
          <TouchableOpacity 
            key={type} 
            onPress={() => setFilterType(type)}
            style={[styles.filterBtn, filterType === type && styles.activeBtn]}
          >
            <Text style={styles.btnText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('ProfileDetail', { tree: item })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text>Type: {item.type} | Difficulty: {item.difficulty}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  navBtn: { backgroundColor: '#eef6fc', padding: 8, borderRadius: 6, borderWidth: 1, borderColor: '#2980b9' },
  navBtnText: { fontSize: 12, fontWeight: 'bold', color: '#2980b9' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  filterBtn: { padding: 8, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeBtn: { borderBottomColor: 'green' },
  btnText: { fontWeight: 'bold' },
  card: { padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold' }
});