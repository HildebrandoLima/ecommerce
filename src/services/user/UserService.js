import api from '@/server/api';
import { setUser } from '@/storages/EntityPersonStorage';

export default class UserService {
    static async postUser(body) {
        try {
          const response = await api.post(`/user/save`, body);
          setUser(response.data.data);
          return response.data.message;
        } catch (error) {
          throw error;
        }
    }
}