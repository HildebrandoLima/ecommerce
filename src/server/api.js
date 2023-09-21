import axios from 'axios';
import { API_BASE_URL } from '../../env';
import bearerToken from './bearer-token';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    }
});

api.interceptors.request.use(bearerToken);

export default api;