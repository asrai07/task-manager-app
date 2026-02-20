import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
     CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
} from "../actions/taskActions";

const BASE_URL = "http://10.0.2.2:8080/task_manager/index.php";

function* fetchTasksSaga(action) {
  try {
    const token = yield call(AsyncStorage.getItem, "token");
console.log('dddddd',BASE_URL,token);

    const response = yield call(
      axios.get,
      `${BASE_URL}/tasks?user_id=${action.payload}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
console.log('response',response.data);

    yield put({
      type: FETCH_TASKS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {

    console.log("TASK ERROR FULL:", error);
  console.log("TASK ERROR RESPONSE:", error.response?.data);
  console.log("TASK ERROR MESSAGE:", error.message);
    yield put({
      type: FETCH_TASKS_FAILURE,
      payload: "Failed to fetch tasks",
    });
  }
}

function* createTaskSaga(action) {
  try {
    const token = yield call(AsyncStorage.getItem, "token");

    yield call(
      axios.post,
      `${BASE_URL}/tasks`,
      action.payload,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    yield put({ type: CREATE_TASK_SUCCESS });

    // Refresh tasks automatically
    yield put({ type: FETCH_TASKS_REQUEST, payload: action.payload.user_id });

  } catch (error) {
    yield put({
      type: CREATE_TASK_FAILURE,
      payload: error.response?.data?.error || "Create failed",
    });
  }
}

function* updateTaskSaga(action) {
  try {
    const token = yield call(AsyncStorage.getItem, "token");

    yield call(
      axios.put,
      `${BASE_URL}/tasks/${action.payload.id}`,
      action.payload.data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    yield put({ type: UPDATE_TASK_SUCCESS });

    yield put({
      type: FETCH_TASKS_REQUEST,
      payload: action.payload.data.user_id,
    });

  } catch (error) {
    yield put({
      type: UPDATE_TASK_FAILURE,
      payload: error.response?.data?.error || "Update failed",
    });
  }
}



export default function* taskSaga() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
  yield takeLatest(CREATE_TASK_REQUEST, createTaskSaga);
  yield takeLatest(UPDATE_TASK_REQUEST, updateTaskSaga);
}
