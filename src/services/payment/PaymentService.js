import api from '@/server/api';
import { removeTotalCart } from '@/storages/CartStorage';
import { removeOrder } from '@/storages/CheckoutStorage';

export default class PaymentService {
    static async postPayment(body) {
        try {
            const response = await api.post(`/payment/save`, body);
            if (response.data.status === 200) {
                removeTotalCart();
                removeOrder();
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}