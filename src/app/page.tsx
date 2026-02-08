"use client";

import HydrationGuard from "@/components/shared/HydrationGuard";
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import HowItWorks from "@/components/landingPage/HowItWorks";
import {
    FileText, Shield, Check, ArrowRight,
    FileCode, FileImage, MousePointerClick, Quote,
    Github, Twitter, Linkedin, Zap, Fingerprint, Layers, ExternalLink, Menu, X
} from "lucide-react";

export default function LandingPage() {
    const [hoveredPrice, setHoveredPrice] = useState<string | null>('Pro');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { scrollY } = useScroll();
    const navBackground = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]);
    const navBorder = useTransform(scrollY, [0, 50], ["rgba(226, 232, 240, 0)", "rgba(226, 232, 240, 0.8)"]);
    const navPadding = useTransform(scrollY, [0, 50], ["1.5rem", "0.75rem"]);

    const navLinks = [
        { name: "Why Keepr?", id: "about" },
        { name: "How it Works", id: "how-it-works" },
        { name: "Pricing", id: "pricing" },
    ];

    const handleScroll = useCallback((id: string) => {
        setIsMobileMenuOpen(false);
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const offset = 100;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <HydrationGuard>
            <div className="bg-white text-slate-900 font-sans selection:bg-violet-100 overflow-x-hidden relative">

                {/* --- HERO BACKGROUND --- */}
                <div className="absolute top-0 left-0 w-full h-[1000px] z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-slate-50/50" />
                    <div
                        className="absolute inset-0 opacity-[0.15]"
                        style={{
                            backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
                        }}
                    />
                    <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#ddd6fe] blur-[120px] rounded-full opacity-40"></div>
                </div>

                {/* --- CONTENT WRAPPER --- */}
                <div className="relative z-10">

                    {/* --- NAVIGATION --- */}
                    <motion.nav
                        style={{ backgroundColor: navBackground, borderColor: navBorder, paddingBlock: navPadding }}
                        className="fixed top-0 left-0 right-0 z-[100] border-b backdrop-blur-md transition-all duration-300"
                    >
                        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                            <button onClick={scrollToTop} className="flex items-center gap-2 group">
                                <div className="bg-violet-600 p-1.5 rounded-xl shadow-lg shadow-violet-200 group-hover:scale-110 transition-transform">
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl md:text-2xl font-black tracking-tight text-slate-800">Keepr</span>
                            </button>

                            <div className="hidden md:flex gap-8 items-center text-sm font-semibold text-slate-600">
                                {navLinks.map((link) => (
                                    <button key={link.id} onClick={() => handleScroll(link.id)} className="hover:text-violet-600 transition-colors">
                                        {link.name}
                                    </button>
                                ))}
                                <div className="h-4 w-[1px] bg-slate-200 mx-2" />
                                <Link href="/login" className="text-slate-800 hover:text-violet-600 transition-colors">Sign In</Link>
                                <Link href="/register" className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                                    Get Started
                                </Link>
                            </div>

                            <button
                                className="md:hidden p-2 text-slate-600 z-[110] relative focus:outline-none"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </motion.nav>

                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="fixed inset-0 top-[72px] z-[90] md:hidden bg-white/95 backdrop-blur-xl"
                            >
                                <div className="flex flex-col gap-2 p-8 text-center font-bold h-full">
                                    {navLinks.map((link) => (
                                        <button
                                            key={link.id}
                                            onClick={() => handleScroll(link.id)}
                                            className="text-slate-600 py-6 text-2xl hover:bg-slate-50 rounded-2xl transition-colors w-full"
                                        >
                                            {link.name}
                                        </button>
                                    ))}

                                    <div className="h-[1px] bg-slate-100 my-4" />

                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-900 py-6 text-xl">
                                        Sign In
                                    </Link>

                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="bg-violet-600 text-white py-6 rounded-3xl text-xl shadow-xl shadow-violet-200">
                                        Get Started
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- HERO SECTION --- */}
                    <section className="relative px-6 pt-32 md:pt-56 pb-48">
                        <div className="max-w-4xl mx-auto text-center relative z-20">
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm shadow-md border border-violet-100 text-violet-700 px-4 py-2 rounded-full mb-10">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-600"></span>
                                </span>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">The Intelligent Vault is here</span>
                            </div>

                            <InteractiveHeadline text="Organize your digital consciousness." />

                            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                                Folders are a legacy format. Keepr builds a neural map of your documents, making retrieval as natural as thought.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 md:px-0">
                                <Link href="/register" className="bg-violet-600 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-violet-700 transition-all shadow-2xl shadow-violet-300/50 hover:-translate-y-1">
                                    Build Your Vault
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-full pointer-events-none z-10">
                            <FloatingIcon icon={<FileText className="text-violet-600 h-8 w-8" />} pos="top-[15%] left-[5%]" delay="0s" />
                            <FloatingIcon icon={<FileCode className="text-blue-600 h-8 w-8" />} pos="top-[55%] left-[2%]" delay="0.5s" />
                            <FloatingIcon icon={<FileImage className="text-emerald-600 h-8 w-8" />} pos="top-[20%] right-[3%]" delay="1.2s" />
                            <FloatingIcon icon={<MousePointerClick className="text-orange-600 h-8 w-8" />} pos="bottom-[10%] right-[10%]" delay="0.8s" />
                        </div>
                    </section>

                    {/* --- ABOUT SECTION --- */}
                    <section id="about" className="py-20 md:py-32 px-6 scroll-mt-24 bg-slate-900 text-white overflow-hidden rounded-[2.5rem] md:rounded-[4rem] mx-4 shadow-3xl">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                                <div className="relative order-2 lg:order-1">
                                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-violet-600/30 blur-[100px]" />
                                    <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tighter">
                                        Why we built <br />
                                        <span className="text-violet-400 italic">Keepr.</span>
                                    </h2>
                                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                        We realized that as our digital lives grew, our ability to find what mattered shrank.
                                    </p>
                                    <div className="space-y-6">
                                        <AboutItem icon={<Zap className="text-violet-400" />} title="Zero Keywords" desc="Ask questions instead of searching for words." />
                                        <AboutItem icon={<Layers className="text-cyan-400" />} title="Semantic Linking" desc="Documents are connected by concept automatically." />
                                    </div>
                                </div>

                                <div className="relative group flex justify-center order-1 lg:order-2">
                                    <div className="w-full max-w-[320px] md:max-w-none aspect-square bg-gradient-to-tr from-violet-600 to-cyan-500 rounded-[2.5rem] md:rounded-[3rem] transform rotate-3 transition-transform group-hover:rotate-0 duration-700 shadow-2xl overflow-hidden flex items-center justify-center p-8 md:p-12">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 w-full h-full flex flex-col justify-center items-center">
                                            <Fingerprint className="h-16 w-16 md:h-24 md:h-24 text-white mb-8 animate-pulse" />
                                            <div className="h-2 w-3/4 bg-white/20 rounded-full mb-4" />
                                            <div className="h-2 w-1/2 bg-white/20 rounded-full mb-4" />
                                            <div className="h-2 w-5/6 bg-white/20 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div id="how-it-works" className="scroll-mt-32">
                        <HowItWorks />
                    </div>

                    <section id="testimonials" className="pt-10 pb-16 px-6">
                        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-24">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Loved by teams.</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <TestimonialCard name="Alex Rivera" role="Legal Researcher" quote="It&apos;s like having a search engine for my own brain." />
                            <TestimonialCard name="Sarah Chen" role="Architect" quote="The most intuitive file management I&apos;ve ever used." />
                            <TestimonialCard name="James Wilson" role="Writer" quote="Semantic search is a superpower." />
                        </div>
                    </section>

                    <section id="pricing" className="bg-white pt-10 pb-22 my-10 px-6 scroll-mt-24">
                        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Simple, transparent pricing</h2>
                            <p className="text-slate-500 font-medium px-4">Choose the plan that fits your vault size.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <PriceCard
                                plan="Starter" price="$0" features={["100 MB", "Basic AI"]}
                                isFocused={hoveredPrice === 'Starter'} onHover={() => setHoveredPrice('Starter')}
                            />
                            <PriceCard
                                plan="Pro" price="$19" features={["5 GB", "OCR Vision", "Priority"]}
                                isFocused={hoveredPrice === 'Pro'} onHover={() => setHoveredPrice('Pro')}
                            />
                            <PriceCard
                                plan="Team" price="$49" features={["50 GB", "Shared Vaults"]}
                                isFocused={hoveredPrice === 'Team'} onHover={() => setHoveredPrice('Team')}
                            />
                        </div>
                    </section>

                    <section className="px-6 py-20 bg-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-violet-600 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl">
                                <div className="relative z-10">
                                    <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">Ready to organize?</h2>
                                    <Link href="/register" className="bg-white text-violet-600 px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-violet-50 transition-all inline-flex items-center gap-2 hover:scale-105">
                                        Get Started <Zap className="h-6 w-6 fill-current" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer className="bg-[#0E1A35] pt-20 md:pt-32 pb-6 px-8 border-t border-white/5 mt-20 text-white">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 md:gap-16 mb-24">
                            <div className="col-span-1 md:col-span-2 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
                                    <div className="bg-violet-600 p-2 rounded-xl shadow-lg">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-3xl font-black tracking-tight italic">Keepr</span>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 mb-10 text-center md:text-left">
                                    The intelligent vault for professional knowledge.
                                </p>
                                <div className="flex justify-center md:justify-start gap-6">
                                    <Twitter className="h-6 w-6 text-slate-500 hover:text-violet-400 cursor-pointer transition-colors" />
                                    <Github className="h-6 w-6 text-slate-500 hover:text-violet-400 cursor-pointer transition-colors" />
                                    <Linkedin className="h-6 w-6 text-slate-500 hover:text-violet-400 cursor-pointer transition-colors" />
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="font-bold mb-8 uppercase text-[11px] tracking-[0.2em] opacity-50">Product</h4>
                                <ul className="space-y-4 text-sm text-slate-400 font-semibold">
                                    <li><a href="#how-it-works" className="hover:text-violet-400 transition-colors">AI Search</a></li>
                                    <li><a href="#how-it-works" className="hover:text-violet-400 transition-colors">OCR Vision</a></li>
                                    <li><a href="#about" className="hover:text-violet-400 transition-colors">Security</a></li>
                                </ul>
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="font-bold mb-8 uppercase text-[11px] tracking-[0.2em] opacity-50">Company</h4>
                                <ul className="space-y-4 text-sm text-slate-400 font-semibold">
                                    <li><a href="#about" className="hover:text-violet-400 transition-colors">Our Story</a></li>
                                    <li><a href="#" className="hover:text-violet-400 transition-colors">Contact</a></li>
                                </ul>
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="font-bold mb-8 uppercase text-[11px] tracking-[0.2em] opacity-50">Legal</h4>
                                <ul className="space-y-4 text-sm text-slate-400 font-semibold">
                                    <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy</a></li>
                                    <li><a href="#" className="hover:text-violet-400 transition-colors">Terms</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                                © 2026 Keepr Technologies Inc.
                            </p>
                            <a
                                href="https://mbilal.ca"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:bg-white/10 transition-all"
                            >
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                                    Developed by <span className="text-violet-400">mbilal.ca</span>
                                </span>
                                <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-violet-400 transition-colors" />
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </HydrationGuard>
    );
}

