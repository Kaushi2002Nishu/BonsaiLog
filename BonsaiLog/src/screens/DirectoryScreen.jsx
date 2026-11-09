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
      {/* Top Header Banner with Light Green & Brown Watermark Vibe */}
      <View style={styles.headerBanner}>
        <View style={styles.watermarkContainer}>
          <Text style={styles.watermarkText}>🍃 🌿 🍂</Text>
        </View>
        <View>
          <Text style={styles.bannerTitle}>🌿 BonsaiLog Studio</Text>
          <Text style={styles.bannerSub}>Manage & explore your bonsai collection</Text>
        </View>
      </View>

      {/* Navigation Shortcut Cards */}
      <View style={styles.navRow}>
        <TouchableOpacity style={[styles.navBtn, styles.navPrimary]} onPress={() => navigation.navigate('Collection')}>
          <Text style={styles.navBtnTextPrimary}>🌿 My Collection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.navBtnText}>📅 Care Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('StylingGuide')}>
          <Text style={styles.navBtnText}>📖 Guides</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeading}>Bonsai Species Directory</Text>

      {/* Search Bar */}
      <TextInput 
        style={styles.searchInput}
        placeholder="🔍 Search bonsai species by name..."
        placeholderTextColor="#8c8275"
        value={search}
        onChangeText={setSearch}
      />

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {['All', 'Indoor', 'Outdoor'].map(type => (
          <TouchableOpacity 
            key={type} 
            onPress={() => setFilterType(type)}
            style={[styles.filterBtn, filterType === type && styles.activeFilterBtn]}
          >
            <Text style={[styles.filterText, filterType === type && styles.activeFilterText]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Species List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('ProfileDetail', { tree: item })}
          >
            <View style={styles.cardContent}>
              <Text style={styles.title}>🌳 {item.name}</Text>
              <Text style={styles.descSnippet} numberOfLines={1}>{item.description}</Text>
              <View style={styles.badgeRow}>
                <Text style={styles.badge}>Type: {item.type}</Text>
                <Text style={[styles.badge, styles.diffBadge]}>Difficulty: {item.difficulty}</Text>
              </View>
            </View>
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>➔</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7F4EF' }, // Soft Cream Background
  headerBanner: { 
    backgroundColor: '#D8E2DC', // Soft Light Green Background
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#C2D1C9',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 2 
  },
  watermarkContainer: { position: 'absolute', right: 15, top: 5, opacity: 0.35 },
  watermarkText: { fontSize: 45, color: '#8C6239' }, // Brown watermark leaves/icons
  bannerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C5E43' },
  bannerSub: { fontSize: 13, color: '#5A7363', marginTop: 3 },
  navRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  navBtn: { flex: 1, backgroundColor: '#FFFFFF', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E3DCB9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  navPrimary: { backgroundColor: '#3B7A57', borderColor: '#3B7A57' },
  navBtnText: { fontSize: 13, fontWeight: 'bold', color: '#4A3B32' },
  navBtnTextPrimary: { fontSize: 13, fontWeight: 'bold', color: '#FFFFFF' },
  sectionHeading: { fontSize: 16, fontWeight: 'bold', color: '#4A3B32', marginBottom: 10 },
  searchInput: { borderWidth: 1, borderColor: '#E3DCB9', padding: 14, borderRadius: 10, marginBottom: 15, backgroundColor: '#FFFFFF', fontSize: 14, color: '#4A3B32', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2 },
  filterRow: { flexDirection: 'row', backgroundColor: '#EBE5D8', padding: 4, borderRadius: 10, marginBottom: 15 },
  filterBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  activeFilterBtn: { backgroundColor: '#8C6239', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  filterText: { fontWeight: '600', color: '#7A6B5D', fontSize: 13 },
  activeFilterText: { color: '#FFFFFF' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E3DCB9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  cardContent: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C5E43', marginBottom: 4 },
  descSnippet: { fontSize: 13, color: '#7A6B5D', marginBottom: 8 },
  badgeRow: { flexDirection: 'row', gap: 8 },
  badge: { fontSize: 11, backgroundColor: '#F4EFEA', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, color: '#4A3B32', overflow: 'hidden', fontWeight: '500', borderWidth: 1, borderColor: '#E3DCB9' },
  diffBadge: { backgroundColor: '#FAF0E6', color: '#8C6239', borderColor: '#E8D4C0' },
  arrowContainer: { paddingLeft: 10 },
  arrow: { fontSize: 16, color: '#8C6239', fontWeight: 'bold' }
});