import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function ProfileDetailScreen({ route }) {
  const { tree } = route.params || {};

  if (!tree) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Tree details not found.</Text>
      </View>
    );
  }

  const pruningTime = tree.pruningTime || 'Late Winter / Early Spring';
  const soilMix = tree.soilMix || 'Akadama (50%), Pumice (30%), Lava Rock (20%)';
  const wiringGuide = tree.wiringGuide || 'Copper or Aluminum wire during dormancy';
  const description = tree.description || 'No description available.';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.title}>🌳 {tree.name}</Text>

      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Type: {tree.type}</Text>
        </View>
        <View style={[styles.badge, styles.diffBadge]}>
          <Text style={[styles.badgeText, styles.diffBadgeText]}>
            Difficulty: {tree.difficulty}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>📖 Description</Text>
        <Text style={styles.value}>{description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>✂️ Pruning Time</Text>
        <Text style={styles.value}>{pruningTime}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🪴 Soil Mix Recommendation</Text>
        <Text style={styles.value}>{soilMix}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🔗 Wiring Guide</Text>
        <Text style={styles.value}>{wiringGuide}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4EF' },
  content: { padding: 16, paddingBottom: 32 },
  errorText: { fontSize: 16, color: '#e74c3c', textAlign: 'center', marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2C5E43', marginBottom: 12 },
  badgeRow: { flexDirection: 'row', marginBottom: 16 },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: { fontSize: 13, fontWeight: '600', color: '#2C5E43' },
  diffBadge: { backgroundColor: '#E3F2FD' },
  diffBadgeText: { color: '#1565C0' },
  section: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3DCB9',
  },
  label: { fontSize: 15, fontWeight: 'bold', color: '#2C5E43', marginBottom: 6 },
  value: { fontSize: 14, color: '#566573', lineHeight: 22 },
});