import api from '@/server/api';
import { removeUser } from '@/storages/EntityPersonStorage';

export default class TelephoneService {
  static async postTelephone(body) {
    try {
      const response = await api.post(`/telephone/save`, body);
      if (response.data.status === 200) {
        removeUser();
      }
      return response.data.message;
    } catch (error) {
      throw error;
    }
  }
}