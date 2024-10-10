import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const uploadImage = async (userId, file) => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  const formData = new FormData();
  formData.append('image', file);
  formData.append('userId', userId);

  //console.log("gonna upload using token: ", token);
  const response = await api.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getUserImages = async (userId) => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  try {
    const response = await api.get(`/images/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user images:', error.response?.data || error.message);
    throw error;
  }
};

export const getImageAnalysis = async (imageId) => {
  const response = await api.get(`/images/${imageId}/analysis`);
  return response.data;
};

export const findSimilarImages = async (imageId) => {
  const response = await api.get(`/images/${imageId}/similar`);
  return response.data;
};
