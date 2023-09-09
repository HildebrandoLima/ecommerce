import api from '@/api';

export default class UserService {
    static async postUser(body) {
        try {
          const response = await api.post(`/user/save`, body);
          localStorage.setItem('usuario', response.data.data);
          return response.data.message;
        } catch (error) {
          throw error;
        }
    }
}