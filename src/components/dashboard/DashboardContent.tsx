"use client";

import { useSyncExternalStore } from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { DocumentForm } from "@/components/dashboard/DocumentForm"
import DocumentList from "@/components/dashboard/DocumentList"

export default function DashboardContent() {
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

            < DocumentForm />

            < DocumentList />
        </div>
    );
}