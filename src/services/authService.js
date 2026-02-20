import axios from "axios";

const BASE_URL = "http://10.0.2.2:8080/task_manager/index.php";

export const loginAPI = (credentials) => {
  return axios.post(`${BASE_URL}/login`, credentials);
};

export const registerAPI = (data) => {
  return axios.post(`${BASE_URL}/register`, data);
};