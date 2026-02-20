import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksRequest, deleteTaskRequest } from "../redux/actions/taskActions";
import { logoutRequest } from "../redux/actions/authActions";
import TaskCard from "../components/Taskcard";
import Loader from '../components/Loader';


const TaskListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { tasks, loading, refreshing, error } = useSelector(
    (state) => state.tasks
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTasksRequest(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        { text: "Retry", onPress: () => dispatch(fetchTasksRequest(user.id)) },
        { text: "OK" },
      ]);
    }
  }, [error]);

  const onRefresh = () => {
    dispatch(fetchTasksRequest(user.id));
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTaskRequest(taskId, user.id));
  };

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Tasks</Text>
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  </View>
);



const renderItem = ({ item }) => (
  <TaskCard
    task={item}
    onEdit={() => navigation.navigate("AddEditTask", { task: item })}
    onDelete={() => handleDelete(item.id)}
  />
);


  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Header />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditTask')}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>+ Add</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet. Add one to get started!</Text>
          </View>
        }
      />
    </View>
  );
};

export default TaskListScreen;

// "61a410f5f7b3ded5ce435b30e3cbee23b7ddcfe33beab84044272da893d2b363"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
  },
  logoutText: {
    color: '#d00',
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    minWidth: 70,
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    zIndex: 100,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});