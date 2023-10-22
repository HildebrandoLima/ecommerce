import api from '@/server/api';
import { messages } from '@/utils/messages/Message';

export default class ProviderService {
    static async getProviders(page, perPage, search, id) {
        try {
          const response = await api.get(`/provider/list?page=${page}&perPage=${perPage}&search=${search}&id=${id}&active=1`);
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