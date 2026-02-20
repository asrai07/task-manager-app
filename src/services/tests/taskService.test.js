import axios from 'axios';
import { fetchTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI } from '../taskService';

jest.mock('axios');

describe('taskService', () => {
  const mockToken = 'test-token';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch tasks with user id and token', async () => {
    const mockResponse = { data: { data: [{ id: 1, title: 'Test' }] } };
    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchTasksAPI(1, mockToken);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/tasks?user_id=1'),
      { headers: { Authorization: mockToken } }
    );
    expect(result).toEqual(mockResponse);
  });

  it('should create task with data and token', async () => {
    const taskData = { title: 'New Task', description: 'Test', status: 'pending' };
    axios.post.mockResolvedValue({ data: { message: 'Task created' } });

    await createTaskAPI(taskData, mockToken);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/tasks'),
      taskData,
      { headers: { Authorization: mockToken } }
    );
  });

  it('should update task with id, data and token', async () => {
    const taskData = { title: 'Updated', description: 'Test', status: 'completed' };
    axios.put.mockResolvedValue({ data: { message: 'Task updated' } });

    await updateTaskAPI(1, taskData, mockToken);

    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/1'),
      taskData,
      { headers: { Authorization: mockToken } }
    );
  });

  it('should delete task with id and token', async () => {
    axios.delete.mockResolvedValue({ data: { message: 'Task deleted' } });

    await deleteTaskAPI(1, mockToken);

    expect(axios.delete).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/1'),
      { headers: { Authorization: mockToken } }
    );
  });
});