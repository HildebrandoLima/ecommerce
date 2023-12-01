import MessagesService from '../shared/MessagesService';
import { USER_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export default class ProfileService {
    static messageError() {
        return USER_NOT_FOUND_MESSAGE;
    }

    static messageError(flag) {
        return MessagesService.messageError(flag);
    }

    static calculateAge(dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate - birthDate;
        const age = Math.floor(differenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
        return age;
    }

    static mapperAddress(editedItem, item) {
        editedItem.id = item.id;
        editedItem.logradouro = item.logradouro;
        editedItem.numero = item.numero;
        editedItem.bairro = item.bairro;
        editedItem.cidade = item.cidade;
        editedItem.cep = item.cep;
        editedItem.uf = item.uf;
        editedItem.usuarioId = item.usuarioId;
        editedItem.ativo = item.ativo;
    }

    static mapperTelephone(editedItem, item) {
        editedItem.id = item.id;
        editedItem.ddd = 85;
        editedItem.numero = item.numero;
        editedItem.tipo = item.tipo;
        editedItem.usuarioId = item.usuarioId;
        editedItem.ativo = item.ativo;
    }

    static mapperUser(editedItem, userId, user) {
        editedItem.usuarioId = userId;
        editedItem.nome = user.nome;
        editedItem.email = user.email;
        editedItem.genero = user.genero;
        editedItem.ativo = user.ativo;
    }
}