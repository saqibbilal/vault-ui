import {Button} from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";


export default function DashboardHeader() {

    // --- 2. Store & Auth ---
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    return (
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
    )
}