import api from '@/server/api';

export default class UserRepository {
    static async postUser(body) {
        return api.post(`/user/save`, body);
    }

    static async putUser(body) {
        return api.put(`/user/edit`, body);
    }

    static async listUsers(page, perPage, search, id) {
        return api.get(`/user/list?page=${page}&perPage=${perPage}&search=${search}&id=${id}&active=1`);
    }

    static async listUser(id) {
        return api.get(`/user/list/find?id=${id}&active=1`);
    }
}