import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};