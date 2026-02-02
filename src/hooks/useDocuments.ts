import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDocuments, createDocument, deleteDocument } from "@/lib/api/documents";
import { CreateDocumentRequest } from "@/types";
import axios from "axios";

export function useDocuments() {
    return useQuery({
        queryKey: ["documents"],
        queryFn: getDocuments,
    });
}

export function useCreateDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newDoc: CreateDocumentRequest) => createDocument(newDoc),
        onSuccess: () => {
            // Refetch the list so the new note/file appears immediately
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
}

export function useDeleteDocument() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:number) => deleteDocument(id),
        onSuccess: () => {
            // This immediately triggers a re-fetch of the list
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
        onError: (error: unknown) => {
            const message = axios.isAxiosError(error)
                ? (error.response?.data as { message?: string })?.message ??
                "Failed to delete document"
                : "Failed to delete document";

            alert(message);
        }
    })
}