/* --- SUB COMPONENTS --- */

function InteractiveHeadline({ text }: { text: string }) {
    return (
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[1] md:leading-[0.9] flex flex-wrap justify-center">
            {text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex mr-2 md:mr-4 last:mr-0">
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            whileHover={{ scale: 1.2, color: "#7c3aed", translateY: -10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="inline-block cursor-default select-none"
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </h1>
    );
}

function FloatingIcon({ icon, pos, delay }: { icon: React.ReactNode, pos: string, delay: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute ${pos} p-8 bg-white rounded-[2rem] shadow-xl border border-slate-100 animate-bounce-slow flex items-center justify-center pointer-events-none z-10`}
            style={{ animationDelay: delay }}
        >
            {icon}
        </motion.div>
    );
}

function AboutItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex gap-5">
            <div className="bg-white/5 p-4 rounded-2xl h-fit border border-white/10">{icon}</div>
            <div className="text-left">
                <h4 className="font-bold text-lg md:text-xl mb-1 tracking-tight">{title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function TestimonialCard({ name, role, quote }: { name: string, role: string, quote: string }) {
    return (
        <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
            <Quote className="h-10 w-10 md:h-12 md:w-12 text-violet-100 mb-6 md:mb-8 group-hover:text-violet-400 transition-colors" />
            <p className="text-slate-600 italic mb-8 md:mb-10 text-base md:text-lg leading-relaxed font-medium">
                &ldquo;{quote}&rdquo;
            </p>
            <h5 className="font-bold text-slate-900 text-lg tracking-tight">{name}</h5>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mt-1">{role}</p>
        </div>
    );
}

function PriceCard({ plan, price, features, isFocused, onHover }: { plan: string, price: string, features: string[], isFocused: boolean, onHover: () => void }) {
    return (
        <div
            onMouseEnter={onHover}
            className={`p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border transition-all duration-500 cursor-default
            ${isFocused
                ? 'bg-slate-900 text-white shadow-2xl scale-100 md:scale-105 z-10 border-slate-800'
                : 'bg-white text-slate-900 border-slate-200 shadow-sm'
            }`}
        >
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isFocused ? 'text-violet-400' : 'text-violet-500'}`}>{plan}</span>
            <div className="my-6 md:my-8">
                <span className="text-5xl md:text-6xl font-black leading-none tracking-tighter">{price}</span>
                <span className="text-slate-500 ml-2 font-bold uppercase text-xs tracking-widest">/mo</span>
            </div>
            <ul className="space-y-4 md:space-y-5 mb-10 md:mb-12">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-xs md:text-sm font-semibold">
                        <Check className={`h-5 w-5 ${isFocused ? 'text-violet-400' : 'text-violet-600'}`} /> {f}
                    </li>
                ))}
            </ul>
            <button className={`w-full py-4 md:py-5 rounded-2xl font-black text-lg transition-all ${isFocused ? 'bg-violet-600 text-white shadow-xl' : 'bg-slate-100 text-slate-800'}`}>
                Choose {plan}
            </button>
        </div>
    );
}