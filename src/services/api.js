import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getUsers = async (page = 1) => {
  const response = await api.get(`/users?page=${page}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, {
      ...userData,
      updatedAt: new Date().toISOString()
    });
    

    return {
      ...userData,
      id,
      ...response.data
    };
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default api;