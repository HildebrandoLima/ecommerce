import axios from 'axios';
import { token } from '@/storages/AuthStorage';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-type': 'application/json',
    }
});

api.interceptors.request.use(config => {
    const accessToken = token();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default api;