import { create } from 'zustand';
import { Document } from '@/types';

interface SearchState {
    searchResults: Document[] | null;
    isSearching: boolean;
    setSearchResults: (results: Document[] | null) => void;
    filter: 'all' | 'note' | 'file';
    setFilter: (filter: 'all' | 'note' | 'file') => void;
    setLoading: (status: boolean) => void;
    clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    searchResults: null,
    isSearching: false,

    setSearchResults: (results) => set({
        searchResults: results,
        isSearching: false
    }),

    filter: 'all', // Default to showing everything
    setFilter: (filter) => set({ filter, searchResults: null }), // Clear search when filtering

    setLoading: (status) => set({ isSearching: status }),

    clearSearch: () => set({
        searchResults: null,
        isSearching: false
    }),
}));