import api from '@/server/api';
import { setOrder } from '@/storages/CheckoutStorage';
import { messages } from '@/utils/messages/Message';

export default class OrderService {
    static async postOrder(body) {
        try {
            const response = await api.post(`/order/save`, body);
            setOrder(response.data.data);
            return response.data;
        } catch (error) {
            return messages(
                error.response.data.status,
                error.response.data.data,
                error.response.data.message
            );
        }
    }

    static async getOrders(page, perPage, id) {
        try {
          const response = await api.get(`/order/list?page=${page}&perPage=${perPage}&id=${id}&active=1`);
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