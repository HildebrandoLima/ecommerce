import TelephoneRepository from '@/repositories/telephone/TelephoneRepository';
import { removeUser } from '@/storages/EntityPersonStorage';
import { messages } from '@/utils/messages/Message';

export function statusCode(error) {
  return messages(
    error.response.data.status,
    error.response.data.data,
    error.response.data.message
  );
}

export default class TelephoneService {
  static async addTelephone(telephones, usuarioId) {
    telephones.push({
      ddd: "",
      numero: '',
      tipo: '',
      usuarioId: usuarioId,
    });
  }

  static async removeTelephone(telephones, index) {
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
      return statusCode(error);
    }
  }

  static async editTelephone(body) {
    try {
      const response = await TelephoneRepository.putTelephone(body);
      return response.data;
    } catch (error) {
      return statusCode(error);
    }
  }
}