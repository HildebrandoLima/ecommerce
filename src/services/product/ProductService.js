import api from '@/server/api';
import { messages } from '@/utils/messages/Message';

export default class ProductService {
  static async postProduct(body) {
    try {
      const response = await api.post(`/product/save`, body);
      return response.data;
    } catch (error) {
      return messages(
        error.response.data.status,
        error.response.data.data,
        error.response.data.message
      );
    }
  }

  static async putProduct(body) {
    try {
      const response = await api.put(`/product/edit`, body);
      return response.data;
    } catch (error) {
      return messages(
        error.response.data.status,
        error.response.data.data,
        error.response.data.message
      );
    }
  }

  static async getProducts(page, perPage, search, id, ativo) {
      try {
        const response = await api.get(`/product/list?page=${page}&perPage=${perPage}&search=${search}&id=${id}&active=${ativo}`);
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