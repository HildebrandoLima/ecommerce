import api from '@/server/api';

export default class ProviderRepository {
    static async postProvider(body) {
        return api.post(`/provider/save`, body);
    }

    static async putProvider(body) {
        return api.put(`/provider/edit`, body);
    }

    static async getProviders(page, perPage, search, id, ativo) {
        return api.get(`/provider/list?page=${page}&perPage=${perPage}&search=${search}&id=${id}&active=${ativo}`);
    }
}