import axios from 'axios';
const customFetch = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  // baseURL: `http://localhost:8000/api/v1`,
  withCredentials: true,
});

export default customFetch;
