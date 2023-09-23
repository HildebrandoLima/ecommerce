import api from '@/server/api';
import { cleanToCart } from '@/storages/CartStorage';
import { setOrder } from '@/storages/CheckoutStorage';

export default class OrderService {
    static async postOrder(body) {
        try {
            const response = await api.post(`/order/save`, body);
            if (response.data.status === 200) {
                setOrder(response.data.data);
                cleanToCart(this.cart);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}