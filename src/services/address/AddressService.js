import api from '@/server/api';
import { messages } from '@/support/utils/messages/Message';

export default class AddressService {
  static async postAddress(body) {
    try {
      const response = await api.post(`/address/save`, body);
      return response.data;
    } catch (error) {
      return messages(
        error.response.data.status,
        error.response.data.data,
        error.response.data.message
      );
    }
  }

  static async putAddress(body) {
    try {
      const response = await api.put(`/address/edit`, body);
      return response.data;
    } catch (error) {
      return messages(
        error.response.data.status,
        error.response.data.data,
        error.response.data.message
      );
    }
  }

  static async searchCep(cep) {
    try {
      const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
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
    } catch (error) {
      return error;
    }
  }
}