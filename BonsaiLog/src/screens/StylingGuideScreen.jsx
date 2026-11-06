import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import bonsaiData from '../data/bonsai.json';

export default function StylingGuideScreen() {
  const guides = bonsaiData.stylingGuides;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Traditional Bonsai Styling Guide</Text>
      <FlatList
        data={guides}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.styleTitle}>{item.style}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
  card: { padding: 16, backgroundColor: '#f4f6f7', borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#d5dbdb' },
  styleTitle: { fontSize: 18, fontWeight: 'bold', color: '#117864', marginBottom: 5 },
  description: { fontSize: 14, color: '#34495e', lineHeight: 20 }
});