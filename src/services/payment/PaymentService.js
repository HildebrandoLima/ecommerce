import PaymentRepository from '@/repositories/PaymentRepository';
import MessagesService from '../shared/MessagesService';
import { cleanToCart, removeTotalCart } from '@/storages/CartStorage';
import { getTotalCart } from '@/storages/CartStorage';
import { getOrder, removeOrder } from '@/storages/CheckoutStorage';

export default class PaymentService {
  static messageError(flag) {
    return MessagesService.messageError(flag);
  }

  static messageSuccess() {
    const data = {
      message: 'Compra Finalizada com Sucesso.',
    };
    return MessagesService.messageSuccess(data);
  }

  static getTotalCart() {
    return getTotalCart();
  }

  static getOrder() {
    return getOrder();
  } 

  static async createPayment(body) {
      try {
          const response = await PaymentRepository.postPayment(body);
          cleanToCart(this.cart);
          removeTotalCart();
          removeOrder();
          return response.data;
      } catch (error) {
          return MessagesService.statusCode(error);
      }
  }
}