export const FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";

export const CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE";

export const UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE";

export const createTaskRequest = (data) => ({
  type: CREATE_TASK_REQUEST,
  payload: data,
});

export const updateTaskRequest = (id, data) => ({
  type: UPDATE_TASK_REQUEST,
  payload: { id, data },
});


export const fetchTasksRequest = (userId) => ({
  type: FETCH_TASKS_REQUEST,
  payload: userId,
});
