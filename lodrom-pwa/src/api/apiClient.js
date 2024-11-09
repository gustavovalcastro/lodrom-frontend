import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-backend-api.com/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
