"use client";

import { useSyncExternalStore, useState } from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { DocumentForm } from "@/components/dashboard/DocumentForm"
import DocumentList from "@/components/dashboard/DocumentList"
import SemanticSearch from "@/components/dashboard/SemanticSearch";
import { useSearchStore } from "@/store/useSearchStore";
import { Button } from "@/components/ui/button";


export default function DashboardContent() {
    const searchResults = useSearchStore((state) => state.searchResults);
    const clearSearch = useSearchStore((state) => state.clearSearch);

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
        <div className="p-12 max-w-6xl mx-auto">
            <DashboardHeader />

            <div className="grid grid-cols-1 gap-8 mt-8">
                <SemanticSearch />

                {searchResults === null ? (
                    <div className="space-y-12">
                        <DocumentForm />
                        <DocumentList />
                    </div>
                ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                        <button onClick={clearSearch} className="hover:text-indigo-600 transition-colors">
                            Dashboard
                        </button>
                        <span>/</span>
                        <span className="text-slate-900 font-medium">AI Search Results</span>
                    </nav>

                    <DocumentList documents={searchResults} />

                    {searchResults.length === 0 && (
                        <div className="text-center py-20 border-2 border-dashed rounded-3xl">
                            <p className="text-slate-400 text-lg">
                                We couldn't find any documents matching that concept.
                            </p>
                            <Button variant="link" onClick={clearSearch} className="mt-2 text-indigo-600">
                                View all documents
                            </Button>
                        </div>
                    )}
                </div>
                )}
            </div>
        </div>
    );
}