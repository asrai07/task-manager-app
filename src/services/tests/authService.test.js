import axios from 'axios';
import { loginAPI, registerAPI } from '../authService';

jest.mock('axios');

describe('authService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginAPI', () => {
    it('should call login endpoint with credentials', async () => {
      const credentials = { email: 'test@example.com', password: 'pass123' };
      const mockResponse = { data: { token: 'abc123', user: { id: 1 } } };
      axios.post.mockResolvedValue(mockResponse);

      const result = await loginAPI(credentials);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/login'),
        credentials
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('registerAPI', () => {
    it('should call register endpoint with user data', async () => {
      const userData = { name: 'John', email: 'test@example.com', password: 'pass123' };
      const mockResponse = { data: { message: 'User registered successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const result = await registerAPI(userData);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/register'),
        userData
      );
      expect(result).toEqual(mockResponse);
    });
  });
});