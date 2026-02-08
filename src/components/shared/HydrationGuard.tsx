"use client";

import { useSyncExternalStore } from 'react';

interface HydrationGuardProps {
    children: React.ReactNode;
}

export default function HydrationGuard({ children }: HydrationGuardProps) {
    // This hook is the modern way to detect if we are on the client
    // without triggering "cascading render" lint errors.
    const isMounted = useSyncExternalStore(() => () => {}, () => true, () => false);

    if (!isMounted) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] w-full">
                <div className="text-center">
                    <div className="h-12 w-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 font-medium animate-pulse uppercase text-[10px] tracking-[0.2em]">
                        Syncing Neural Vault...
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}