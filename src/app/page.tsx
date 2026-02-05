import Link from 'next/link';
import { Sparkles, Shield, Zap, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
      <div className="bg-[#0f172a] min-h-screen text-[#f8fafc] selection:bg-[#22d3ee]/30">
        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-[#6366f1] to-[#22d3ee] p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic">LEXIS</span>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/login" className="text-sm font-medium hover:text-[#22d3ee] transition-colors">Sign In</Link>
            <Link href="/register" className="bg-[#6366f1] hover:bg-[#4f46e5] px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
              Get Started
            </Link>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="px-8 pt-20 pb-32 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-[#22d3ee]" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Next-Gen Semantic Storage</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Stop Searching. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#22d3ee] to-[#6366f1]">Start Finding.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Lexis understands the <span className="text-white italic">intent</span> behind your documents.
            Upload PDFs, Word docs, and notes to a vault that thinks like you do.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="/register" className="group bg-[#f8fafc] text-[#0f172a] px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:scale-105 transition-all">
              Create Your Private Vault
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="px-8 py-24 bg-black/20 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors">
              <div className="bg-indigo-500/20 p-3 rounded-2xl w-fit mb-6">
                <Sparkles className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Semantic Intelligence</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Our AI indexes the context of your files, allowing you to search by concepts, not just keywords.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">
              <div className="bg-cyan-500/20 p-3 rounded-2xl w-fit mb-6">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Military-grade encryption for your most sensitive legal and professional documents.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors">
              <div className="bg-indigo-500/20 p-3 rounded-2xl w-fit mb-6">
                <Zap className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Format Agnostic</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Support for PDF, Word, and text files. Everything is searchable, everything is organized.</p>
            </div>
          </div>
        </section>
      </div>
  );
}