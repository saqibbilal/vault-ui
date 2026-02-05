"use client";

import { Document } from "@/types";
import { useDocuments, useDeleteDocument } from "@/hooks/useDocuments";
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

    // 3. Logic to decide which data to show
    // Use searchResults if they exist, otherwise fallback to TanStack Query data
    const displayDocs = (searchResults && Array.isArray(searchResults))
        ? searchResults
        : fetchedDocs;

    const storageBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/storage`;

    return (
        <div className="mt-8">
            {/* 4. Dynamic title based on context */}
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                {searchResults ? "Search Results" : "Your Documents"}
            </h2>

            {/* Only show loading for the initial vault fetch, not when search results are present */}
            {isLoading && !searchResults && <p className="text-slate-500 animate-pulse">Fetching your vault...</p>}
            {isError && <p className="text-red-500">Could not connect to the API.</p>}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {displayDocs?.map((doc: Document) => (
                    <div
                        key={doc.id}
                        className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                    >
                        {/* ... (rest of your existing card JSX stays exactly the same) ... */}
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-800 truncate pr-2" title={doc.title}>
                                    {doc.title}
                                </h3>
                                <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-medium ${
                                    doc.type === 'file' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                }`}>
                                    {doc.type}
                                </span>
                            </div>

                            {doc.type === 'note' ? (
                                <p className="text-sm text-slate-500 mt-2 line-clamp-4 italic">
                                    {doc.content || "No content provided."}
                                </p>
                            ) : (
                                <div className="mt-2">
                                    {doc.file_path?.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                                        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-slate-100 mb-3">
                                            <img
                                                src={`${storageBaseUrl}/${doc.file_path}`}
                                                alt={doc.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center aspect-video w-full rounded-md border bg-slate-50 mb-3">
                                            <span className="text-2xl">📄</span>
                                        </div>
                                    )}
                                    <a
                                        href={`${storageBaseUrl}/${doc.file_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                    >
                                        📎 View Attachment
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 pt-2 border-t text-[10px] text-slate-400 flex justify-between items-center">
                            <span>ID: #{doc.id}</span>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        disabled={deleteMutation.isPending}
                                        className="opacity-0 group-hover:opacity-100 text-slate-400 text-sm hover:text-red-600 hover:bg-red-50 p-1 rounded-md transition-all duration-200"
                                        title="Delete forever"
                                    >
                                        {deleteMutation.isPending ? "..." : "🗑️"}
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete <strong>{doc.title}</strong> from your vault.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => deleteMutation.mutate(doc.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Delete Forever
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <span>{doc.created_at ? new Date(doc.created_at).toLocaleDateString() : ''}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 5. Handle empty states for both search and regular list */}
            {!isLoading && displayDocs?.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-xl">
                    <p className="text-slate-400">
                        {searchResults ? "No results found for your query." : "Your vault is empty."}
                    </p>
                </div>
            )}
        </div>
    );
}