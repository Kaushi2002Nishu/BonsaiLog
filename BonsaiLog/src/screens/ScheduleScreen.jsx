import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LeafWatermark from '../components/LeafWatermark';

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
      task: task.trim(),
      date: date.trim() || new Date().toISOString().split('T')[0],
    };

    const updatedLogs = [newLog, ...logs];
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
    const updatedLogs = logs.filter((item) => item.id !== id);
    setLogs(updatedLogs);
    try {
      await AsyncStorage.setItem('@care_logs', JSON.stringify(updatedLogs));
    } catch (error) {
      console.log('Error deleting log', error);
    }
  };

  const renderLog = ({ item }) => (
    <View style={styles.logCard}>
      <View style={styles.logIcon}>
        <Text style={{ fontSize: 18 }}>💧</Text>
      </View>
      <View style={styles.logBody}>
        <Text style={styles.taskText}>{item.task}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteLog(item.id)}>
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LeafWatermark />
      <View style={styles.centerWrap}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Add Care Log</Text>
          <Text style={styles.formHint}>Record pruning, watering, wiring and more</Text>

          <Text style={styles.fieldLabel}>Task</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Pruned Black Pine"
            placeholderTextColor="#9a8f82"
            value={task}
            onChangeText={setTask}
          />

          <Text style={styles.fieldLabel}>Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD (optional)"
            placeholderTextColor="#9a8f82"
            value={date}
            onChangeText={setDate}
          />

          <TouchableOpacity style={styles.addButton} onPress={addLog} activeOpacity={0.85}>
            <Text style={styles.addButtonText}>+ Save Care Log</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listSection}>
        {logs.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No care logs yet</Text>
            <Text style={styles.emptyText}>
              Your care history will appear here after you save a log.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Recent logs ({logs.length})</Text>
            <FlatList
              data={logs}
              keyExtractor={(item) => item.id}
              renderItem={renderLog}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },
  centerWrap: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  formCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C5E43',
    textAlign: 'center',
    marginBottom: 4,
  },
  formHint: {
    fontSize: 12,
    color: '#7A6B5D',
    textAlign: 'center',
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8C6239',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3DCB9',
    backgroundColor: '#FAF8F5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 14,
    color: '#4A3B32',
  },
  addButton: {
    backgroundColor: '#3B7A57',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C5E43',
    marginBottom: 12,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C5E43',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#8c8275',
    fontSize: 13,
    lineHeight: 20,
  },
  logCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3DCB9',
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },
  logIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logBody: {
    flex: 1,
  },
  taskText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C5E43',
  },
  dateText: {
    fontSize: 12,
    color: '#7A6B5D',
    marginTop: 3,
  },
  deleteBtn: {
    backgroundColor: '#8C6239',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
});