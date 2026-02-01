import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useDocuments() {
    return useQuery({
        queryKey: ["documents"], // This is the 'name' in the cache bucket
        queryFn: async () => {
            const response = await api.get("/api/v1/documents");
            return response.data.data; // Returning the array from your Laravel Resource
        },
    });
}