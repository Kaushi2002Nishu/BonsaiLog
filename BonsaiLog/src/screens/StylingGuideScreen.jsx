import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import bonsaiData from '../data/bonsai.json';

export default function StylingGuideScreen() {
  const guides = bonsaiData.stylingGuides;

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Traditional Bonsai Styling Guides</Text>
      <FlatList
        data={guides}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.styleTitle}>✨ {item.style}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f1' },
  screenTitle: { fontSize: 18, fontWeight: 'bold', color: '#1b4d3e', marginBottom: 15 },
  card: { padding: 16, backgroundColor: '#ffffff', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#dcd7c9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  styleTitle: { fontSize: 17, fontWeight: 'bold', color: '#795548', marginBottom: 8 },
  description: { fontSize: 14, color: '#605852', lineHeight: 22 }
});