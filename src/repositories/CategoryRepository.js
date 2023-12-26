import api from '@/server/api';

export function isParamsEmpty(page, perPage, active) {
    if (page === 0 && perPage === 0 && active === 1) {
        return `list?active=${active}`;
    }
    return `list?page=${page}&perPage=${perPage}&active=${active}`;
}

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