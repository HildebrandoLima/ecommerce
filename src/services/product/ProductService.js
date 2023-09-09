import api from '@/api';

export default class ProductService {
    static async getProducts(page, perPage) {
        try {
          const response = await api.get(`/product/list?page=${page}&perPage=${perPage}&active=1`);
          return response.data.data;
        } catch (error) {
          throw error;
        }
    }

    static async getProductDetails(productId) {
        try {
          //const response = await api.get(`/product/list?page=${page}&perPage=${perPage}&active=1`);
          //return response.data.data;
        } catch (error) {
          throw error;
        }
    }
}