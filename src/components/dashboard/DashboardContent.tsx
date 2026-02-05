"use client";

import { useSyncExternalStore, useState } from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { DocumentForm } from "@/components/dashboard/DocumentForm"
import DocumentList from "@/components/dashboard/DocumentList"
import SemanticSearch from "@/components/dashboard/SemanticSearch";
import { Sparkles } from "lucide-react";

export default function DashboardContent() {
    const [searchResults, setSearchResults] = useState<any[] | null>(null);

    // --- 1. Hydration Guard ---
    // This satisfies the ESLint "cascading render" rule while keeping Zustand persistent
    const isMounted = useSyncExternalStore(() => () => {}, () => true, () => false);

    if (!isMounted) {
        return (
            <div className="p-8 max-w-5xl mx-auto flex items-center justify-center min-h-[50vh]">
                <p className="text-slate-400 animate-pulse">Syncing with secure vault...</p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            < DashboardHeader />

            {/* The Search Bar Component */}
            <SemanticSearch
                onResults={(results) => setSearchResults(results)}
                onClear={() => setSearchResults(null)}
            />

            < DocumentForm />

            {searchResults ? (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center mb-6 pb-2 border-b">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-indigo-500" />
                            <h2 className="text-lg font-semibold text-slate-800">AI-Ranked Results</h2>
                        </div>
                        <button
                            onClick={() => setSearchResults(null)}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                            ✕ Clear Search
                        </button>
                    </div>
                    <DocumentList documents={searchResults} />
                </div>
            ) : (
                <DocumentList />
            )}

        </div>
    );
}