import axios from 'axios';

// Set up default config for axios requests
axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export default axios;
