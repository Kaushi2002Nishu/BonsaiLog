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
  container: { flex: 1, padding: 16, backgroundColor: '#f4f6f7' },
  screenTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  card: { padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, elevation: 2, borderWidth: 1, borderColor: '#eaeded' },
  styleTitle: { fontSize: 17, fontWeight: 'bold', color: '#117864', marginBottom: 8 },
  description: { fontSize: 14, color: '#566573', lineHeight: 22 }
});