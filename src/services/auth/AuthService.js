import api from '@/server/api';

export default class AuthService {
    static async login(body) {
        try {
            const response = await api.post(`/auth/login`, body);
            window.localStorage.setItem('userAuh', JSON.stringify(response.data.data));
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        try {
            const response = await api.post(`/auth/logout`);
            if (response.data.status === 200) {
                window.localStorage.removeItem('userAuh');
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
            window.localStorage.setItem('userAuh', JSON.stringify(response.data));
            return response.data.message;
        } catch (error) {
            throw error;
        }
    }
}