import axios from "axios";

const BASE_URL = "http://10.0.2.2:8080/task_manager/index.php";

export const fetchTasksAPI = (userId, token) => {
  return axios.get(`${BASE_URL}/tasks?user_id=${userId}`, {
    headers: { Authorization: token },
  });
};

export const createTaskAPI = (data, token) => {
  return axios.post(`${BASE_URL}/tasks`, data, {
    headers: { Authorization: token },
  });
};

export const updateTaskAPI = (id, data, token) => {
  return axios.put(`${BASE_URL}/tasks/${id}`, data, {
    headers: { Authorization: token },
  });
};

export const deleteTaskAPI = (id, token) => {
  return axios.delete(`${BASE_URL}/tasks/${id}`, {
    headers: { Authorization: token },
  });
};