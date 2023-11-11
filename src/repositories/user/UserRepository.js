import api from '@/server/api';

export default class UserRepository {
    static async postUser(body) {
        return api.post(`/user/save`, body);
    }

    static async putUser(body) {
        return api.put(`/user/edit`, body);
    }

    static async getUsers(page, perPage, search, id) {
        return api.get(`/user/list?page=${page}&perPage=${perPage}&search=${search}&id=${id}&active=1`);
    }

    static async getUser(id) {
        return api.get(`/user/list/find?id=${id}&active=1`);
    }
}