import api from '@/server/api';

export default class ProductRepository {
    static async postProduct(body) {
        return api.post(`/product/save`, body);
    }

    static async putProduct(body) {
        return api.put(`/product/edit`, body);
    }

    static async getProducts(page, perPage, search, active) {
        return api.get(`/product/list?page=${page}&perPage=${perPage}&search=${search}&active=${active}`);
    }

    static async getProduct(id, active) {
        return api.get(`/product/list/find?id=${id}&active=${active}`);
    }
}