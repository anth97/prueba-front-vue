import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://aspexpressapi-production.up.railway.app',
    timeout: 7000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
