import CategoryRepository from '@/repositories/CategoryRepository';
import MessagesService from '../shared/MessagesService';

export default class CategoryService {
    static messageSuccess(flag) {
        return MessagesService.messageSuccess(flag);
    }

    static messageError(flag) {
        return MessagesService.messageError(flag);
    }

    static editCategoryModal(editedItem, item) {
        editedItem.id = item.id;
        editedItem.nome = item.nome;
        editedItem.ativo = item.ativo;
        $('#editCategoryModal').modal('show');
    }

    static async createCategory(body) {
        try {
            const response = await CategoryRepository.postCategory(body);
            return response.data;
        } catch (error) {
            return MessagesService.statusCode(error);
        }
    }

    static async editCategory(body) {
        try {
            const response = await CategoryRepository.putCategory(body);
            return response.data;
        } catch (error) {
            return MessagesService.statusCode(error);
        }
    }

    static async listCategories(page, perPage, ativo) {
        try {
            const response = await CategoryRepository.getCategories(page, perPage, ativo);
            return response.data;
        } catch (error) {
            return MessagesService.statusCode(error);
        }
    }

    static async getSearchCategory(page, perPage, category) {
        try {
            const response = await CategoryRepository.getSearchCategory(page, perPage, category);
            return response.data;
        } catch (error) {
            return MessagesService.statusCode(error);
        }
    }
}