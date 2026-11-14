<<<<<<< Updated upstream
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import bonsaiData from '../data/bonsai.json';
=======
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import LeafWatermark from '../components/LeafWatermark';
>>>>>>> Stashed changes

export default function StylingGuideScreen() {
  const [hoveredId, setHoveredId] = useState(null);

  const guideItems = [
    {
      id: '1',
      title: 'Formal Upright (Chokkan)',
      description: 'Straight trunk tapering naturally from base to apex. Classic, balanced, formal appearance. Best for pines and junipers with strong apical dominance.',
      emoji: '🌲'
    },
    {
      id: '2',
      title: 'Cascade (Kengai)',
      description: 'Trunk and branches cascade below the pot rim, mimicking a tree growing over a cliff. Requires deep pot and careful wiring.',
      emoji: '🌿'
    },
    {
      id: '3',
      title: 'Literati (Bunjin)',
      description: 'Elegant, sparse foliage with a slender, often curved trunk. Emphasizes movement and negative space — inspired by Chinese literati paintings.',
      emoji: '🍃'
    },
    {
      id: '4',
      title: 'Windswept (Fukinagashi)',
      description: 'All branches lean in one direction as if shaped by constant wind. Strong sense of motion and exposure.',
      emoji: '🎋'
    },
    {
      id: '5',
      title: 'Informal Upright (Moyogi)',
      description: 'Gentle curves in the trunk while the apex remains above the base. Most common and natural-looking style.',
      emoji: '🌳'
    }
  ];

  return (
<<<<<<< Updated upstream
    <View style={styles.container}>
      <Text style={styles.heading}>Traditional Bonsai Styles</Text>
      <Text style={styles.sub}>
        Classic Japanese forms - wiring, pruning and trunk manipulation
      </Text>
=======
    <View style={styles.screen}>
      <LeafWatermark />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Styling Techniques Guide</Text>
        
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Traditional Bonsai Styles</Text>
          <Text style={styles.introSub}>Classic Japanese forms - wiring, pruning and trunk manipulation</Text>
        </View>
>>>>>>> Stashed changes

        <View style={styles.listSection}>
          {guideItems.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, isHovered && styles.cardHovered]}
                activeOpacity={1}
                {...Platform.select({
                  web: {
                    onMouseEnter: () => setHoveredId(item.id),
                    onMouseLeave: () => setHoveredId(null),
                  },
                })}
              >
                <View style={styles.cardIconBox}>
                  <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.extraCard, hoveredId === 'extra' && styles.extraCardHovered]}
          activeOpacity={1}
          {...Platform.select({
            web: {
              onMouseEnter: () => setHoveredId('extra'),
              onMouseLeave: () => setHoveredId(null),
            },
          })}
        >
          <Text style={styles.extraTitle}>Wiring - Pruning - Trunk Manipulation</Text>
          <Text style={styles.extraDesc}>
            Use aluminum or copper wire during dormancy. Prune to maintain silhouette. Never remove more than 20 percent of foliage at a time to keep your tree healthy.
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C4A3E',
    textAlign: 'center',
    marginBottom: 12,
  },
  introCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#D8E2DC',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C2D1C9',
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C5E43',
    marginBottom: 4,
  },
  introSub: {
    fontSize: 12,
    color: '#5A7363',
    textAlign: 'center',
  },
  listSection: {
    width: '100%',
    maxWidth: 480,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    alignItems: 'flex-start',
    width: '100%',
    ...Platform.select({
      web: {
        transitionProperty: 'transform, box-shadow, background-color, border-color',
        transitionDuration: '200ms',
        cursor: 'pointer',
      },
    }),
  },
  cardHovered: {
    backgroundColor: '#F0F5F1', // Light green tint background
    borderColor: '#8FA89B',    // Soft sage border highlight
    ...Platform.select({
      web: {
        transform: [{ translateY: -3 }],
        boxShadow: '0px 6px 14px rgba(44, 94, 67, 0.1)',
      },
    }),
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F4EFEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EBE5D8',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C5E43',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#7A6B5D',
    lineHeight: 18,
  },
  extraCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    ...Platform.select({
      web: {
        transitionProperty: 'transform, box-shadow, background-color, border-color',
        transitionDuration: '200ms',
        cursor: 'pointer',
      },
    }),
  },
  extraCardHovered: {
    backgroundColor: '#FAF5F0', // Light brown / warm cream tint background
    borderColor: '#C8A888',    // Soft warm bronze border highlight
    ...Platform.select({
      web: {
        transform: [{ translateY: -3 }],
        boxShadow: '0px 6px 14px rgba(140, 98, 57, 0.1)',
      },
    }),
  },
  extraTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C5E43',
    marginBottom: 6,
  },
  extraDesc: {
    fontSize: 12,
    color: '#7A6B5D',
    lineHeight: 18,
  },
});