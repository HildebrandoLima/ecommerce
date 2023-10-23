import api from '@/server/api';
import { messages } from '@/utils/messages/Message';

export default class ProviderService {
  static async postProvider(body) {
    try {
        const response = await api.post(`/provider/save`, body);
        return response.data;
    } catch (error) {
        return messages(
            error.response.data.status,
            error.response.data.data,
            error.response.data.message
        );
    }
  }

  static async putProvider(body) {
    try {
        const response = await api.put(`/provider/edit`, body);
        return response.data;
    } catch (error) {
        return messages(
            error.response.data.status,
            error.response.data.data,
            error.response.data.message
        );
    }
  }

  static async getProviders(page, perPage, search, id, ativo) {
    try {
      const response = await api.get(`/provider/list?page=${page}&perPage=${perPage}&search=${search}&id=${id}&active=${ativo}`);
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