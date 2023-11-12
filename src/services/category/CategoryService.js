import CategoryRepository from '@/repositories/CategoryRepository';
import { messages } from '@/utils/messages/Message';

export function statusCode(error) {
    return messages(
      error.response.data.status,
      error.response.data.data,
      error.response.data.message
    );
}

export default class CategoryService {
    static async editCategoryModal(editedItem, item) {
        editedItem.id = item.categoriaId;
        editedItem.nome = item.nome;
        editedItem.ativo = item.ativo;
        $('#editCategoryModal').modal('show');
    }

    static async createCategory(body) {
        try {
            const response = await CategoryRepository.postCategory(body);
            return response.data;
        } catch (error) {
            return statusCode(error);
        }
    }

    static async editCategory(body) {
        try {
            const response = await CategoryRepository.putCategory(body);
            return response.data;
        } catch (error) {
            return statusCode(error);
        }
    }

    static async listCategories(page, perPage, ativo) {
        try {
            const response = await CategoryRepository.getCategories(page, perPage, ativo);
            return response.data;
        } catch (error) {
            return statusCode(error);
        }
    }

    static async getSearchCategory(page, perPage, category) {
        try {
            const response = await CategoryRepository.getSearchCategory(page, perPage, category);
            return response.data;
        } catch (error) {
            return statusCode(error);
        }
    }
}