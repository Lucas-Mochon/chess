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

function setCookie(name: string, value: string, days: number = 7) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
    document.cookie = cookie;
}

function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

async function connect(email: string, password: string): Promise<LoginResponse | null> {
    try {
        const res = await apiService.post<LoginResponse>('/api/users/login', {
            email,
            password,
        });

        if (res && res.token && res.data) {
            setCookie(TOKEN_KEY, res.token);
            localStorage.setItem(USER, JSON.stringify(res.data));
            notifyAuthChange();
            window.location.href = '/';
        }

        return res;
    } catch (error) {
        console.error("Erreur de connexion:", error);
        throw error;
    }
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
    deleteCookie(TOKEN_KEY);
    localStorage.removeItem(USER);
    notifyAuthChange();
    window.location.href = '/';
}

function isConnected() {
    const token = getCookie(TOKEN_KEY);
    console.log("Token from cookie:", token);
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