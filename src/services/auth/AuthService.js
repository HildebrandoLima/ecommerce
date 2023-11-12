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
    static async returnObjectAuth(user) {
        if (user.data.status === 200) {
            if (user.data.data.isAdmin == true) {
                Swal.fire({
                    icon: 'success',
                    title: user.data.message,
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.reload(1);
                    }
                });
                this.$router.push({name: 'dashboard'});
            } else if (user.data.data.isAdmin == false) {
                messages(
                    user.data.status,
                    user.data.data,
                    user.data.message
                );
                this.$router.push({name: 'home'});
            }
        } else {
            return user;
        }
    }

    static async login(body) {
        try {
            const response = await AuthRepository.login(body);
            setAuth(response.data.data);
            return response;
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