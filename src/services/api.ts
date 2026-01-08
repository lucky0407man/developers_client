import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  console.log('API_URL:', API_URL);
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, payload: any) => {
  const response = await axios.put(`${API_URL}/users/${id}`, payload);
  return response.data;
};

export const createUser = async (payload: any) => {
  const response = await axios.post(`${API_URL}/users`, payload);
  return response.data;
};