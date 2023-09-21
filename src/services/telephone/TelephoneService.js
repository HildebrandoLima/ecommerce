import api from '@/server/api';

export default class TelephoneService {
  static async postTelephone(body) {
    try {
      const response = await api.post(`/telephone/save`, body);
      if (response.data.status === 200) {
        window.localStorage.removeItem('userId');
      }
      return response.data.message;
    } catch (error) {
      throw error;
    }
  }
}