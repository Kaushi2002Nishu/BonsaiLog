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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>🌳 {tree.name}</Text>

      <View style={styles.badgeRow}>
        <Text style={styles.badge}>Type: {tree.type}</Text>
        <Text style={[styles.badge, styles.diffBadge]}>Difficulty: {tree.difficulty}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>📖 Description</Text>
        <Text style={styles.value}>{tree.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>✂️ Pruning Time</Text>
        <Text style={styles.value}>{tree.pruningTime}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🪴 Soil Mix Recommendation</Text>
        <Text style={styles.value}>{tree.soilMix}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🔗 Wiring Guide</Text>
        <Text style={styles.value}>{tree.wiringGuide}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f6f7' },
  errorText: { fontSize: 16, color: '#e74c3c', textAlign: 'center', marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e8449', marginBottom: 12 },
  badgeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  badge: { backgroundColor: '#e8f8f5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, fontSize: 13, fontWeight: '600', color: '#117864', overflow: 'hidden' },
  diffBadge: { backgroundColor: '#ebf5fb', color: '#2980b9' },
  section: { marginBottom: 15, padding: 16, backgroundColor: '#fff', borderRadius: 12, elevation: 2, borderWidth: 1, borderColor: '#eaeded' },
  label: { fontSize: 15, fontWeight: 'bold', color: '#2c3e50', marginBottom: 6 },
  value: { fontSize: 14, color: '#566573', lineHeight: 22 }
});