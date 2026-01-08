import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:7144",
});

export default api;
