"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useSearchStore } from "@/store/useSearchStore"; // Import
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Sparkles } from "lucide-react";

export default function SemanticSearch() {
    const [query, setQuery] = useState("");

    // Get actions from store
    const setSearchResults = useSearchStore((state) => state.setSearchResults);
    const setLoading = useSearchStore((state) => state.setLoading);
    const isSearching = useSearchStore((state) => state.isSearching);
    const clearSearch = useSearchStore((state) => state.clearSearch);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const { data } = await api.get("/api/v1/search/semantic", {
                params: { query },
            });

            // Drill into Laravel Resource and Axios wrappers
            setSearchResults(data.data);
        } catch (error) {
            console.error("Semantic search failed:", error);
            setSearchResults([]); // Set to empty array to show "No results" UI
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setQuery("");
        clearSearch();
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
                </div>
                <Input
                    type="text"
                    placeholder="Search your vault's meaning..."
                    className="pl-10 pr-24 h-12 shadow-sm border-slate-200 focus-visible:ring-indigo-400 transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="absolute right-2 top-1.5 flex gap-2">
                    {query && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleClear}
                            className="h-9 text-slate-500 hover:text-slate-600"
                        >
                            Clear
                        </Button>
                    )}
                    <Button
                        type="submit"
                        size="sm"
                        disabled={isSearching}
                        className="h-9 bg-violet-500 text-white hover:bg-violet-600 shadow-violet-200"
                    >
                        {isSearching ? <Loader2 className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4" />}
                    </Button>
                </div>
            </form>
        </div>
    );
}