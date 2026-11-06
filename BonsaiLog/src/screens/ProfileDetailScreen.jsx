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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{tree.name}</Text>

      <View style={styles.badgeRow}>
        <Text style={styles.badge}>Type: {tree.type}</Text>
        <Text style={styles.badge}>Difficulty: {tree.difficulty}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{tree.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Pruning Time</Text>
        <Text style={styles.value}>{tree.pruningTime}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Soil Mix Recommendation</Text>
        <Text style={styles.value}>{tree.soilMix}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Wiring Guide</Text>
        <Text style={styles.value}>{tree.wiringGuide}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2e7d32', marginBottom: 10 },
  badgeRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  badge: { backgroundColor: '#e8f5e9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 12, fontWeight: '600', color: '#1b5e20' },
  section: { marginBottom: 15, padding: 12, backgroundColor: '#fafafa', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  value: { fontSize: 14, color: '#555', lineHeight: 20 }
});