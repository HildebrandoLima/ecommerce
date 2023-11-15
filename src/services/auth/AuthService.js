import AuthRepository from '@/repositories/AuthRepository';
import { setAuth, removeAuth } from '@/storages/AuthStorage';
import { messages } from '@/utils/messages/Message';

export function statusCode(error) {
    return messages(
      error.response.data.status,
      error.response.data.data,
      error.response.data.message
    );
}

export default class AuthService {
    static async messageSuccess(user) {
        Swal.fire({
            icon: 'success',
            title: user.message,
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.reload(1);
            }
        });
    }

    static async returnObjectAuthProfileAdmin(user) {
        Swal.fire({
            icon: 'success',
            title: user.message,
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.reload(1);
            }
        });
    }

    static async returnObjectAuthProfileClient(user) {
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
            return statusCode(error);
        }
    }

    static async logout() {
        try {
            const response = await AuthRepository.logout();
            removeAuth();
            return response.data;
        } catch (error) {
            return statusCode(error);
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