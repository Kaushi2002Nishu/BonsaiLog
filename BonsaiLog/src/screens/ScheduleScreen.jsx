import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScheduleScreen() {
  const [logs, setLogs] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const data = await AsyncStorage.getItem('@care_logs');
      if (data) {
        setLogs(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading logs', error);
    }
  };

  const addLog = async () => {
    if (!task.trim()) {
      Alert.alert('Error', 'Please enter a care task description!');
      return;
    }
    const newLog = {
      id: Date.now().toString(),
      task: task,
      date: date || new Date().toISOString().split('T')[0]
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    try {
      await AsyncStorage.setItem('@care_logs', JSON.stringify(updatedLogs));
      setTask('');
      setDate('');
    } catch (error) {
      console.log('Error saving log', error);
    }
  };

  const deleteLog = async (id) => {
    const updatedLogs = logs.filter(item => item.id !== id);
    setLogs(updatedLogs);
    try {
      await AsyncStorage.setItem('@care_logs', JSON.stringify(updatedLogs));
    } catch (error) {
      console.log('Error deleting log', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>📅 Care Logbook & Schedule</Text>

      <View style={styles.formContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Task (e.g., Pruned branches, Watered)" 
          placeholderTextColor="#8c8275"
          value={task} 
          onChangeText={setTask} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Date (YYYY-MM-DD)" 
          placeholderTextColor="#8c8275"
          value={date} 
          onChangeText={setDate} 
        />

        <TouchableOpacity style={styles.addButton} onPress={addLog}>
          <Text style={styles.addButtonText}>+ Save Care Log</Text>
        </TouchableOpacity>
      </View>

      {logs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No care logs recorded yet. Start tracking your maintenance tasks above!</Text>
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.logCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskText}>💧 {item.task}</Text>
                <Text style={styles.dateText}>📅 Date: {item.date}</Text>
              </View>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteLog(item.id)}>
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7F4EF' }, // Soft Cream Background
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#2C5E43' },
  formContainer: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#E3DCB9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#E3DCB9', padding: 12, borderRadius: 10, marginBottom: 12, backgroundColor: '#FAF8F5', color: '#4A3B32' },
  addButton: { backgroundColor: '#3B7A57', padding: 14, borderRadius: 10, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  addButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  logCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E3DCB9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  taskText: { fontSize: 16, fontWeight: 'bold', color: '#2C5E43' },
  dateText: { fontSize: 13, color: '#7A6B5D', marginTop: 4 },
  deleteBtn: { backgroundColor: '#8C6239', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  deleteBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { textAlign: 'center', color: '#8c8275', fontSize: 15 }
});