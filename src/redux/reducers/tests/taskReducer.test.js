import taskReducer from '../taskReducer';
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
} from '../../actions/taskActions';

describe('taskReducer', () => {
  const initialState = {
    tasks: [],
    loading: false,
    refreshing: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(taskReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_TASKS_REQUEST with empty tasks', () => {
    const action = { type: FETCH_TASKS_REQUEST };
    const state = taskReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.refreshing).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle FETCH_TASKS_REQUEST with existing tasks', () => {
    const stateWithTasks = { ...initialState, tasks: [{ id: 1 }] };
    const action = { type: FETCH_TASKS_REQUEST };
    const state = taskReducer(stateWithTasks, action);

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(true);
  });

  it('should handle FETCH_TASKS_SUCCESS', () => {
    const tasks = [{ id: 1, title: 'Test' }];
    const action = { type: FETCH_TASKS_SUCCESS, payload: tasks };
    const state = taskReducer(initialState, action);

    expect(state.tasks).toEqual(tasks);
    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(false);
  });

  it('should handle FETCH_TASKS_FAILURE', () => {
    const error = 'Failed to fetch';
    const action = { type: FETCH_TASKS_FAILURE, payload: error };
    const state = taskReducer(initialState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(false);
  });

  it('should handle CREATE_TASK_REQUEST', () => {
    const action = { type: CREATE_TASK_REQUEST };
    const state = taskReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle CREATE_TASK_SUCCESS', () => {
    const action = { type: CREATE_TASK_SUCCESS };
    const state = taskReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
  });
});