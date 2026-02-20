import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_AUTH_ERROR,
  RESTORE_SESSION_REQUEST,
  RESTORE_SESSION_SUCCESS,
  RESTORE_SESSION_FAILURE,
  REGISTER_REQUEST,
   REGISTER_SUCCESS,
   REGISTER_FAILURE,
   LOGOUT_SUCCESS 
} from "../actions/authActions";

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case RESTORE_SESSION_REQUEST:
  return { ...state, loading: true };

case RESTORE_SESSION_SUCCESS:
  return {
    ...state,
    loading: false,
    token: action.payload.token,
    user: action.payload.user,
  };

case RESTORE_SESSION_FAILURE:
  return { ...state, loading: false };

  case REGISTER_REQUEST:
  return { ...state, loading: true, error: null };

case REGISTER_SUCCESS:
  return { ...state, loading: false };

case REGISTER_FAILURE:
  return { ...state, loading: false, error: action.payload };

  case LOGOUT_SUCCESS:
  return {
    loading: false,
    token: null,
    user: null,
    error: null,
  };

  case CLEAR_AUTH_ERROR:
    return { ...state, error: null };


    default:
      return state;
  }
};

export default authReducer;