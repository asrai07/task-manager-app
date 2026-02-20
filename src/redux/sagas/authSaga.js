import { call, put, takeLatest } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginAPI, registerAPI } from "../../services/authService";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESTORE_SESSION_REQUEST,
  RESTORE_SESSION_SUCCESS,
  RESTORE_SESSION_FAILURE,
  REGISTER_REQUEST,
REGISTER_SUCCESS,
REGISTER_FAILURE,
LOGOUT_REQUEST,
LOGOUT_SUCCESS,


} from "../actions/authActions";

// 🔐 LOGIN SAGA
function* loginSaga(action) {
  try {
    const response = yield call(loginAPI, action.payload);

    console.log("LOGIN DATA:", response.data);

    const { token, user } = response.data;

    if (!token) {
      throw new Error("No token received from server");
    }

    yield call(AsyncStorage.setItem, "token", token);
    yield call(AsyncStorage.setItem, "user", JSON.stringify(user));

    yield put({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });

  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      payload:
        error.response?.data?.error ||
        error.message ||
        "Login failed. Try again.",
    });
  }
}


// 🔁 RESTORE SESSION SAGA
function* restoreSessionSaga() {
  try {
    const token = yield call(AsyncStorage.getItem, "token");
    const user = yield call(AsyncStorage.getItem, "user");

    if (token && user) {
      yield put({
        type: RESTORE_SESSION_SUCCESS,
        payload: {
          token,
          user: JSON.parse(user),
        },
      });
    } else {
      yield put({ type: RESTORE_SESSION_FAILURE });
    }

  } catch (error) {
    yield put({ type: RESTORE_SESSION_FAILURE });
  }
}

function* registerSaga(action) {
  try {
    yield call(registerAPI, action.payload);
    yield put({
      type: REGISTER_SUCCESS,
      payload: "Registration successful",
    });
  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.error || "Registration failed",
    });
  }
}

  function* logoutSaga() {
  try {
    yield call(AsyncStorage.removeItem, "token");
    yield call(AsyncStorage.removeItem, "user");
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
     yield put({ type: LOGOUT_SUCCESS });
  }
}

// 👇 WATCHERS
export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(RESTORE_SESSION_REQUEST, restoreSessionSaga);
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}