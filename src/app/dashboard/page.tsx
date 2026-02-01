"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useDocuments } from "@/hooks/useDocuments";
import { Button } from "@/components/ui/button";


export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);

    const logout = useAuthStore((state) => state.logout);

    // TanStack Query gives us these status variables for free!
    const { data: documents, isLoading, isError } = useDocuments();

    return (

        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome, {user?.name || "Guest"}
                    </h1>
                    <p className="text-slate-500">Your secure vault</p>
                </div>

                <Button
                    variant="outline"
                    onClick={() => logout()}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                    Logout
                </Button>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
                {/* 1. Handling the Loading State */}
                {isLoading && <p className="text-slate-500 animate-pulse">Fetching your vault...</p>}

                {/* 2. Handling Errors */}
                {isError && <p className="text-red-500">Could not connect to the API.</p>}

                {/* 3. Displaying the Data */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {documents?.map((doc: any) => (
                        <div key={doc.id} className="p-4 bg-white border rounded-lg shadow-sm">
                            <h3 className="font-medium">{doc.title}</h3>
                            <p className="text-sm text-slate-500 truncate">{doc.content}</p>
                        </div>
                    ))}
                </div>

                {/* 4. Empty State */}
                {!isLoading && documents?.length === 0 && (
                    <p className="text-slate-400">Your vault is empty. Create your first note!</p>
                )}
            </div>
        </div>
    );
}