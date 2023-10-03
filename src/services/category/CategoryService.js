import api from '@/server/api';
import { messages } from '@/utils/messages/Message';

export default class CategoryService {
    static async getCategories(page, perPage) {
        try {
            const response = await api.get(`/category/list?page=${page}&perPage=${perPage}&active=1`);
            return response.data;
        } catch (error) {
            return messages(
                error.response.data.status,
                error.response.data.data,
                error.response.data.message
            );
        }
    }

    static async getSearchCategory(page, perPage, category) {
        try {
            const response = await api.get(`/category/list?page=${page}&perPage=${perPage}&active=1&search=${category}`);
            return response.data;
        } catch (error) {
            return messages(
                error.response.data.status,
                error.response.data.data,
                error.response.data.message
            );
        }
    }
}