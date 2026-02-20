import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text
        style={[
          styles.status,
          task.status === 'completed' ? styles.statusCompleted : styles.statusPending,
        ]}
      >
        Status: {task.status}
      </Text>

      <View style={styles.buttonRow}>
        <Button title="Edit" onPress={onEdit} style={styles.editButton} />
        <Button title="Delete" onPress={onDelete} variant="danger" style={styles.deleteButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 8,
    color: '#555',
  },
  status: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
  statusCompleted: {
    color: 'green',
  },
  statusPending: {
    color: 'orange',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    flex: 1,
    paddingVertical: 8,
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 8,
  },
});

export default TaskCard;