import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function ProfileDetailScreen({ route }) {
  const { tree } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tree ? tree.name : 'Tree Details'}</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }, title: { fontSize: 20, fontWeight: 'bold' } });