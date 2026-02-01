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
        try {
            // Try to tell the server to logout
            await api.post('/api/v1/logout');
        } catch (error) {
            // We catch the 401 here but DON'T stop the code.
            // If the server says 401, it means you're already logged out there.
            console.warn("Server-side logout failed or session already expired.");
        } finally {
            // ALWAYS clear the frontend and redirect, regardless of API success
            set({ user: null, isAuthenticated: false });
            window.location.href = '/login';
        }
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