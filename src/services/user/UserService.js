import api from '@/server/api';
import { setUser } from '@/storages/EntityPersonStorage';
import { messages } from '@/support/utils/messages/Message';

export default class UserService {
  static async postUser(body) {
      try {
        const response = await api.post(`/user/save`, body);
        setUser(response.data.data);
        return response.data;
      } catch (error) {
        return messages(
            error.response.data.status,
            error.response.data.data,
            error.response.data.message
        );
      }
  }

  static async putUser(body) {
    try {
      const response = await api.put(`/user/edit`, body);
      return response.data;
    } catch (error) {
      return messages(
          error.response.data.status,
          error.response.data.data,
          error.response.data.message
      );
    }
  }

  static async getUser(id) {
    try {
      const response = await api.get(`/user/list/find?id=${id}&active=1`);
      return response.data;
    } catch (error) {
      return messages(
        error.response.data.status,
        error.response.data.data,
        error.response.data.message
      );
    }
  }
}