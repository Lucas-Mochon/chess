import { apiService } from "./api"

const TOKEN_KEY = 'auth_token';
const USER = 'user';

interface LoginResponse {
    data: any;
    token: string;
}

function notifyAuthChange() {
    window.dispatchEvent(new Event('authChange'));
}

async function connect(email: string, password: string): Promise<LoginResponse | null> {
    const res = await apiService.post<LoginResponse>('/api/users/login', {
        email,
        password,
    });

    if (res && res.token && res.data) {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER, JSON.stringify(res.data));
        notifyAuthChange();
        window.location.href = '/';
    }

    return res;
}

async function register(email: string, password: string, username: string) {
    const res = await apiService.post('/api/users/register', {
        username,
        email,
        password,
    });

    return res;
}

async function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER);
    notifyAuthChange();
    window.location.href = '/';
}

function isConnected() {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
}

function getCurrentUser() {
    const userStr = localStorage.getItem(USER);
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
}

export const authService = {
    connect,
    register,
    logout,
    isConnected,
    getCurrentUser
};