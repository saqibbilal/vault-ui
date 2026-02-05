"use client";

import api from "@/lib/axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import SessionGuard from "@/components/auth/SessionGuard";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { setAuth } = useAuthStore();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Perform Login (CSRF handshake is NO LONGER REQUIRED for tokens)
            const response = await api.post("/api/v1/login", { email, password });

            // 2. Extract user and token from the response
            // Laravel returns: { user: {...}, token: "..." }
            const { user, token } = response.data;

            // 3. Store in Zustand (this also triggers the 'persist' to LocalStorage)
            setAuth(user, token);

            // 4. Redirect
            router.push("/dashboard");

        } catch (error: unknown) {
            let message = "An unexpected error occurred. Please try again.";

            // 1. Check if the error is an Axios error
            if (axios.isAxiosError(error)) {
                // 2. Extract the message from Laravel's standard response format
                message = error.response?.data?.message || error.message;

                // 3. Optional: Log specific validation errors for debugging
                if (error.response?.status === 422) {
                    console.error("Validation Errors:", error.response.data.errors);
                }
            } else {
                // 4. Handle non-Axios errors (like code crashes)
                console.error("Non-Axios Error:", error);
            }

            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SessionGuard />
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
                <Card className="w-full max-w-md border-none shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                        <CardDescription>Enter your email to access your secure vault</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m.saqib@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button className="w-full bg-slate-900" type="submit" disabled={loading}>
                                {loading ? "Authenticating..." : "Login to Vault"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}