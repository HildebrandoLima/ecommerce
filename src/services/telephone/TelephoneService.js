import api from '@/server/api';
import { removeUser } from '@/storages/EntityPersonStorage';
import { messages } from '@/utils/messages/Message';

export default class TelephoneService {
  static async postTelephone(body) {
    try {
      const response = await api.post(`/telephone/save`, body);
      removeUser();
      return response.data;
    } catch (error) {
      return messages(
        error.response.data.status,
        error.response.data.data,
        error.response.data.message
      );
    }
  }

  static async putTelephone(body) {
    try {
      const response = await api.put(`/telephone/edit`, body);
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