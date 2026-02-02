import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

/**
 * REQUEST INTERCEPTOR: Inject the Token
 * This runs BEFORE every request is sent to Laravel.
 */
api.interceptors.request.use(
    (config) => {
        // We use .getState() to get the current store value outside of a React component
        const token = useAuthStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * RESPONSE INTERCEPTOR: Handle Token Expiry
 * This runs AFTER a response comes back from Laravel.
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If the server returns 401 (Unauthorized), it means the token is dead
        if (error.response?.status === 401) {
            const logout = useAuthStore.getState().logout;
            logout(); // This clears Zustand/LocalStorage and redirects to /login
        }
        return Promise.reject(error);
    }
);

export default api;