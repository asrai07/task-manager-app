export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";

export const RESTORE_SESSION_REQUEST = "RESTORE_SESSION_REQUEST";
export const RESTORE_SESSION_SUCCESS = "RESTORE_SESSION_SUCCESS";
export const RESTORE_SESSION_FAILURE = "RESTORE_SESSION_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});


export const registerRequest = (data) => ({
  type: REGISTER_REQUEST,
  payload: data,
});


export const restoreSessionRequest = () => ({
  type: RESTORE_SESSION_REQUEST,
});


export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR,
});