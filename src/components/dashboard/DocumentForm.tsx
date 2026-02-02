"use client";

import { useState } from "react";
import { useCreateDocument } from "@/hooks/useDocuments";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import axios from "axios";

export function DocumentForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState<'note' | 'file'>("note");
    const [file, setFile] = useState<File | null>(null);
    const createMutation = useCreateDocument();

    const handleCreateNote = (e: React.FormEvent) => {
        e.preventDefault();

        // Note: We are passing 'file' now even if it's null
        createMutation.mutate(
            { title, content, type, file: file || undefined },
            {
                onSuccess: () => {
                    setTitle("");
                    setContent("");
                    setFile(null);
                    setType("note");
                },
                onError: (error: unknown) => {
                    if (axios.isAxiosError(error)) {
                        console.error("Upload failed:", error.response?.data);
                    } else {
                        console.error("Upload failed:", error);
                    }

                    alert("Failed to save. Check console for validation errors.");
                }
            }
        );
    };

    return (
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-12">
            <h2 className="text-lg font-semibold mb-4">Create New {type === 'note' ? 'Note' : 'File'}</h2>
            <form onSubmit={handleCreateNote} className="space-y-4">
                <div className="flex gap-4 mb-4">
                    <Button
                        type="button"
                        variant={type === 'note' ? 'default' : 'outline'}
                        onClick={() => setType('note')}
                    >
                        Note
                    </Button>
                    <Button
                        type="button"
                        variant={type === 'file' ? 'default' : 'outline'}
                        onClick={() => setType('file')}
                    >
                        File Upload
                    </Button>
                </div>

                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                {type === 'note' ? (
                    <Textarea
                        placeholder="Write your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[100px]"
                        required
                    />
                ) : (
                    <Input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        required
                    />
                )}

                <Button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="w-full"
                >
                    {createMutation.isPending ? "Processing..." : "Save to Vault"}
                </Button>
            </form>
        </section>
    );
}