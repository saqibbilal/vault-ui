"use client";

import { useState } from "react";
import { useCreateDocument } from "@/hooks/useDocuments";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, FileText, UploadCloud, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export function DocumentForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState<'note' | 'file'>("note");
    const [file, setFile] = useState<File | null>(null);
    const createMutation = useCreateDocument();

    const handleCreateNote = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate(
            { title, content, type, file: file || undefined },
            {
                onSuccess: () => {
                    setTitle("");
                    setContent("");
                    setFile(null);
                    setType("note");
                    setIsOpen(false);
                },
                onError: (error: unknown) => {
                    alert("Failed to save. Check console for details.");
                }
            }
        );
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between px-2">
                <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Add File or Note</h3>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Instant AI Indexing</p>
                </div>

                {/* Minimalist Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                        isOpen
                            ? 'bg-slate-100 text-slate-500 hover:bg-slate-200 rotate-90'
                            : 'bg-violet-500 text-white hover:bg-violet-600 shadow-violet-200'
                    }`}
                >
                    {isOpen ? <X size={24} /> : <Plus size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.98 }}
                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.98 }}
                        className="overflow-hidden my-4"
                    >
                        <div className="bg-white/60 backdrop-blur-xl border border-violet-100 p-8 md:p-10 rounded-[3rem]">
                            <form onSubmit={handleCreateNote} className="space-y-6">
                                <div className="flex p-1.5 bg-slate-100/50 rounded-2xl w-fit mb-8">
                                    <button
                                        type="button"
                                        onClick={() => setType('note')}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'note' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400'}`}
                                    >
                                        <FileText size={14} /> Note
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setType('file')}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'file' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400'}`}
                                    >
                                        <UploadCloud size={14} /> Upload
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <Input
                                        placeholder="Entry Title (e.g. Q4 Logistics Receipt)"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="rounded-2xl py-7 px-6 border-slate-100 bg-white/50 focus:bg-white transition-all text-lg font-bold placeholder:text-slate-300"
                                        required
                                    />

                                    {type === 'note' ? (
                                        <Textarea
                                            placeholder="Start typing... Keepr will automatically extract semantic patterns."
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="min-h-[180px] rounded-[2rem] p-6 border-slate-100 bg-white/50 focus:bg-white transition-all italic text-slate-600"
                                            required
                                        />
                                    ) : (
                                        <div className="group border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 text-center bg-white/30 hover:bg-white/80 hover:border-violet-300 transition-all cursor-pointer relative">
                                            <input
                                                type="file"
                                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                required
                                            />
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <UploadCloud size={32} />
                                                </div>
                                                <p className="text-sm font-black text-slate-500 uppercase tracking-widest">
                                                    {file ? file.name : "Select Document"}
                                                </p>
                                                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-tight">PDF, PNG, JPG or DOCX</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={createMutation.isPending}
                                    className="w-full py-8 rounded-[2rem] font-black text-xl bg-slate-900 text-white hover:bg-violet-600 transition-all shadow-xl shadow-slate-200 flex gap-3"
                                >
                                    {createMutation.isPending ? "Syncing..." : <><Zap className="h-5 w-5 fill-violet-400 text-violet-400" /> Save to Vault</>}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}