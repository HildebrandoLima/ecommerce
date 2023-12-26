export default class UrlParamsService {
    static paginated(page, perPage, active) {
        if (page === 0 && perPage === 0 && active === 1) {
            return `list?active=${active}`;
        }
        return `list?page=${page}&perPage=${perPage}&active=${active}`;
    }
}