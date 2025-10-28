import axios from 'axios';

/**
 * API version to use
 */
const API_VERSION = 'v1';

/**
 * Base API client configuration
 */
const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/${API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 */
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

/**
 * Response interceptor
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  },
);

export default apiClient;
