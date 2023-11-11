import api from '@/server/api';

export default class TelephoneRepository {
    static async postTelephone(body) {
        return api.post(`/telephone/save`, body);
    }

    static async putTelephone(body) {
        return api.put(`/telephone/edit`, body);
    }
}