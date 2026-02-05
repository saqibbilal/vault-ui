import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useSearchStore } from "@/store/useSearchStore"; // Import search store

export default function DashboardHeader() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const clearSearch = useSearchStore((state) => state.clearSearch); // Get reset function

    return (
        <div className="flex justify-between items-center mb-12">
            <div
                className="cursor-pointer group"
                onClick={clearSearch} // Clicking "Welcome" resets the view
            >
                <h1 className="text-3xl font-bold tracking-tight group-hover:text-indigo-600 transition-colors">
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
    )
}