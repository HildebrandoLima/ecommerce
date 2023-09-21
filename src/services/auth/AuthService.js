import api from '@/server/api';
import { setAuth, removeAuth } from '@/storages/AuthStorage';

export default class AuthService {
    static async login(body) {
        try {
            const response = await api.post(`/auth/login`, body);
            setAuth(response.data.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        try {
            const response = await api.post(`/auth/logout`);
            if (response.data.status === 200) {
                removeAuth();
            }
            return response.data.message;
        } catch (error) {
            throw error;
        }
    }

    static async loginSocial(provider) {
        try {
            const response = await api.get(`/auth/login/social/${provider}`);
            //console.log('oi', response);
            //const response = await api.get(`/auth/login/social/${provider}/callback`);
            window.localStorage.setItem('userAuth', JSON.stringify(response.data));
            return response.data.message;
        } catch (error) {
            throw error;
        }
    }
}