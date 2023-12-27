import api from '@/server/api';

export default class CategoryRepository {
    static async postCategory(body) {
        return api.post(`/category/save`, body);
    }

    static async putCategory(body) {
        return api.put(`/category/edit`, body);
    }

    static async getCategories(params) {
        return api.get(`/category/` + params);
    }

    static async getSearchCategory(page, perPage, category) {
        return api.get(`/category/list?page=${page}&perPage=${perPage}&active=1&search=${category}`);
    }
}