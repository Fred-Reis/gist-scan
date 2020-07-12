import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com/gists',
});

export default api;
