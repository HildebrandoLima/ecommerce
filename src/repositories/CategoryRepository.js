import api from '@/server/api';

export default class CategoryRepository {
    static async postCategory(body) {
        return api.post(`/category/save`, body);
    }

    static async putCategory(body) {
        return api.put(`/category/edit`, body);
    }

    static async getCategories(page, perPage, ativo) {
        return api.get(`/category/list?page=${page}&perPage=${perPage}&active=${ativo}`);
    }

    static async getSearchCategory(page, perPage, category) {
        return api.get(`/category/list?page=${page}&perPage=${perPage}&active=1&search=${category}`);
    }
}