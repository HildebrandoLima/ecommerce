import api from '@/server/api';
import { messages } from '@/utils/messages/Message';

export default class CategoryService {
    static async postCategory(body) {
        try {
            const response = await api.post(`/category/save`, body);
            return response.data;
        } catch (error) {
            return messages(
                error.response.data.status,
                error.response.data.data,
                error.response.data.message
            );
        }
    }

    static async putCategory(body) {
        try {
            const response = await api.put(`/category/edit`, body);
            return response.data;
        } catch (error) {
            return messages(
                error.response.data.status,
                error.response.data.data,
                error.response.data.message
            );
        }
    }

    static async getCategories(page, perPage, ativo) {
        try {
            const response = await api.get(`/category/list?page=${page}&perPage=${perPage}&active=${ativo}`);
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