import api from '@/server/api';

export default class AddressRepository {
    static async postAddress(body) {
        return api.post(`/address/save`, body);
    }

    static async putAddress(body) {
        return api.put(`/address/edit`, body);
    }

    static async getAddress(cep) {
        return api.get(`/address/search/${cep}`);
    }
}