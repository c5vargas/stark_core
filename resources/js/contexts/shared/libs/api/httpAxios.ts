import axios from 'axios';
import { Http } from './Http';

const defaultHeaders = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};

const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('__auth__');
    return token ? { ...defaultHeaders, Authorization: `Bearer ${token}` } : defaultHeaders;
};

const getHeaders = (isMultipart: boolean = false): Record<string, string> => {
    const authHeaders = getAuthHeaders();
    return isMultipart ? { ...authHeaders, 'Content-Type': 'multipart/form-data' } : authHeaders;
};

const httpAxios: Http = {
    get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
        const headers = getHeaders()
        const response = await axios.get(path, { ...config, params: params, headers });
        return response.data as T;
    },
    post: async <T>(path: string, params?: Record<string, any>, config?: any, isMultipart: boolean = false) => {
        const headers = getHeaders(isMultipart);
        const response = await axios.post(path, { ...params }, { ...config, headers });
        return response.data as T;
    },
    put: async <T>(path: string, params?: Record<string, any>, config?: any, isMultipart: boolean = false) => {
        const headers = getHeaders(isMultipart);
        const response = await axios.put(path, { ...params }, { ...config, headers });
        return response.data as T;
    },
    delete: async <T>(path: string, params?: any, config?: any) => {
        const headers = getHeaders()
        const response = await axios.delete(path, { ...config, params: params, headers });
        return response.data as T;
    }
};

export default httpAxios