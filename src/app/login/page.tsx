"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";

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

        } catch (error: any) {
            // Professional tip: Check if Laravel sent a specific validation message
            const message = error.response?.data?.message || "Invalid credentials. Please try again.";
            console.error("Login failed", error);
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
}