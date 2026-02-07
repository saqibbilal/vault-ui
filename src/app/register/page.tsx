"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import Link from 'next/link';
import {ArrowRight, Shield, Zap} from "lucide-react";
import { motion } from 'framer-motion';
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
            const response = await api.post("/api/v1/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            const { user, token } = response.data;
            setAuth(user, token);
            router.push("/dashboard");
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 422) {
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
                {/* Background Orbs */}
                <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-100/50 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-violet-100/50 blur-[100px] rounded-full"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
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
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Create Vault</h1>
                            <p className="text-slate-500 font-medium">Join 2,000+ professionals today</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium transition-all focus:border-violet-500"
                                    placeholder="Saqib Bilal"
                                    required
                                />
                                {errors.name && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1 uppercase">{errors.name[0]}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium transition-all focus:border-violet-500"
                                    placeholder="name@example.com"
                                    required
                                />
                                {errors.email && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1 uppercase">{errors.email[0]}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium transition-all focus:border-violet-500"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Confirm</label>
                                    <input
                                        type="password"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium transition-all focus:border-violet-500"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                            {errors.password && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1 uppercase">{errors.password[0]}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-violet-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-violet-200 hover:bg-violet-700 hover:shadow-violet-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                            >
                                {loading ? "Creating Account..." : "Register Now"}
                                {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                            <p className="text-slate-500 font-medium text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="text-violet-600 font-bold hover:underline">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div >
        </>
    );
}