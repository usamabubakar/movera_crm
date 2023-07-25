import axios from 'axios';

const getTokenConfig = () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export default getTokenConfig;
