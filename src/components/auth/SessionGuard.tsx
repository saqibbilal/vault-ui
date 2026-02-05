"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function SessionGuard() {
    const { token } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // If they have a token, they shouldn't be here (Login/Register)
        if (token) {
            router.replace("/dashboard");
        }
    }, [token, router]);

    return null; // This component renders nothing visually
}