import api from '@/server/api';

export default class UserService {
    static async postUser(body) {
        try {
          const response = await api.post(`/user/save`, body);
          window.localStorage.setItem('userId', response.data.data);
          return response.data.message;
        } catch (error) {
          throw error;
        }
    }
}