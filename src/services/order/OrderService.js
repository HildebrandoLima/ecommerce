import api from '@/server/api';
import { setOrder } from '@/storages/CheckoutStorage';
import { messages } from '@/support/utils/messages/Message';

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
}