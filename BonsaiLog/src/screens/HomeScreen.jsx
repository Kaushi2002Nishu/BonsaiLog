import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bonsaiData from '../data/bonsai.json';
import LeafWatermark from '../components/LeafWatermark';

export default function HomeScreen({ navigation }) {
  const [collectionCount, setCollectionCount] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

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
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🌳</Text>
          <Text style={styles.heroTitle}>BonsaiLog</Text>
          <Text style={styles.heroSub}>
            Your traditional bonsai care & styling journal
          </Text>
        </View>

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

        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.actionsGrid}>
          
          {/* Species Directory Card */}
          <TouchableOpacity
            style={[
              styles.actionCard, 
              hoveredCard === 'dir' && styles.actionCardHoveredDark
            ]}
            onPress={() => navigation.navigate('Directory')}
            {...Platform.select({
              web: {
                onMouseEnter: () => setHoveredCard('dir'),
                onMouseLeave: () => setHoveredCard(null),
              },
            })}
            activeOpacity={0.9}
          >
            <Text style={styles.actionEmoji}>📁</Text>
            <Text style={[styles.actionText, hoveredCard === 'dir' && styles.textWhite]}>
              Species Directory
            </Text>
            <Text style={[styles.actionHint, hoveredCard === 'dir' && styles.textWhiteSub]}>
              Browse & learn
            </Text>
          </TouchableOpacity>

          {/* My Collection Card */}
          <TouchableOpacity
            style={[
              styles.actionCard, 
              hoveredCard === 'col' && styles.actionCardHoveredDark
            ]}
            onPress={() => navigation.navigate('Collection')}
            {...Platform.select({
              web: {
                onMouseEnter: () => setHoveredCard('col'),
                onMouseLeave: () => setHoveredCard(null),
              },
            })}
            activeOpacity={0.9}
          >
            <Text style={styles.actionEmoji}>🌿</Text>
            <Text style={[styles.actionText, hoveredCard === 'col' && styles.textWhite]}>
              My Collection
            </Text>
            <Text style={[styles.actionHint, hoveredCard === 'col' && styles.textWhiteSub]}>
              Your garden
            </Text>
          </TouchableOpacity>

          {/* Care Schedule Card */}
          <TouchableOpacity
            style={[
              styles.actionCard, 
              hoveredCard === 'sch' && styles.actionCardHoveredDark
            ]}
            onPress={() => navigation.navigate('Schedule')}
            {...Platform.select({
              web: {
                onMouseEnter: () => setHoveredCard('sch'),
                onMouseLeave: () => setHoveredCard(null),
              },
            })}
            activeOpacity={0.9}
          >
            <Text style={styles.actionEmoji}>📅</Text>
            <Text style={[styles.actionText, hoveredCard === 'sch' && styles.textWhite]}>
              Care Schedule
            </Text>
            <Text style={[styles.actionHint, hoveredCard === 'sch' && styles.textWhiteSub]}>
              Water & prune
            </Text>
          </TouchableOpacity>

          {/* Styling Guide Card */}
          <TouchableOpacity
            style={[
              styles.actionCard, 
              hoveredCard === 'gui' && styles.actionCardHoveredDark
            ]}
            onPress={() => navigation.navigate('Guide')}
            {...Platform.select({
              web: {
                onMouseEnter: () => setHoveredCard('gui'),
                onMouseLeave: () => setHoveredCard(null),
              },
            })}
            activeOpacity={0.9}
          >
            <Text style={styles.actionEmoji}>📖</Text>
            <Text style={[styles.actionText, hoveredCard === 'gui' && styles.textWhite]}>
              Styling Guide
            </Text>
            <Text style={[styles.actionHint, hoveredCard === 'gui' && styles.textWhiteSub]}>
              Classic forms
            </Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.sectionTitle}>Featured Species</Text>
        {featured.map((item, index) => {
          const cardId = `feat_${index}`;
          const isHovered = hoveredCard === cardId;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.featuredCard, isHovered && styles.actionCardHoveredDark]}
              onPress={() =>
                navigation.navigate('Directory', {
                  screen: 'ProfileDetail',
                  params: { tree: item },
                })
              }
              {...Platform.select({
                web: {
                  onMouseEnter: () => setHoveredCard(cardId),
                  onMouseLeave: () => setHoveredCard(null),
                },
              })}
              activeOpacity={0.9}
            >
              <View style={styles.featuredLeft}>
                <Text style={styles.featuredEmoji}>🪴</Text>
              </View>
              <View style={styles.featuredBody}>
                <Text style={[styles.featuredName, isHovered && styles.textWhite]}>{item.name}</Text>
                <Text style={[styles.featuredMeta, isHovered && styles.textWhiteSub]}>
                  {item.type} · {item.difficulty}
                </Text>
                <Text style={[styles.featuredDesc, isHovered && styles.textWhiteSub]} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

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
    borderWidth: 1,
    borderColor: '#E3DCB9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    ...Platform.select({
      web: {
        transitionProperty: 'transform, box-shadow, background-color, border-color',
        transitionDuration: '200ms',
        cursor: 'pointer',
      },
    }),
  },
  actionCardHoveredDark: {
    backgroundColor: '#3B7A57',
    borderColor: '#3B7A57',
    ...Platform.select({
      web: {
        transform: [{ translateY: -3 }],
        boxShadow: '0px 6px 14px rgba(44, 94, 67, 0.2)',
      },
    }),
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
  actionHint: {
    fontSize: 12,
    color: '#8A9A8C',
    marginTop: 3,
  },
  textWhite: {
    color: '#FFFFFF',
  },
  textWhiteSub: {
    color: 'rgba(255,255,255,0.85)',
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    ...Platform.select({
      web: {
        transitionProperty: 'transform, box-shadow, background-color, border-color',
        transitionDuration: '200ms',
        cursor: 'pointer',
      },
    }),
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