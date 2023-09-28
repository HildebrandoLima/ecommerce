import api from '@/server/api';
import { cleanToCart, removeTotalCart } from '@/storages/CartStorage';
import { removeOrder } from '@/storages/CheckoutStorage';
import { messages } from '@/support/utils/messages/Message';

export default class PaymentService {
    static async postPayment(body) {
        try {
            const response = await api.post(`/payment/save`, body);
            cleanToCart(this.cart);
            removeTotalCart();
            removeOrder();
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