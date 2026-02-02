"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from "@/store/useAuthStore";
import { useDocuments, useCreateDocument } from "@/hooks/useDocuments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Document } from "@/types";



const Dashboard = () => {
    const [isClient, setIsClient] = useState(false);
    const { user } = useAuthStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Or a loading spinner

    return <div>Welcome, {user?.name}</div>;
};



export default function DashboardPage() {
    // --- 1. Hydration Guard ---
    // We use this to ensure the server-rendered HTML matches the initial client render.
    const [isMounted, setIsMounted] = useState(false);

    // --- 2. Store & Auth ---
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    // --- 3. Local UI State (Temporary Form Data) ---
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("note");

    // --- 4. Server State (TanStack Query Hooks) ---
    // These hooks only fire once the component is ready in the browser
    const { data: documents, isLoading, isError } = useDocuments();
    const createMutation = useCreateDocument();

    // Trigger mount after first render
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // --- 5. Action Handlers ---
    const handleCreateNote = (e: React.FormEvent) => {
        e.preventDefault();

        createMutation.mutate(
            { title, content, type },
            {
                onSuccess: () => {
                    setTitle("");
                    setContent("");
                },
                onError: () => {
                    alert("Failed to save note. Please check your connection.");
                }
            }
        );
    };

    // If we haven't mounted yet, return a skeleton or null to avoid hydration errors
    if (!isMounted) {
        return (
            <div className="p-8 max-w-5xl mx-auto flex items-center justify-center min-h-[50vh]">
                <p className="text-slate-400 animate-pulse">Syncing with secure vault...</p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome, {user?.name || "Guest"}
                    </h1>
                    <p className="text-slate-500">Your secure personal vault</p>
                </div>

                <Button
                    variant="outline"
                    onClick={() => logout()}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                    Logout
                </Button>
            </div>

            {/* Create Note Section */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-12">
                <h2 className="text-lg font-semibold mb-4">Create New Note</h2>
                <form onSubmit={handleCreateNote} className="space-y-4">
                    <Input
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder="Write your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[100px]"
                        required
                    />
                    <Button
                        type="submit"
                        disabled={createMutation.isPending}
                    >
                        {createMutation.isPending ? "Saving..." : "Save Note"}
                    </Button>
                </form>
            </section>

            {/* Document List Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Your Documents</h2>

                {isLoading && <p className="text-slate-500 animate-pulse">Fetching your vault...</p>}
                {isError && <p className="text-red-500">Could not connect to the API. Check your session.</p>}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {documents?.map((doc: Document) => (
                        <div key={doc.id} className="p-4 bg-white border rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-slate-800">{doc.title}</h3>
                                {/* Badge to show type */}
                                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${
                                    doc.type === 'file' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                }`}>
                    {doc.type}
                </span>
                            </div>

                            {doc.type === 'note' ? (
                                <p className="text-sm text-slate-500 line-clamp-3">{doc.content}</p>
                            ) : (
                                <div className="text-xs text-slate-400 italic">
                                    📎 {doc.mime_type} ({Math.round(doc.size! / 1024)} KB)
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {!isLoading && documents?.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl">
                        <p className="text-slate-400">Your vault is empty. Create your first note above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}