import UserRepository from '@/repositories/UserRepository';
import MessagesService from '../shared/MessagesService';
import { setUser } from '@/storages/EntityPersonStorage';

export default class UserService {
  static messageSuccess(flag) {
    return MessagesService.messageSuccess(flag);
  }

  static messageError(flag) {
    return MessagesService.messageError(flag);
  }

  static alertEditUser() {
    throw Swal.fire({
      icon: 'warning',
      title:
      'Tem certeza que deseja desativar sua conta?<br>' +
      'Somente o suporte poderá reativar.',
    }).then((result) => {
      if(result.isConfirmed) {
        $('.modal').modal('hide'); 
      }
    });
  }

  static async createUser(body) {
      try {
        const response = await UserRepository.postUser(body);
        setUser(response.data.data);
        return response.data;
      } catch (error) {
        return MessagesService.statusCode(error);
      }
  }

  static async editUser(body) {
    try {
      const response = await UserRepository.putUser(body);
      return response.data;
    } catch (error) {
      return MessagesService.statusCode(error);
    }
  }

  static async listUsers(page, perPage, search, id) {
    try {
      const response = await UserRepository.getUsers(page, perPage, search, id);
      return response.data;
    } catch (error) {
      return MessagesService.statusCode(error);
    }
  }

  static async listUser(id) {
    try {
      const response = await UserRepository.getUser(id);
      return response.data;
    } catch (error) {
      return MessagesService.statusCode(error);
    }
  }
}