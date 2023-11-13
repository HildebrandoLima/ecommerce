import api from '@/server/api';

export default class ProductRepository {
    static async postProduct(body) {
        return api.post(`/product/save`, body);
    }

    static async putProduct(body) {
        return api.put(`/product/edit`, body);
    }

    static async getProducts(page, perPage, search, id, ativo) {
        return api.get(`/product/list?page=${page}&perPage=${perPage}&search=${search}&id=${id}&active=${ativo}`);
    }

    static async getProduct(id, ativo) {
        return api.get(`/product/list/find?id=${id}&active=${ativo}`);
    }
}