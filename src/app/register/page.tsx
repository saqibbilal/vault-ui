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

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const router = useRouter();
    const { setAuth } = useAuthStore();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            // Laravel's RegisterRequest looks for password_confirmation
            const response = await api.post("/api/v1/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });

            const { user, token } = response.data;

            // Store in Zustand & LocalStorage
            setAuth(user, token);

            router.push("/dashboard");

        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 422) {
                // Set validation errors from Laravel
                setErrors(error.response.data.errors);
            } else {
                alert("An unexpected error occurred.");
            }
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
                        <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
                        <CardDescription>Join the vault to secure your notes with AI</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Saqib Bilal"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email[0]}</p>}
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
                                {errors.password && <p className="text-xs text-red-500">{errors.password[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required
                                />
                            </div>
                            <Button className="w-full bg-slate-900" type="submit" disabled={loading}>
                                {loading ? "Creating Account..." : "Register Now"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}