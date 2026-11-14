import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bonsaiData from '../data/bonsai.json';
import LeafWatermark from '../components/LeafWatermark';

export default function HomeScreen({ navigation }) {
  const [collectionCount, setCollectionCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const data = await AsyncStorage.getItem('@my_bonsai_collection');
        if (data) {
          setCollectionCount(JSON.parse(data).length);
        }
      } catch (e) {
        console.log('Error loading collection count', e);
      }
    };
    const unsubscribe = navigation.addListener('focus', loadCount);
    loadCount();
    return unsubscribe;
  }, [navigation]);

  const speciesCount = bonsaiData?.species?.length || 0;
  const guideCount = bonsaiData?.stylingGuides?.length || 0;
  const featured = (bonsaiData?.species || []).slice(0, 3);

  return (
    <View style={styles.container}>
      <LeafWatermark />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🌳</Text>
          <Text style={styles.heroTitle}>BonsaiLog</Text>
          <Text style={styles.heroSub}>
            Your traditional bonsai care & styling journal
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{speciesCount}</Text>
            <Text style={styles.statLabel}>Species</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{collectionCount}</Text>
            <Text style={styles.statLabel}>My Trees</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{guideCount}</Text>
            <Text style={styles.statLabel}>Styles</Text>
          </View>
        </View>

        {/* Quick actions */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, styles.actionPrimary]}
            onPress={() => navigation.navigate('Directory')}
          >
            <Text style={styles.actionEmoji}>📁</Text>
            <Text style={styles.actionTextPrimary}>Species Directory</Text>
            <Text style={[styles.actionHint, { color: 'rgba(255,255,255,0.75)' }]}>
              Browse & learn
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Collection')}
          >
            <Text style={styles.actionEmoji}>🌿</Text>
            <Text style={styles.actionText}>My Collection</Text>
            <Text style={styles.actionHint}>Your garden</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Text style={styles.actionEmoji}>📅</Text>
            <Text style={styles.actionText}>Care Schedule</Text>
            <Text style={styles.actionHint}>Water & prune</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Guide')}
          >
            <Text style={styles.actionEmoji}>📖</Text>
            <Text style={styles.actionText}>Styling Guide</Text>
            <Text style={styles.actionHint}>Classic forms</Text>
          </TouchableOpacity>
        </View>

        {/* Featured species */}
        <Text style={styles.sectionTitle}>Featured Species</Text>
        {featured.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.featuredCard}
            onPress={() =>
              navigation.navigate('Directory', {
                screen: 'ProfileDetail',
                params: { tree: item },
              })
            }
          >
            <View style={styles.featuredLeft}>
              <Text style={styles.featuredEmoji}>🪴</Text>
            </View>
            <View style={styles.featuredBody}>
              <Text style={styles.featuredName}>{item.name}</Text>
              <Text style={styles.featuredMeta}>
                {item.type} · {item.difficulty}
              </Text>
              <Text style={styles.featuredDesc} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.footerTip}>
          <Text style={styles.tipTitle}>Tip of the day</Text>
          <Text style={styles.tipText}>
            Check soil moisture with your finger before watering. Most bonsai
            prefer to dry slightly between waterings.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: '#3B5E4B',
    paddingTop: 48,
    paddingBottom: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 42,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  heroSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statNum: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C5E43',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7C6E',
    marginTop: 2,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C5E43',
    marginTop: 28,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 12,
    gap: 10,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  actionPrimary: {
    backgroundColor: '#3B5E4B',
  },
  actionEmoji: {
    fontSize: 26,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C5E43',
  },
  actionTextPrimary: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionHint: {
    fontSize: 12,
    color: '#8A9A8C',
    marginTop: 3,
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  featuredLeft: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8EDE6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featuredEmoji: {
    fontSize: 22,
  },
  featuredBody: {
    flex: 1,
  },
  featuredName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C3E50',
  },
  featuredMeta: {
    fontSize: 12,
    color: '#6B7C6E',
    marginTop: 2,
  },
  featuredDesc: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 4,
    lineHeight: 18,
  },
  footerTip: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#E8EDE6',
    borderRadius: 12,
    padding: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C5E43',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 13,
    color: '#4A5E50',
    lineHeight: 19,
  },
});