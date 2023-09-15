import api from '@/api';

export default class CategoryService {
    static async getCategories(page, perPage) {
        try {
            const response = await api.get(`/category/list?page=${page}&perPage=${perPage}&active=1`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }

    static async getSearchCategory(page, perPage, category) {
        try {
            const response = await api.get(`/category/list?page=${page}&perPage=${perPage}&active=1&search=${category}`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
}