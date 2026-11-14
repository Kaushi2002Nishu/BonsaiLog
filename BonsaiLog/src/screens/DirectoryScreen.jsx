import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import bonsaiData from '../data/bonsai.json';

export default function DirectoryScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterDiff, setFilterDiff] = useState('All');
  const { width } = useWindowDimensions();
  const columns = width >= 700 ? 3 : 2;
  const cardWidth = columns === 3 ? '31.5%' : '48%';

  const filteredData = useMemo(() => {
    return bonsaiData.species.filter((item) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q);
      const matchesType = filterType === 'All' || item.type === filterType;
      const matchesDiff = filterDiff === 'All' || item.difficulty === filterDiff;
      return matchesSearch && matchesType && matchesDiff;
    });
  }, [search, filterType, filterDiff]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={styles.headerBanner}>
          <Text style={styles.bannerTitle}>BonsaiLog Studio</Text>
          <Text style={styles.bannerSub}>
            Traditional Bonsai Care and Styling Journal - {bonsaiData.species.length} species
          </Text>
        </View>

        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.navBtn, styles.navPrimary]}
            onPress={() => navigation.navigate('Collection')}
          >
            <Text style={styles.navBtnTextPrimary}>My Collection</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Text style={styles.navBtnText}>Care Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate('Guide')}
          >
            <Text style={styles.navBtnText}>Styling Guide</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>
          Bonsai Directory ({filteredData.length})
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search species..."
          placeholderTextColor="#8c8275"
          value={search}
          onChangeText={setSearch}
        />

        <Text style={styles.filterLabel}>TYPE</Text>
        <View style={styles.filterRow}>
          {['All', 'Indoor', 'Outdoor'].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setFilterType(type)}
              style={[styles.filterChip, filterType === type && styles.filterChipActive]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filterType === type && styles.filterChipTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.filterLabel}>DIFFICULTY</Text>
        <View style={styles.filterRow}>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((d) => (
            <TouchableOpacity
              key={d}
              onPress={() => setFilterDiff(d)}
              style={[styles.filterChip, filterDiff === d && styles.filterChipActive]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filterDiff === d && styles.filterChipTextActive,
                ]}
              >
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.grid}>
          {filteredData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { width: cardWidth }]}
              onPress={() => navigation.navigate('ProfileDetail', { tree: item })}
              activeOpacity={0.75}
            >
              <View style={styles.cardImage}>
                <Text style={styles.cardEmoji}>🌳</Text>
              </View>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.cardSub} numberOfLines={1}>
                {item.type}
              </Text>
              <View
                style={[
                  styles.badge,
                  item.difficulty === 'Beginner' && styles.badgeBeginner,
                  item.difficulty === 'Intermediate' && styles.badgeIntermediate,
                  item.difficulty === 'Advanced' && styles.badgeAdvanced,
                ]}
              >
                <Text style={styles.badgeText}>{item.difficulty}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredData.length === 0 ? (
          <Text style={styles.emptyText}>No species match your filters.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F7F4EF',
    ...Platform.select({
      web: {
        height: '100%',
        maxHeight: '100vh',
        overflow: 'hidden',
      },
      default: {},
    }),
  },
  scrollView: {
    flex: 1,
    ...Platform.select({
      web: { height: '100%' },
      default: {},
    }),
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  headerBanner: {
    backgroundColor: '#D8E2DC',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#C2D1C9',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C5E43',
  },
  bannerSub: {
    fontSize: 12,
    color: '#5A7363',
    marginTop: 4,
  },
  navRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  navBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 11,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3DCB9',
  },
  navPrimary: {
    backgroundColor: '#3B7A57',
    borderColor: '#3B7A57',
  },
  navBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A3B32',
  },
  navBtnTextPrimary: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A3B32',
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E3DCB9',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#4A3B32',
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8C6239',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#EBE5D8',
    marginRight: 8,
    marginBottom: 6,
  },
  filterChipActive: {
    backgroundColor: '#8C6239',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7A6B5D',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 88,
    backgroundColor: '#F4EFEA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EBE5D8',
  },
  cardEmoji: {
    fontSize: 36,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C5E43',
    textAlign: 'center',
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 11,
    color: '#7A6B5D',
    marginBottom: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#FAF0E6',
  },
  badgeBeginner: {
    backgroundColor: '#E8F5E9',
  },
  badgeIntermediate: {
    backgroundColor: '#E3F2FD',
  },
  badgeAdvanced: {
    backgroundColor: '#FFF3E0',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#5D4037',
  },
  emptyText: {
    textAlign: 'center',
    color: '#8c8275',
    marginTop: 24,
    fontSize: 14,
  },
});