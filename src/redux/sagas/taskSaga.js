import { call, put, takeLatest } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI } from "../../services/taskService";
import {
     CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
} from "../actions/taskActions";

function* fetchTasksSaga(action) {
  try {
    const token = yield call(AsyncStorage.getItem, "token");
    const response = yield call(fetchTasksAPI, action.payload, token);

    yield put({
      type: FETCH_TASKS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: FETCH_TASKS_FAILURE,
      payload: "Failed to fetch tasks",
    });
  }
}

function* createTaskSaga(action) {
  try {
    const token = yield call(AsyncStorage.getItem, "token");
    yield call(createTaskAPI, action.payload, token);
    yield put({ type: CREATE_TASK_SUCCESS });
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
    yield call(updateTaskAPI, action.payload.id, action.payload.data, token);
    yield put({ type: UPDATE_TASK_SUCCESS });
    yield put({ type: FETCH_TASKS_REQUEST, payload: action.payload.data.user_id });
  } catch (error) {
    yield put({
      type: UPDATE_TASK_FAILURE,
      payload: error.response?.data?.error || "Update failed",
    });
  }
}

function* deleteTaskSaga(action) {
  try {
    const token = yield call(AsyncStorage.getItem, "token");
    yield call(deleteTaskAPI, action.payload.id, token);
    yield put({ type: DELETE_TASK_SUCCESS });
    yield put({ type: FETCH_TASKS_REQUEST, payload: action.payload.userId });
  } catch (error) {
    yield put({
      type: DELETE_TASK_FAILURE,
      payload: error.response?.data?.error || "Delete failed",
    });
  }
}



export default function* taskSaga() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
  yield takeLatest(CREATE_TASK_REQUEST, createTaskSaga);
  yield takeLatest(UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeLatest(DELETE_TASK_REQUEST, deleteTaskSaga);
}