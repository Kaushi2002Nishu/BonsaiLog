import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
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
    if (!task.trim()) return;
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

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Care Logbook & Schedule</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Task (e.g., Pruned branches, Watered)" 
        value={task} 
        onChangeText={setTask} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Date (YYYY-MM-DD)" 
        value={date} 
        onChangeText={setDate} 
      />

      <TouchableOpacity style={styles.addButton} onPress={addLog}>
        <Text style={styles.addButtonText}>+ Save Care Log</Text>
      </TouchableOpacity>

      <FlatList
        data={logs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.logCard}>
            <Text style={styles.taskText}>{item.task}</Text>
            <Text style={styles.dateText}>📅 {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#f9f9f9' },
  addButton: { backgroundColor: '#2980b9', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  logCard: { padding: 15, backgroundColor: '#eef6fc', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#d4e6f1' },
  taskText: { fontSize: 16, fontWeight: 'bold', color: '#1b4f72' },
  dateText: { fontSize: 13, color: '#566573', marginTop: 4 }
});