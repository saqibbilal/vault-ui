"use client";

import { LayoutDashboard, FileText, Image as ImageIcon, Search, Settings, Shield } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";

const navItems = [
    { id: 'all', label: 'All Vaults', icon: LayoutDashboard },
    { id: 'note', label: 'My Notes', icon: FileText },
    { id: 'file', label: 'Images & Docs', icon: ImageIcon },
];

export default function Sidebar() {
    const clearSearch = useSearchStore((state) => state.clearSearch);
    const { setFilter, filter: currentFilter } = useSearchStore();

    return (
        <aside className="w-64 bg-[#0E1A35] text-white flex flex-col h-screen sticky top-0 border-r border-white/5">
            {/* Brand */}
            <div className="p-8 flex items-center gap-3">
                <div className="bg-violet-600 p-2 rounded-xl shadow-lg shadow-violet-500/30">
                    <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter italic">Keepr</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 mt-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setFilter(item.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                            currentFilter === item.id
                                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <item.icon className={`h-5 w-5 ${currentFilter === item.id ? 'text-white' : 'group-hover:text-violet-400'}`} />
                        <span className="font-bold text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Profile/Footer Section */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 border-2 border-white/10" />
                    <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest text-white">Dev User</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Pro Member</span>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <Settings className="h-4 w-4" /> Settings
                </button>
            </div>
        </aside>
    );
}