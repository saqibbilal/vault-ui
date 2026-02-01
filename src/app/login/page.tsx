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

    const login = useAuthStore((state) => state.login);
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Get CSRF Cookie (Required for Sanctum)
            await api.get("/sanctum/csrf-cookie");

            // 2. Perform Login
            const response = await api.post("/api/v1/login", { email, password });

            // 3. Handle Success (Store token if not using cookies, or redirect)
            if (response.status === 200) {
                login(response.data.user);
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials. Please try again.");
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