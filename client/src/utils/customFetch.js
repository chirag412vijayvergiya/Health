import axios from 'axios';
const customFetch = axios.create({
  baseURL: `api/v1`,
  withCredentials: true,
});

export default customFetch;
