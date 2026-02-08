"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import Link from 'next/link';
import { Shield, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';
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
            const response = await api.post("/api/v1/login", { email, password });
            const { user, token } = response.data;
            setAuth(user, token);
            router.push("/dashboard");
        } catch (error: unknown) {
            let message = "An unexpected error occurred. Please try again.";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || error.message;
            }
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SessionGuard />
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
                {/* Background Orbs to match Landing Page */}
                <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-200/50 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-100/50 blur-[100px] rounded-full"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    <Link href="/" className="flex items-center gap-2 justify-center mb-8 group">
                        <div className="bg-violet-600 p-1.5 rounded-xl shadow-lg shadow-violet-200 group-hover:scale-110 transition-transform">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-800">Keepr</span>
                    </Link>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Welcome back</h1>
                            <p className="text-slate-500 font-medium">Access your intelligent vault</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 outline-none transition-all font-medium"
                                    placeholder="m.saqib@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 outline-none transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-violet-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-violet-200 hover:bg-violet-700 hover:shadow-violet-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                            >
                                {loading ? "Authenticating..." : "Login to Vault"}
                                {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                            <p className="text-slate-500 font-medium text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="text-violet-600 font-bold hover:underline">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}