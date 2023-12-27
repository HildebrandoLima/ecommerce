import api from '@/server/api';

export default class ProviderRepository {
    static async postProvider(body) {
        return api.post(`/provider/save`, body);
    }

    static async putProvider(body) {
        return api.put(`/provider/edit`, body);
    }

    static async getProviders(params) {
        return api.get(`/provider/` + params);
    }
}