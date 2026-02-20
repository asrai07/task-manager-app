import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  createTaskRequest,
  updateTaskRequest,
} from "../redux/actions/taskActions";
import Input from '../components/Input';
import Button from '../components/Button';

const AddEditTaskScreen = ({ route, navigation }) => {
  const task = route.params?.task;

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    if (!title) {
      Alert.alert("Validation", "Title required");
      return;
    }

    if (title.length > 200) {
      Alert.alert("Validation", "Title must be less than 200 characters");
      return;
    }

    if (description.length > 1000) {
      Alert.alert("Validation", "Description must be less than 1000 characters");
      return;
    }

    const validStatuses = ['pending', 'in_progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      Alert.alert("Validation", "Invalid status");
      return;
    }

    const data = {
      user_id: user.id,
      title,
      description,
      status,
    };

    if (task) {
    dispatch(updateTaskRequest(task.id, data));
    Alert.alert("Success", "Task updated");
  } else {
    dispatch(createTaskRequest(data));
    Alert.alert("Success", "Task created");
  }

  navigation.goBack();
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title *</Text>
      <Input
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <Input
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.statusContainer}>
        {['pending', 'in_progress', 'Completed'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[
              styles.statusButton,
              status === s && styles.statusButtonActive,
            ]}
            onPress={() => setStatus(s)}
          >
            <Text
              style={[
                styles.statusButtonText,
                status === s && styles.statusButtonTextActive,
              ]}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title={task ? "Update Task" : "Create Task"}
        onPress={handleSubmit}
        loading={loading}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

export default AddEditTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  statusButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 30,
  },
});