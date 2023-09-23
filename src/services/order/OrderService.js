import api from '@/server/api';

export default class OrderService {
    static async postOrder(body) {
        try {
            const response = await api.post(`/order/save`, body);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}