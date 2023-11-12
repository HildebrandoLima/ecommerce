import PaymentRepository from '@/repositories/PaymentRepository';
import { cleanToCart, removeTotalCart } from '@/storages/CartStorage';
import { removeOrder } from '@/storages/CheckoutStorage';
import { messages } from '@/utils/messages/Message';

export function statusCode(error) {
    return messages(
      error.response.data.status,
      error.response.data.data,
      error.response.data.message
    );
}

export default class PaymentService {
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