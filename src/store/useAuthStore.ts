import { create } from 'zustand';
import api from '@/lib/axios';
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from '@/types';

interface AuthState {
    user: User | null;
    token: string | null; // The Bearer Token
    isAuthenticated: boolean;
    setAuth: (userData: User, token: string) => void; // We'll call it setAuth to clearly distinguish it from the API call
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // 1. Updated to catch the token from the backend
            setAuth: (userData, token) => set({
                user: userData,
                token: token,
                isAuthenticated: true
            }),

            // 2. Updated logout for Token usage
            logout: async () => {
                try {
                    // Axios Interceptor will automatically attach the token here
                    await api.post('/api/v1/logout');
                } catch {
                    console.warn("Server-side logout failed.");
                } finally {
                    // Clear EVERYTHING
                    set({ user: null, token: null, isAuthenticated: false });

                    // Use window.location for a "hard reset" of the app state
                    window.location.href = '/login';
                }
            },
        }),
        {
            name: 'vault-auth-storage', // Key in LocalStorage
            storage: createJSONStorage(() => localStorage),
            // Optional: Only persist the user and token
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);