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

// 1. Define the props interface
interface DocumentListProps {
    documents?: Document[]; // Optional prop for search results
}

// 2. Accept the prop in the function signature
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
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-slate-800">
                {searchResults ? "Search Results" : "Your Vault"}
            </h2>

            {isLoading && !searchResults && <p className="text-slate-500 animate-pulse">Fetching your vault...</p>}
            {isError && <p className="text-red-500">Could not connect to the API.</p>}

            {/* MASONRY CONTAINER */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {displayDocs?.map((doc: Document) => (
                    <div
                        key={doc.id}
                        className="break-inside-avoid bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative group overflow-hidden"
                    >
                        {/* HEADER SECTION (Title & Type) */}
                        <div className="p-5 pb-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-slate-800 truncate pr-2 flex-1" title={doc.title}>
                                    {doc.title}
                                </h3>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-black tracking-widest ${
                                    doc.type === 'file' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                }`}>
                                    {doc.type}
                                </span>
                            </div>
                        </div>

                        {/* BODY CONTENT */}
                        <div className="px-5 pb-5">
                            {doc.type === 'note' ? (
                                <p className="text-sm text-slate-500 mt-2 leading-relaxed italic">
                                    {doc.content || "No content provided."}
                                </p>
                            ) : (
                                <div className="mt-2">
                                    {doc.file_path?.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                                        <div className="relative group/img aspect-auto w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                                            <img
                                                src={`${storageBaseUrl}/${doc.file_path}`}
                                                alt={doc.title}
                                                className="w-full h-auto object-cover transition-transform duration-500 group-hover/img:scale-105"
                                            />

                                            {/* OCR OVERLAY */}
                                            {doc.content && (
                                                <div className="absolute inset-0 bg-slate-900/90 opacity-0 group-hover/img:opacity-100 transition-all duration-300 p-4 overflow-y-auto">
                                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">AI Transcription</span>
                                                    <p className="text-[11px] text-slate-200 leading-relaxed font-mono">
                                                        {doc.content}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-32 w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 mb-3 text-3xl">
                                            📄
                                        </div>
                                    )}

                                    <div className="mt-4 flex justify-between items-center">
                                        <a
                                            href={`${storageBaseUrl}/${doc.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors uppercase tracking-tighter"
                                        >
                                            📎 View Original
                                        </a>

                                        {doc.content && (
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                                <span className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" />
                                                Indexed
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FOOTER ACTIONS */}
                        <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-mono">#{doc.id}</span>

                            <div className="flex items-center gap-4">
                                <span className="text-[10px] text-slate-400 font-medium">
                                    {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : ''}
                                </span>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button
                                            disabled={deleteMutation.isPending}
                                            className="text-slate-400 hover:text-red-600 transition-colors"
                                            title="Delete permanently"
                                        >
                                            🗑️
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="rounded-[2rem]">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Remove from Vault?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently erase <strong>{doc.title}</strong>.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="rounded-xl">Keep it</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => deleteMutation.mutate(doc.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* EMPTY STATE */}
            {!isLoading && displayDocs?.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[3rem]">
                    <p className="text-slate-400 text-lg font-medium">
                        {searchResults ? "No semantic matches found." : "Your vault is currently empty."}
                    </p>
                </div>
            )}
        </div>
    );
}