import api from '@/server/api';
import { setAuth, removeAuth } from '@/storages/AuthStorage';
import { messages } from '@/support/utils/messages/Message';

export default class AuthService {
    static async login(body) {
        try {
            const response = await api.post(`/auth/login`, body);
            setAuth(response.data.data);
            return response.data.data;
        } catch (error) {
            return messages(
                error.response.data.status,
                error.response.data.data,
                error.response.data.message
            );
        }
    }

    static async logout() {
        try {
            const response = await api.post(`/auth/logout`);
            removeAuth();
            return response.data;
        } catch (error) {
            return messages(
                error.response.data.status,
                error.response.data.data,
                error.response.data.message
            );
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