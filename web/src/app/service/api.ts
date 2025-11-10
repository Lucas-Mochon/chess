import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from './cookie';

const apiUrl = process.env.REACT_APP_API_URL;

class ApiService {
    private api: AxiosInstance;
    private token: string | null = null;

    constructor() {
        this.token = getCookie('auth_token');
        this.api = axios.create({
            baseURL: apiUrl,
            headers: { 'Authorization': this.token ? `Bearer ${this.token}` : undefined },
            withCredentials: true,
        });
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.api.get(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.api.post(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.api.put(url, data, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.api.delete(url, config);
        return response.data;
    }
}

export const apiService = new ApiService();