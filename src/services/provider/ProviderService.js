import ProviderRepository from '@/repositories/ProviderRepository';
import MessagesService from '../shared/MessagesService';
import UrlParamsService from '../shared/UrlParamsService';
import { setProvider } from '@/storages/EntityPersonStorage';

export default class ProviderService {
  static messageSuccess(flag) {
    return MessagesService.messageSuccess(flag);
  }

  static messageError(flag) {
    return MessagesService.messageError(flag);
  }

  static editProviderModal(editedItem, item) {
    editedItem.id = item.id;
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
        setProvider(response.data.data);
        return response.data;
    } catch (error) {
        return MessagesService.statusCode(error);
    }
  }

  static async editProvider(body) {
    try {
        const response = await ProviderRepository.putProvider(body);
        return response.data;
    } catch (error) {
        return MessagesService.statusCode(error);
    }
  }

  static async listProviders(page, perPage, active) {
    try {
      const queryParams = UrlParamsService.paginated(page, perPage, active);
      const response = await ProviderRepository.getProviders(queryParams);
      return response.data;
    } catch (error) {
      return MessagesService.statusCode(error);
    }
  }
}