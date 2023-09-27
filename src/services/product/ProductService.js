import api from '@/server/api';
import { messages } from '@/support/message/Message';

export default class ProductService {
    static async getProducts(page, perPage, search, id) {
        try {
          const response = await api.get(`/product/list?page=${page}&perPage=${perPage}&search=${search}&id=${id}&active=1`);
          return response.data;
        } catch (error) {
          return messages(
            error.response.data.status,
            error.response.data.data,
            error.response.data.message
          );
        }
    }

    static async getProductDetails(id) {
        try {
          const response = await api.get(`/product/list/find?id=${id}&active=1`);
          return response.data.data;
        } catch (error) {
          throw error;
        }
    }
}