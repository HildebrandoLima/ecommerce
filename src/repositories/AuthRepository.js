import api from '@/server/api';

export default class AuthRepository {
    static async login(body) {
        return api.post(`/auth/login`, body);
    }

    static async logout() {
        return api.post(`/auth/logout`);
    }

    static async loginSocial(provider) {
        return api.get(`/auth/login/social/${provider}`);
    }
}