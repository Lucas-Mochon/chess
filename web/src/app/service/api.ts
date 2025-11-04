import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiUrl,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.api.get(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        console.log('test')
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
