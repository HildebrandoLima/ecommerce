import TelephoneRepository from '@/repositories/TelephoneRepository';
import MessagesService from '../shared/MessagesService';
import { removeUser } from '@/storages/EntityPersonStorage';

export default class TelephoneService {
  static messageSuccess(flag) {
    return MessagesService.messageSuccess(flag);
  }

  static messageError(flag) {
    return MessagesService.messageError(flag);
  }

  static addTelephone(telephones, usuarioId) {
    telephones.push({
      ddd: "",
      numero: '',
      tipo: '',
      usuarioId: usuarioId,
    });
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