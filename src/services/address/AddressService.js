import AddressRepository from '@/repositories/AddressRepository';
import { messages } from '@/utils/messages/Message';

export function statusCode(error) {
  return messages(
    error.response.data.status,
    error.response.data.data,
    error.response.data.message
  );
}

export function createObjectAddress(response) {
  const address = response.data;
  const viaCep = response.data
  address.cidade = viaCep.localidade;
  delete viaCep.localidade;
  delete viaCep.complemento;
  delete viaCep.siafi;
  delete viaCep.ibge;
  delete viaCep.gia;
  delete viaCep.ddd;
  Object.assign(address, viaCep); 
  return viaCep;
}

export default class AddressService {
  static async alertErrorAddressCep() {
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
      return statusCode(error);
    }
  }

  static async editAddress(body) {
    try {
      const response = await AddressRepository.putAddress(body);
      return response.data;
    } catch (error) {
      return statusCode(error);
    }
  }

  static async searchCep(cep) {
    try {
      const response = await AddressRepository.viaCep(cep);
      return createObjectAddress(response);
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