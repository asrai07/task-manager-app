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

const initialState = {
  tasks: [],
  loading: false,
  refreshing: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE_TASK_REQUEST:
case UPDATE_TASK_REQUEST:
  return { ...state, loading: true, error: null };

case CREATE_TASK_SUCCESS:
case UPDATE_TASK_SUCCESS:
  return { ...state, loading: false };

case CREATE_TASK_FAILURE:
case UPDATE_TASK_FAILURE:
  return { ...state, loading: false, error: action.payload };


    case FETCH_TASKS_REQUEST:
      return { 
        ...state, 
        loading: state.tasks.length === 0, 
        refreshing: state.tasks.length > 0,
        error: null 
      };

    case FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, refreshing: false, tasks: action.payload };

    case FETCH_TASKS_FAILURE:
      return { ...state, loading: false, refreshing: false, error: action.payload };

    default:
      return state;
  }
};

export default taskReducer;