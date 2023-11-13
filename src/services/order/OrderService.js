import OrderRepository from '@/repositories/OrderRepository';
import { setOrder } from '@/storages/CheckoutStorage';
import { messages } from '@/utils/messages/Message';

export function statusCode(error) {
  return messages(
    error.response.data.status,
    error.response.data.data,
    error.response.data.message
  );
}

export default class OrderService {
  static async createOrder(body) {
      try {
          const response = await OrderRepository.postOrder(body);
          setOrder(response.data.data);
          return response.data;
      } catch (error) {
          return statusCode(error);
      }
  }

  static async listOrders(page, perPage, id) {
      try {
        const response = await OrderRepository.getOrders(page, perPage, id);
        return response.data;
      } catch (error) {
        return statusCode(error);
      }
    }
}