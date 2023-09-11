import api from '@/api';

export default class AuthService {
    static async login(body) {
        try {
            const response = await api.post(`/auth/login`, body);
            localStorage.setItem('userAuh', JSON.stringify(response.data.data));
            return response.data.message;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        try {
            const response = await api.post(`/auth/logout`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
}