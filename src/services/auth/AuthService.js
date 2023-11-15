import AuthRepository from '@/repositories/AuthRepository';
import MessagesService from '../shared/MessagesService';
import { setAuth, removeAuth } from '@/storages/AuthStorage';

export default class AuthService {
    static messageSuccess(user) {
        Swal.fire({
            icon: 'success',
            title: user.message,
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.reload(1);
            }
        });
    }

    static returnObjectAuthProfileAdmin(user) {
        Swal.fire({
            icon: 'success',
            title: user.message,
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.reload(1);
            }
        });
    }

    static returnObjectAuthProfileClient(user) {
        Swal.fire({
            icon: 'success',
            title: user.message,
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.reload(1);
            }
        });
    }

    static async login(body) {
        try {
            const response = await AuthRepository.login(body);
            setAuth(response.data.data);
            return response.data;
        } catch (error) {
            return MessagesService.statusCode(error);
        }
    }

    static async logout() {
        try {
            const response = await AuthRepository.logout();
            removeAuth();
            return response.data;
        } catch (error) {
            return MessagesService.statusCode(error);
        }
    }

    static async loginSocial(provider) {
        try {
            const response = await AuthRepository.loginSocial(provider);
            //const response = await api.get(`/auth/login/social/${provider}/callback`);
            setAuth(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}