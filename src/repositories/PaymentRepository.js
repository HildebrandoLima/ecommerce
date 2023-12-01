import api from '@/server/api';

export default class PaymentRepository {
    static async postPayment(body) {
        return api.post(`/payment/save`, body);
    }
}