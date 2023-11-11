import api from '@/server/api';

export default class AddressRepository {
    static async postAddress(body) {
        return api.post(`/address/save`, body);
    }

    static async putAddress(body) {
        return api.put(`/address/edit`, body);
    }

    static async viaCep(cep) {
        return api.get(`https://viacep.com.br/ws/${cep}/json/`);
    }
}