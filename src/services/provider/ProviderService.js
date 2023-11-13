import ProviderRepository from '@/repositories/ProviderRepository';
import { messages } from '@/utils/messages/Message';

export function statusCode(error) {
  return messages(
    error.response.data.status,
    error.response.data.data,
    error.response.data.message
  );
}

export default class ProviderService {
  static editProviderModal(editedItem, item) {
    editedItem.id = item.fornecedorId;
    editedItem.razaoSocial = item.razaoSocial;
    editedItem.cnpj = item.cnpj;
    editedItem.email = item.email;
    editedItem.dataFundacao = item.dataFundacao;
    editedItem.ativo = item.ativo;
    $('#editProviderModal').modal('show');
  }

  static async createProvider(body) {
    try {
        const response = await ProviderRepository.postProvider(body);
        return response.data;
    } catch (error) {
        return statusCode(error);
    }
  }

  static async editProvider(body) {
    try {
        const response = await ProviderRepository.putProvider(body);
        return response.data;
    } catch (error) {
        return statusCode(error);
    }
  }

  static async listProviders(page, perPage, search, id, ativo) {
    try {
      const response = await ProviderRepository.getProviders(page, perPage, search, id, ativo);
      return response.data;
    } catch (error) {
      return statusCode(error);
    }
  }
}