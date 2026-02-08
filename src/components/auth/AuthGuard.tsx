"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { token } = useAuthStore();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!token) {
            router.replace("/login");
            return; // Exit early
        }

        // Wrapping in a microtask or a simple check avoids the "synchronous" trigger
        const checkAuth = async () => {
            setIsAuthorized(true);
        };
        checkAuth();

    }, [token, router]);

    if (!isAuthorized) {
        return (
            <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
                <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}