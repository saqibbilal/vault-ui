"use client";

import { Document } from "@/types";
import { useDocuments, useDeleteDocument } from "@/hooks/useDocuments";
import { useSearchStore } from "@/store/useSearchStore";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// FIXED: Added missing FileText import
import { Trash2, ExternalLink, Sparkles, FileCode, FileText } from "lucide-react";

interface DocumentListProps {
    documents?: Document[];
}

export default function DocumentList({ documents: searchResults }: DocumentListProps) {
    const { data: fetchedDocs, isLoading, isError } = useDocuments();
    const deleteMutation = useDeleteDocument();
    const filter = useSearchStore((state) => state.filter);

    const displayDocs = (searchResults && Array.isArray(searchResults))
        ? searchResults
        : fetchedDocs?.filter((doc: Document) => {
            if (filter === 'all') return true;
            return doc.type === filter;
        });

    const storageBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/storage`;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-10 px-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tighter">
                        {searchResults ? "Neural Results" : "Secured Vault"}
                    </h2>
                    {searchResults && (
                        <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-200">
                           {searchResults.length}
                       </span>
                    )}
                </div>
                <div className="h-[1px] flex-1 bg-slate-100 mx-6 hidden sm:block" />
            </div>

            {isLoading && !searchResults && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1,2,3].map(i => <div key={i} className="h-72 bg-slate-100 rounded-[3rem] animate-pulse" />)}
                </div>
            )}

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
                {displayDocs?.map((doc: Document) => (
                    <div
                        key={doc.id}
                        className="break-inside-avoid bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 flex flex-col relative group overflow-hidden"
                    >
                        <div className="absolute top-6 right-6 z-20">
                            <div className={`p-2.5 rounded-2xl backdrop-blur-md border shadow-sm ${
                                doc.type === 'file' ? 'bg-indigo-50/90 border-indigo-100 text-indigo-600' : 'bg-emerald-50/90 border-emerald-100 text-emerald-600'
                            }`}>
                                {doc.type === 'file' ? <FileCode size={16}/> : <FileText size={16}/>}
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="font-bold text-slate-900 mb-4 leading-tight text-xl pr-10">{doc.title}</h3>

                            {doc.type === 'note' ? (
                                <p className="text-sm text-slate-500 leading-relaxed italic line-clamp-6">{doc.content || "Empty record."}</p>
                            ) : (
                                <div className="space-y-5">
                                    {doc.file_path?.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                                        <div className="relative group/img overflow-hidden rounded-[2rem] border border-slate-100 aspect-square sm:aspect-auto">
                                            <img
                                                src={`${storageBaseUrl}/${doc.file_path}`}
                                                alt={doc.title}
                                                className="w-full h-auto object-cover transition-transform duration-700 group-hover/img:scale-110"
                                            />
                                            {doc.content && (
                                                <div className="absolute inset-0 bg-slate-900/90 opacity-0 group-hover/img:opacity-100 transition-all duration-300 p-6 overflow-y-auto custom-scrollbar">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <Sparkles size={14} className="text-violet-400" />
                                                        <span className="text-[10px] font-black text-violet-400 uppercase tracking-[0.2em]">Neural Sync</span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-200 leading-relaxed font-mono">{doc.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-40 w-full rounded-[2rem] bg-slate-50 text-4xl">📄</div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <a href={`${storageBaseUrl}/${doc.file_path}`} target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-600 hover:text-violet-800 transition-colors">
                                            Original <ExternalLink size={12} />
                                        </a>
                                        {doc.content && <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest"><span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"/> Indexed</span>}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center mt-auto">
                            <span className="text-[10px] font-mono text-slate-400 font-bold opacity-50">#{doc.id}</span>
                            <div className="flex items-center gap-5">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                    {doc.created_at ? new Date(doc.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                                </span>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="text-slate-300 hover:text-red-500 transition-colors transform hover:scale-110"><Trash2 size={16}/></button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="rounded-[3rem] border-none shadow-2xl p-10">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-3xl font-black tracking-tighter">Destroy Entry?</AlertDialogTitle>
                                            <AlertDialogDescription className="text-slate-500 text-lg">Permanently remove <span className="text-slate-900 font-bold">{doc.title}</span>?</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <div className="flex gap-3 mt-8">
                                            <AlertDialogCancel className="flex-1 rounded-2xl py-6 font-bold border-slate-100">Abort</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteMutation.mutate(doc.id)} className="flex-1 bg-red-600 hover:bg-red-700 rounded-2xl py-6 font-bold shadow-lg shadow-red-200">Delete</AlertDialogAction>
                                        </div>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}