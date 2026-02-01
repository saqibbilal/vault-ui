import { create } from 'zustand';
import api from '@/lib/axios';


interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];        // Array of role names (e.g., ['admin'])
    permissions: string[];  // Array of permission names (e.g., ['edit-docs'])
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    // Set user data after successful login
    login: (userData) => set({ user: userData, isAuthenticated: true }),

    // Wipe user data on logout
    logout: async () => {
        await api.post('/api/v1/logout');
        set({ user: null, isAuthenticated: false });
        window.location.href = '/login';
    },

    // Ask Laravel "Who am I?" (to see if the cookie is still valid)
    checkAuth: async () => {
        try {
            const response = await api.get('/api/user');
            set({ user: response.data, isAuthenticated: true });
        } catch (error) {
            set({ user: null, isAuthenticated: false });
        }
    }
}));