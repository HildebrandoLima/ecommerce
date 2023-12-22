import TelephoneRepository from '@/repositories/TelephoneRepository';
import MessagesService from '../shared/MessagesService';
import { removeUser, removeProvider } from '@/storages/EntityPersonStorage';

export default class TelephoneService {
  static messageSuccess(flag) {
    return MessagesService.messageSuccess(flag);
  }

  static messageError(flag) {
    return MessagesService.messageError(flag);
  }

  static addTelephone(telephones, userId, providerId) {
    const telephone = {
      ddd: '',
      numero: '',
      tipo: '',
    };
    if(userId !== 0) {
      telephone.usuarioId = userId;
    } else {
      telephone.fornecedorId = providerId;
    }
    telephones.push(telephone);
  }

  static removeTelephone(telephones, index) {
    if (telephones.length === 1) {
      return;
    } else {
      telephones.splice(index, 1);
    }
  }

  static async createTelephone(body) {
    try {
      const response = await TelephoneRepository.postTelephone(body);
      removeUser();
      removeProvider();
      return response.data;
    } catch (error) {
      return MessagesService.statusCode(error);
    }
  }

  static async editTelephone(body) {
    try {
      const response = await TelephoneRepository.putTelephone(body);
      return response.data;
    } catch (error) {
      return MessagesService.statusCode(error);
    }
  }
}