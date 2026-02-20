import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator, View } from "react-native";
import SignupScreen from "../screens/SignupScreen";

import LoginScreen from "../screens/LoginScreen";
import TaskListScreen from "../screens/TaskListScreen";
import AddEditTaskScreen from "../screens/AddEditTaskScreen";
import { restoreSessionRequest } from "../redux/actions/authActions";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreSessionRequest());
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {token ? (
          <>
            {/* hide the default header on task list; we render our own inside the screen */}
            <Stack.Screen
              name="Tasks"
              component={TaskListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="AddEditTask" component={AddEditTaskScreen} />
          </>
        ) : (
          <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
