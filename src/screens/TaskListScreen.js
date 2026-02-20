import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksRequest } from "../redux/actions/taskActions";
import { logoutRequest } from "../redux/actions/authActions";


const TaskListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { tasks, loading, error } = useSelector(
    (state) => state.tasks
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTasksRequest(user.id));
    }
  }, [user]);

  const onRefresh = () => {
    dispatch(fetchTasksRequest(user.id));
  };

  const handleLogout = () => {
  dispatch(logoutRequest());
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
  <View style={styles.card}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
    <Text style={[styles.status, item.status === 'Completed' ? styles.statusCompleted : styles.statusPending]}>Status: {item.status}</Text>

    <TouchableOpacity
      style={styles.editButton}
      onPress={() =>
        navigation.navigate("AddEditTask", { task: item })
      }
    >
      <Text style={styles.editButtonText}>Edit</Text>
    </TouchableOpacity>
  </View>
);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
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
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
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
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
