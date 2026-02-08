"use client";

import { LayoutDashboard, FileText, Image as ImageIcon, Settings, Shield, ArrowLeft } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import Link from "next/link";

const navItems = [
    { id: 'all', label: 'All Vaults', icon: LayoutDashboard },
    { id: 'note', label: 'My Notes', icon: FileText },
    { id: 'file', label: 'Images & Docs', icon: ImageIcon },
];

export default function Sidebar() {
    const { setFilter, filter: currentFilter } = useSearchStore();

    return (
        <aside className="w-72 bg-[#0E1A35] text-white flex flex-col h-screen sticky top-0 border-r border-white/5">
            {/* Brand & Home Link */}
            <div className="p-8">
                <Link href="/" className="flex items-center gap-3 mb-10 group">
                    <div className="bg-violet-600 p-2 rounded-xl shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform">
                        <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter italic">Keepr</span>
                </Link>

                <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">
                    <ArrowLeft size={12} /> Exit to Site
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 mt-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setFilter(item.id as 'all' | 'note' | 'file')}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] transition-all group ${
                            currentFilter === item.id
                                ? 'bg-violet-600 text-white shadow-xl shadow-violet-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <item.icon className={`h-5 w-5 ${currentFilter === item.id ? 'text-white' : 'group-hover:text-violet-400'}`} />
                        <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Profile/Branding Section */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-6 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 border-2 border-white/10" />
                    <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest text-white">Dev User</span>
                        <span className="text-[10px] text-violet-400 font-bold uppercase tracking-tight">Pro Active</span>
                    </div>
                </div>

                <div className="flex justify-between items-center px-2">
                    <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.15em]">
                        <Settings className="h-3 w-3" /> Settings
                    </button>
                    <span className="text-[9px] text-slate-600 font-bold uppercase">v1.2</span>
                </div>
            </div>
        </aside>
    );
}