import PaymentRepository from '@/repositories/PaymentRepository';
import { cleanToCart, removeTotalCart } from '@/storages/CartStorage';
import { getTotalCart } from '@/storages/CartStorage';
import { getOrder, removeOrder } from '@/storages/CheckoutStorage';
import { messages } from '@/utils/messages/Message';
import { ORDER_TO_GENERATE_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export function statusCode(error) {
    return messages(
      error.response.data.status,
      error.response.data.data,
      error.response.data.message
    );
}

export default class PaymentService {
  static messageError(orderId) {
    if (!orderId) {
      return ORDER_TO_GENERATE_MESSAGE;
    }
  }

  static messageSucess() {
    Swal.fire({
      icon: 'success',
      title: 'Compra Finalizada com Sucesso.',
    }).then((result) => {
      if(result.isConfirmed) {
        window.location.reload(1);
      }
    });
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
          return statusCode(error);
      }
  }
}