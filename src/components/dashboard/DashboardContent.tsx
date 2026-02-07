"use client";

import { useSyncExternalStore } from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DocumentForm } from "@/components/dashboard/DocumentForm";
import DocumentList from "@/components/dashboard/DocumentList";
import SemanticSearch from "@/components/dashboard/SemanticSearch";
import { useSearchStore } from "@/store/useSearchStore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function DashboardContent() {
    const searchResults = useSearchStore((state) => state.searchResults);
    const clearSearch = useSearchStore((state) => state.clearSearch);
    const isMounted = useSyncExternalStore(() => () => {}, () => true, () => false);

    if (!isMounted) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="h-12 w-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">Syncing Vault...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-full">
            {/* Aesthetic Background Accents (Subtle) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="p-6 md:p-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <DashboardHeader />
                </motion.div>

                <div className="grid grid-cols-1 gap-10 mt-10">
                    <div className="relative z-20">
                        <SemanticSearch />
                    </div>

                    {searchResults === null ? (
                        <div className="space-y-16 animate-in fade-in duration-700">
                            {/* Upload Section wrapped in a "Landing Page" style container */}
                            <section className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
                                <DocumentForm />
                            </section>

                            <section>
                                <div className="flex items-center justify-between mb-6 px-2">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Encrypted Storage</h3>
                                    <span className="h-[1px] flex-1 bg-slate-200 ml-6 opacity-50" />
                                </div>
                                <DocumentList />
                            </section>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-2xl"
                        >
                            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 ml-2">
                                <button onClick={clearSearch} className="hover:text-violet-600 transition-colors">Vault</button>
                                <span>/</span>
                                <span className="text-violet-600">Neural Matches</span>
                            </nav>

                            <DocumentList documents={searchResults} />

                            {searchResults.length === 0 && (
                                <div className="text-center py-24">
                                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🔍</div>
                                    <p className="text-slate-500 font-medium text-lg">No semantic patterns found for this query.</p>
                                    <Button variant="outline" onClick={clearSearch} className="mt-6 rounded-2xl border-slate-200 font-bold">
                                        Return to Vault
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}