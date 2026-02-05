"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Sparkles } from "lucide-react";

interface SemanticSearchProps {
    onResults: (results: any[]) => void;
    onClear: () => void;
}

export default function SemanticSearch({ onResults, onClear }: SemanticSearchProps) {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        try {
            const response = await api.get("/api/v1/search/semantic", {
                params: { query },
            });

            // 1. response.data is the JSON from Laravel: { data: [...] }
            // 2. response.data.data is the ACTUAL ARRAY of documents
            const resultsArray = response.data.data;

            // Pass ONLY the array to the parent
            onResults(resultsArray);

        } catch (error) {
            console.error("Semantic search failed:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleClear = () => {
        setQuery("");
        onClear();
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
                </div>
                <Input
                    type="text"
                    placeholder="Ask your vault anything... (e.g. 'notes about my tax returns')"
                    className="pl-10 pr-24 h-12 shadow-sm border-slate-200 focus-visible:ring-slate-400"
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
                            className="h-9 text-slate-500"
                        >
                            Clear
                        </Button>
                    )}
                    <Button
                        type="submit"
                        size="sm"
                        disabled={isSearching}
                        className="h-9 bg-slate-900 hover:bg-slate-800 text-white"
                    >
                        {isSearching ? <Loader2 className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4" />}
                    </Button>
                </div>
            </form>
            <p className="text-xs text-center mt-2 text-slate-400 italic">
                Powered by Google Gemini & pgvector
            </p>
        </div>
    );
}