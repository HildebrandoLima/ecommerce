import api from '@/server/api';

export default class OrderRepository {
    static async postOrder(body) {
        return api.post(`/order/save`, body);
    }

    static async getOrders(page, perPage, id) {
        return api.get(`/order/list?page=${page}&perPage=${perPage}&id=${id}&active=1`);
    }
}