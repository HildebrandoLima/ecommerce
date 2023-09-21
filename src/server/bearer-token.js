import { token } from '@/storages/AuthStorage';

const bearerToken = (config) => {
    const accessToken = token();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
};

export default bearerToken;