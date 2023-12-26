import AddressRepository from '@/repositories/AddressRepository';
import MessagesService from '../shared/MessagesService';

export default class AddressService {
  static messageSuccess(user) {
    return MessagesService.messageSuccess(user);
  }

  static alertErrorAddressCep() {
    throw Swal.fire({
      icon: 'error',
      title: 'CEP inválido. Digite um CEP com 8 dígitos numéricos.',
    });
  }

  static async createAddress(body) {
    try {
      const response = await AddressRepository.postAddress(body);
      return response.data;
    } catch (error) {
      return MessagesService.statusCode(error);
    }
  }

  static async editAddress(body) {
    try {
      const response = await AddressRepository.putAddress(body);
      return response.data;
    } catch (error) {
      return MessagesService.statusCode(error);
    }
  }

  static async searchCep(cep) {
    try {
      const response = await AddressRepository.getAddress(cep);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  static async toAssembleObjectAddressCep(numero, address, viaCep) {
    address.logradouro = viaCep.logradouro;
    address.numero = numero;
    address.bairro = viaCep.bairro;
    address.cidade = viaCep.cidade;
    address.uf = viaCep.uf;
    address.cep = viaCep.cep;
    return address;
  }
}