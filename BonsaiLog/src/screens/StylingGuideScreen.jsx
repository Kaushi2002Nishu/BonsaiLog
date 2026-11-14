import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import bonsaiData from '../data/bonsai.json';

export default function StylingGuideScreen() {
  const guides = (bonsaiData && bonsaiData.stylingGuides) ? bonsaiData.stylingGuides : [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Traditional Bonsai Styles</Text>
      <Text style={styles.sub}>
        Classic Japanese forms - wiring, pruning and trunk manipulation
      </Text>

      <FlatList
        style={styles.list}
        data={guides}
        keyExtractor={function (item) { return String(item.id); }}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        renderItem={function ({ item }) {
          return (
            <View style={styles.card}>
              <View style={styles.thumb}>
                <Text style={styles.thumbEmoji}>🌳</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.styleName}>{item.style}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>Wiring - Pruning - Trunk Manipulation</Text>
            <Text style={styles.tipText}>
              Use aluminum or copper wire during dormancy. Prune to maintain silhouette.
              Never remove more than 30 percent of foliage at once. Always work with healthy trees.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No styling guides found in data file.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C5E43',
  },
  sub: {
    fontSize: 12,
    color: '#7A6B5D',
    marginTop: 4,
    marginBottom: 14,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3DCB9',
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#F4EFEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EBE5D8',
  },
  thumbEmoji: {
    fontSize: 28,
  },
  cardBody: {
    flex: 1,
  },
  styleName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8C6239',
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: '#566573',
    lineHeight: 19,
  },
  tipBox: {
    backgroundColor: '#D8E2DC',
    borderRadius: 12,
    padding: 14,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#C2D1C9',
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C5E43',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 12,
    color: '#5A7363',
    lineHeight: 18,
  },
  empty: {
    textAlign: 'center',
    color: '#8c8275',
    marginTop: 24,
  },
});