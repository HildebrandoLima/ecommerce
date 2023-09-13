import api from '@/api';

export default class AddressService {
  static async postAddress(body) {
    try {
      const response = await api.post(`/address/save`, body);
      return response.data.message;
    } catch (error) {
      throw error;
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
      throw error;
    }
  }
}